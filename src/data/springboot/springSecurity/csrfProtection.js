
export const csrfProtection = {
  id: 1109,
  title: "CSRF Protection",
  slug: "csrf-protection",
  topicTitle: "Spring Security",
  description:
    "Understand cross-site request forgery, how CSRF attacks work, and how Spring Security protects browser applications.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "concept",
      title: "What Is CSRF?",
      paragraphs: [
        "CSRF stands for Cross-Site Request Forgery. It is an attack in which a victim's browser is induced to send an unwanted request to a trusted application where the victim is already authenticated.",
        "The risk is especially important when authentication credentials are automatically attached to requests by the browser, such as session cookies.",
        "An attacker does not necessarily need to know the user's password. The attacker attempts to make the victim's already authenticated browser perform an action that the victim did not intentionally request.",
        "CSRF is primarily a browser-based attack. It is different from authentication attacks because the attacker may be abusing an existing authenticated browser session."
      ],
      bullets: [
        "CSRF = Cross-Site Request Forgery.",
        "The attacker attempts to make a victim's browser send an unwanted request.",
        "The victim is commonly already authenticated.",
        "Cookie-based authentication is an important CSRF scenario.",
        "CSRF protection is different from authentication and authorization.",
        "CSRF is mainly concerned with unwanted state-changing requests."
      ]
    },

    {
      id: "why-csrf-happens",
      title: "Why Does CSRF Happen?",
      paragraphs: [
        "Browsers can automatically attach certain credentials, especially cookies, when making requests to a site.",
        "Suppose a user is logged into example.com. The browser may automatically include the session cookie when sending a request to example.com.",
        "If another website can cause the browser to send a state-changing request to example.com, the trusted application may receive the request with the user's session cookie.",
        "Without an additional CSRF defense, the server may have difficulty determining whether the request was intentionally initiated by the user or triggered by an attacker."
      ],
      code: {
        language: "text",
        code: `User logs into bank.example.com
        |
        | Session Cookie
        v
Browser
        |
        +----------------------------+
        |                            |
        v                            v
Trusted Bank Site              Malicious Site
                                   |
                                   | Attempts unwanted request
                                   v
                           bank.example.com
                                   |
                                   | Browser may attach cookie
                                   v
                              Server
                                   |
                                   v
                         CSRF validation needed`
      }
    },

    {
      id: "example",
      title: "Example Scenario",
      paragraphs: [
        "Imagine a user is logged into a banking website in one browser tab.",
        "The banking application uses a session cookie to identify the authenticated user.",
        "The user then visits a malicious website in another tab. That website attempts to cause the browser to send a state-changing request to the banking application.",
        "Because the browser may automatically attach the banking session cookie, the banking server could see an authenticated request even though the user did not intentionally perform the action.",
        "A CSRF defense adds an additional requirement that an attacker-controlled site should not normally be able to provide correctly."
      ],
      bullets: [
        "The browser may automatically attach the session cookie.",
        "The attacker attempts to cause a state-changing request.",
        "The server may see the authenticated session.",
        "A CSRF token provides an additional request-specific validation signal.",
        "CSRF protection helps distinguish legitimate application requests from forged browser requests."
      ]
    },

    {
      id: "attack-flow",
      title: "CSRF Attack Flow",
      paragraphs: [
        "The important part of a CSRF attack is that the attacker is trying to exploit the victim's authenticated browser session.",
        "The attacker does not necessarily need direct access to the user's credentials."
      ],
      code: {
        language: "text",
        code: `1. User logs into trusted-site.com
          |
          v
2. Browser receives session cookie
          |
          v
3. User remains logged in
          |
          v
4. User visits malicious-site.com
          |
          v
5. Malicious site attempts unwanted request
          |
          v
6. Browser sends request to trusted-site.com
          |
          | Cookie may be attached automatically
          v
7. Trusted server receives request
          |
          v
8. CSRF protection checks request
          |
          +---- Invalid/missing token --> Reject
          |
          +---- Valid token -----------> Continue`
      }
    },

    {
      id: "state-changing",
      title: "Why State-Changing Requests Matter",
      paragraphs: [
        "CSRF is especially important for operations that change server-side state.",
        "Examples include transferring money, changing an email address, changing a password, creating an order, deleting an account, or updating account settings.",
        "GET requests should generally be safe and should not be designed to perform state-changing operations. State-changing operations should normally use methods such as POST, PUT, PATCH, or DELETE according to the API design."
      ],
      bullets: [
        "POST commonly creates or triggers state changes.",
        "PUT commonly replaces a resource.",
        "PATCH commonly modifies part of a resource.",
        "DELETE commonly removes a resource.",
        "GET should not be used to perform destructive or state-changing operations."
      ]
    },

    {
      id: "spring-security",
      title: "Spring Security CSRF Protection",
      paragraphs: [
        "Spring Security enables CSRF protection by default for typical servlet-based configurations.",
        "For state-changing requests, the application generally needs to provide a valid CSRF token according to its configured token repository and request handling.",
        "Spring Security's CSRF protection is designed to prevent an attacker from successfully forging a state-changing request from an untrusted origin."
      ],
      bullets: [
        "CSRF protection is enabled by default in typical servlet applications.",
        "A CSRF token provides an additional value that must be validated.",
        "The token must be available to legitimate clients according to the application's configuration.",
        "CSRF protection is separate from authentication."
      ]
    },

    {
      id: "csrf-token",
      title: "What Is a CSRF Token?",
      paragraphs: [
        "A CSRF token is an unpredictable value associated with the user's application context and used to verify that a state-changing request originated through an expected application flow.",
        "The legitimate frontend can obtain the token according to the configured Spring Security CSRF token repository and send it back with the state-changing request.",
        "An attacker-controlled site generally cannot read the legitimate application's token because of browser security boundaries."
      ],
      code: {
        language: "text",
        code: `Legitimate Application
        |
        | CSRF token
        v
Browser
        |
        | POST + CSRF token
        v
Spring Boot
        |
        | Validate token
        v
Controller

Attacker Site
        |
        | POST without valid token
        v
Spring Boot
        |
        | CSRF validation fails
        v
Request rejected`
      }
    },

    {
      id: "token-flow",
      title: "CSRF Token Request Flow",
      paragraphs: [
        "The exact way a client obtains and sends the CSRF token depends on the configured token repository and frontend architecture.",
        "A common browser application pattern is for the server to expose the token to the legitimate frontend and for the frontend to include it in the expected request header or parameter for state-changing operations."
      ],
      code: {
        language: "text",
        code: `Browser
   |
   | Request application page / CSRF endpoint
   v
Spring Security
   |
   | Provide CSRF token
   v
Browser / Frontend
   |
   | POST /api/orders
   | CSRF token
   v
Spring Security
   |
   +---- Token valid ----> Controller
   |
   +---- Token invalid --> 403
`
      }
    },

    {
      id: "configuration",
      title: "Do Not Disable It Blindly",
      code: {
        language: "java",
        code: `// Keep CSRF protection enabled by default
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .anyRequest().authenticated()
);`
      },
      paragraphs: [
        "The example intentionally leaves CSRF configuration untouched.",
        "Do not add csrf(csrf -> csrf.disable()) simply because POST, PUT, PATCH, or DELETE requests return an error.",
        "First determine how the application authenticates clients, whether the browser automatically attaches credentials, and whether CSRF protection is required for the application's threat model."
      ],
      bullets: [
        "Do not disable CSRF just to make an error disappear.",
        "Understand the authentication mechanism first.",
        "Understand how credentials are transported.",
        "Determine whether browsers automatically attach those credentials.",
        "Then decide whether CSRF protection should remain enabled."
      ]
    },

    {
      id: "cookie-authentication",
      title: "Cookie-Based Authentication and CSRF",
      paragraphs: [
        "Cookie-based authentication is a classic CSRF scenario because browsers can automatically attach cookies to requests.",
        "If the server uses a session cookie to identify the authenticated user, an attacker may attempt to cause the browser to send a state-changing request while that cookie is attached.",
        "For this reason, CSRF protection is particularly important in browser applications using cookie-based authentication."
      ],
      code: {
        language: "text",
        code: `Browser
   |
   | Cookie: SESSION=abc123
   v
Trusted Application

Malicious Website
   |
   | Attempts POST to trusted application
   v
Browser
   |
   | Cookie may be attached
   v
Trusted Application
   |
   | CSRF validation
   v
Allow or reject`
      },
      bullets: [
        "Session cookies can be automatically attached by the browser.",
        "Cookie authentication therefore requires careful CSRF consideration.",
        "SameSite cookie settings can provide additional browser-level protection but should not be treated as the only security control."
      ]
    },

    {
      id: "stateless",
      title: "What About Stateless REST APIs?",
      paragraphs: [
        "A stateless API using bearer tokens explicitly attached by a client, such as an Authorization header, can have a different CSRF risk profile from a browser application authenticated through cookies.",
        "With a typical bearer-token API, the client explicitly adds the Authorization header to the request. A malicious website generally cannot cause the browser to automatically attach an arbitrary Authorization header containing the application's bearer token.",
        "However, statelessness by itself does not eliminate CSRF risk. The important question is how credentials are transported and whether the browser automatically attaches them.",
        "If an application stores or transports authentication credentials in cookies, the CSRF threat model must still be evaluated even if the server does not maintain a traditional session."
      ],
      code: {
        language: "text",
        code: `Bearer Token API

Client
   |
   | Authorization: Bearer <token>
   v
Spring Boot API

Credential is explicitly supplied
by the API client.

Compare with:

Cookie Authentication

Browser
   |
   | Cookie: SESSION=...
   v
Server

Browser may automatically attach cookie.`
      },
      bullets: [
        "JWT does not automatically mean CSRF is impossible.",
        "Bearer tokens in the Authorization header have a different CSRF threat model from cookies.",
        "Cookie-based token storage requires careful CSRF analysis.",
        "Credential transport matters more than simply calling an API 'REST' or 'stateless'."
      ]
    },

    {
      id: "csrf-vs-cors",
      title: "CSRF vs CORS",
      paragraphs: [
        "CSRF and CORS are related to browser security but solve different problems.",
        "CSRF protects against unwanted authenticated state-changing requests.",
        "CORS controls whether browser JavaScript is allowed to access resources across origins according to the server's declared policy.",
        "CORS should not be used as a replacement for CSRF protection."
      ],
      code: {
        language: "text",
        code: `CSRF
 |
 +--> Prevent forged authenticated state-changing requests
 |
 v
Protect application action

CORS
 |
 +--> Control browser cross-origin access
 |
 v
Control browser JavaScript access`
      },
      bullets: [
        "CSRF and CORS are not the same thing.",
        "CORS is not a replacement for CSRF.",
        "CSRF is not a replacement for authentication.",
        "A secure browser application may need both CORS and CSRF controls."
      ]
    },

    {
      id: "csrf-vs-xss",
      title: "CSRF vs XSS",
      paragraphs: [
        "CSRF and XSS are different attack classes.",
        "CSRF attempts to cause a user's authenticated browser to perform an unwanted action.",
        "XSS involves injecting malicious script content into a page so that code executes in a victim's browser.",
        "Strong XSS defenses are still important even when CSRF protection is enabled."
      ],
      bullets: [
        "CSRF = trick the browser into sending an unwanted authenticated request.",
        "XSS = execute attacker-controlled script in a trusted page context.",
        "CSRF tokens do not replace output encoding or other XSS defenses.",
        "A strong application uses multiple security controls."
      ]
    },

    {
      id: "csrf-methods",
      title: "CSRF and HTTP Methods",
      paragraphs: [
        "CSRF protection is primarily concerned with requests that can change application state.",
        "Although Spring Security's exact CSRF enforcement behavior depends on the configured request handling, developers should design APIs so that safe methods such as GET do not perform state-changing operations."
      ],
      code: {
        language: "text",
        code: `Good API design:

GET    /api/users/10
        -> Read user

POST   /api/users
        -> Create user

PUT    /api/users/10
        -> Replace user

PATCH  /api/users/10
        -> Modify user

DELETE /api/users/10
        -> Delete user`
      },
      bullets: [
        "Do not use GET for destructive operations.",
        "Use appropriate HTTP methods for state-changing operations.",
        "Protect state-changing browser requests with the appropriate CSRF strategy."
      ]
    },

    {
      id: "csrf-disable-example",
      title: "When You May See CSRF Disabled",
      paragraphs: [
        "You will often see tutorials disable CSRF when creating a token-based REST API.",
        "That configuration can be appropriate for a specific architecture, but it should not be copied without understanding how authentication works.",
        "The correct decision depends on credential transport, browser behavior, API clients, and the application's threat model."
      ],
      code: {
        language: "java",
        code: `http
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**")
            .permitAll()
        .anyRequest()
            .authenticated()
    );`
      },
      bullets: [
        "This code disables CSRF protection.",
        "Disabling CSRF is an architectural decision, not a generic REST API requirement.",
        "If authentication uses cookies that browsers automatically attach, disabling CSRF can create security risk.",
        "For bearer-token APIs, evaluate whether the token is automatically attached by the browser and where it is stored."
      ]
    },

    {
      id: "csrf-token-repository",
      title: "CSRF Token Repository",
      paragraphs: [
        "Spring Security supports different strategies for storing and exposing CSRF tokens.",
        "A token repository determines how the token is generated, stored, and made available for validation.",
        "The correct repository depends on the application architecture, especially whether a traditional server-rendered application or a JavaScript frontend needs access to the token."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf
            .csrfTokenRepository(
                CookieCsrfTokenRepository.withHttpOnlyFalse()
            )
        )
        .authorizeHttpRequests(auth -> auth
            .anyRequest()
            .authenticated()
        );

    return http.build();
}`
      },
      paragraphs: [
        "CookieCsrfTokenRepository can be useful for applications where a JavaScript frontend needs to read the CSRF token from a cookie and send it back using the expected request mechanism.",
        "The exact frontend and cookie configuration should be designed deliberately. Setting HttpOnly to false means JavaScript can read that particular CSRF token cookie, so it should only contain the CSRF token and not an authentication credential."
      ]
    },

    {
      id: "react-spring-flow",
      title: "React and Spring Boot CSRF Flow",
      paragraphs: [
        "When a React frontend communicates with a Spring Boot application using cookie-based authentication, the frontend may need to obtain the CSRF token and include it in state-changing requests.",
        "The exact header or token transport should match the Spring Security configuration."
      ],
      code: {
        language: "text",
        code: `React
  |
  | Obtain CSRF token
  v
Spring Boot
  |
  | CSRF token
  v
React
  |
  | POST /api/orders
  | CSRF token header
  | Authentication cookie
  v
Spring Security
  |
  +---- CSRF valid ----> Controller
  |
  +---- CSRF invalid --> 403`
      }
    },

    {
      id: "testing",
      title: "Testing CSRF Protection",
      paragraphs: [
        "CSRF protection should be tested by verifying that state-changing requests behave correctly when the required CSRF token is present and absent.",
        "Spring Security's testing support provides utilities for adding CSRF tokens to MockMvc requests."
      ],
      code: {
        language: "java",
        code: `mockMvc.perform(
        post("/api/users")
            .with(csrf())
    )
    .andExpect(status().isOk());

mockMvc.perform(
        post("/api/users")
    )
    .andExpect(status().isForbidden());`
      },
      bullets: [
        "Test a state-changing request with a valid CSRF token.",
        "Test the same request without a CSRF token.",
        "Verify that invalid tokens are rejected.",
        "Test authentication and CSRF behavior together when cookies or sessions are involved."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common CSRF Mistakes",
      bullets: [
        "Disabling CSRF simply because a POST request returns 403.",
        "Assuming every REST API should disable CSRF.",
        "Assuming stateless automatically means CSRF is impossible.",
        "Ignoring CSRF because the application uses JWT without checking how the JWT is transported.",
        "Storing authentication tokens in cookies without evaluating CSRF risk.",
        "Using GET requests for destructive operations.",
        "Confusing CSRF with CORS.",
        "Confusing CSRF with XSS.",
        "Testing only successful requests and not testing missing or invalid tokens.",
        "Exposing sensitive authentication information while trying to expose a CSRF token.",
        "Treating a CSRF token as an authentication credential.",
        "Assuming a CSRF token replaces authorization."
      ]
    },

    {
      id: "best-practices",
      title: "CSRF Protection Best Practices",
      bullets: [
        "Keep Spring Security CSRF protection enabled when the authentication model requires it.",
        "Understand how authentication credentials are transported before deciding whether CSRF protection can be disabled.",
        "Be especially careful with cookie-based authentication.",
        "Use HTTPS in production.",
        "Use appropriate SameSite cookie settings as part of a broader browser security strategy.",
        "Never use GET for destructive state-changing operations.",
        "Do not treat CORS as a CSRF defense.",
        "Do not treat CSRF protection as authorization.",
        "Test both valid and invalid CSRF scenarios.",
        "Do not expose authentication secrets while exposing CSRF tokens.",
        "Document the reason when an API intentionally disables CSRF.",
        "Review CSRF configuration whenever the authentication architecture changes."
      ]
    },

    {
      id: "complete-flow",
      title: "Complete CSRF Protection Flow",
      paragraphs: [
        "The following diagram summarizes a browser application using cookie-based authentication and CSRF protection."
      ],
      code: {
        language: "text",
        code: `User
  |
  | Login
  v
Spring Security
  |
  | Authenticate user
  v
Session + Authentication Cookie
  |
  v
Browser
  |
  | User opens application
  v
React / Web Application
  |
  | Obtain CSRF token
  v
Browser
  |
  | POST /api/transfer
  | Cookie: session
  | CSRF token
  v
Spring Security
  |
  +---- Authentication valid?
  |
  +---- CSRF token valid?
  |
  +---- Authorization allowed?
  |
  +---- Yes -----------------> Controller
  |
  +---- No ------------------> Security Error Response`
      }
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is CSRF?",
          answer:
            "CSRF is an attack that tricks an authenticated user's browser into sending an unwanted request to a trusted application."
        },
        {
          question: "Why is CSRF especially relevant to cookie-based authentication?",
          answer:
            "Browsers can automatically attach cookies to requests, so an attacker may try to cause the browser to send a state-changing request while the authentication cookie is attached."
        },
        {
          question: "How does CSRF protection work?",
          answer:
            "A legitimate client is required to provide an additional CSRF token or equivalent validation signal with protected state-changing requests. Spring Security validates the token and rejects requests that fail validation."
        },
        {
          question: "Is CSRF the same as CORS?",
          answer:
            "No. CSRF protects against forged authenticated state-changing requests, while CORS controls browser cross-origin access to resources."
        },
        {
          question: "Should CSRF always be disabled for REST APIs?",
          answer:
            "No. The decision depends on how authentication credentials are transported and whether browsers automatically attach them. Cookie-based authentication commonly requires CSRF protection."
        },
        {
          question: "Does stateless authentication automatically eliminate CSRF?",
          answer:
            "No. Statelessness alone does not determine CSRF risk. The important question is whether authentication credentials are automatically attached by the browser."
        },
        {
          question: "Does using JWT automatically mean CSRF is impossible?",
          answer:
            "No. The CSRF threat model depends on how the JWT is transported. A bearer token explicitly supplied in an Authorization header has a different threat model from a token stored in a cookie."
        },
        {
          question: "Why should GET not be used for state-changing operations?",
          answer:
            "GET is intended to be safe and should not perform destructive state changes. Using GET for state changes can make unwanted browser requests and other security problems easier."
        },
        {
          question: "What is a CSRF token repository?",
          answer:
            "It is the mechanism Spring Security uses to generate, store, and make CSRF tokens available for validation according to the application's configuration."
        },
        {
          question: "What is the purpose of CookieCsrfTokenRepository?",
          answer:
            "It allows Spring Security to store the CSRF token in a cookie, which can be useful for JavaScript frontends that need to read the CSRF token and send it back with protected requests."
        },
        {
          question: "Can a CSRF token replace authentication?",
          answer:
            "No. A CSRF token is an additional request validation mechanism. It does not identify the user and does not replace authentication."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A POST request from your browser returns 403 after enabling Spring Security. What would you check first?",
          answer:
            "Check whether CSRF protection is enabled and whether the request contains the expected valid CSRF token. Also verify that the application is using the authentication mechanism and CSRF configuration you intended."
        },
        {
          question:
            "Your application uses session cookies for authentication. Should you disable CSRF?",
          answer:
            "Generally, you should not disable it blindly. Cookie-based browser authentication is a classic CSRF scenario, so CSRF protection should normally remain enabled unless there is a carefully designed alternative defense and threat-model justification."
        },
        {
          question:
            "Your REST API uses Authorization: Bearer JWT for every request. Is the CSRF risk identical to session-cookie authentication?",
          answer:
            "No. A bearer token explicitly supplied in the Authorization header has a different CSRF threat model from a cookie that the browser automatically attaches. The final decision should still be based on the actual token storage and transport design."
        },
        {
          question:
            "Your frontend is React and your backend is Spring Boot. How can React send the CSRF token?",
          answer:
            "The frontend can obtain the token according to the configured Spring Security token repository and send it using the expected header or request mechanism for state-changing requests."
        },
        {
          question:
            "Why can CORS configuration not be used as the only CSRF defense?",
          answer:
            "CORS controls browser cross-origin access, but CSRF concerns unwanted authenticated requests. They solve different problems and should not be treated as interchangeable controls."
        },
        {
          question:
            "Why should a developer document why CSRF was disabled?",
          answer:
            "Disabling CSRF changes the application's security posture. Documenting the authentication mechanism, credential transport, and architectural reason helps future developers understand why the configuration is intentional."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "CSRF = Cross-Site Request Forgery.",
        "CSRF tricks an authenticated browser into sending an unwanted request.",
        "Cookie-based authentication is a major CSRF scenario.",
        "CSRF protection commonly uses a CSRF token.",
        "Spring Security enables CSRF protection by default in typical servlet configurations.",
        "Do not disable CSRF blindly.",
        "Stateless does not automatically mean CSRF is impossible.",
        "Bearer Authorization headers have a different CSRF threat model from automatically attached cookies.",
        "JWT does not automatically eliminate CSRF; token transport matters.",
        "CSRF and CORS are different security mechanisms.",
        "CSRF and XSS are different attack classes.",
        "Do not use GET for destructive operations.",
        "Test both valid and invalid CSRF scenarios.",
        "CSRF tokens do not replace authentication.",
        "CSRF tokens do not replace authorization.",
        "Cookie-based authentication requires careful CSRF consideration.",
        "Use HTTPS in production."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes for Interview",
      paragraphs: [
        "The easiest way to remember CSRF is: an attacker tries to make a victim's already authenticated browser perform an unwanted action against a trusted application.",
        "The classic example is session-cookie authentication. The browser automatically sends the session cookie, so the server may recognize the request as belonging to the authenticated user. CSRF protection adds an additional token or validation signal that the attacker should not be able to provide correctly.",
        "Remember that CSRF, CORS, authentication, and authorization are different concepts. Authentication answers who the caller is, authorization checks what the caller can do, CORS controls browser cross-origin access, and CSRF protects against forged authenticated browser requests.",
        "Do not say 'CSRF should always be disabled for REST APIs' in an interview. A better answer is: 'It depends on the authentication and credential transport model. Cookie-based browser authentication commonly requires CSRF protection, while a bearer token explicitly supplied in an Authorization header has a different CSRF threat model.'",
        "Do not say 'JWT means CSRF is impossible.' The important question is how the token is transported. A token automatically attached as a cookie has different browser security properties from a bearer token explicitly supplied in an Authorization header.",
        "For a strong interview answer, say: 'Spring Security provides CSRF protection for typical servlet applications. A CSRF token is required for protected state-changing requests. I would not disable CSRF blindly; I would first determine whether the application uses cookies or another credential transport and evaluate the browser threat model.'"
      ]
    }
  ]
};
