
export const securityJwtInterviewQuestions = {
  id: 1607,
  title: "Spring Security and JWT Interview Questions",
  slug: "spring-security-and-jwt-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for Spring Security architecture, authentication, authorization, filter chains, password encoding, JWT validation, stateless APIs, and production security best practices.",
  estimatedTime: "50 min",
  sections: [
    {
      id: "security-fundamentals",
      title: "1. Authentication and Authorization",
      paragraphs: [
        "Spring Security is a framework that provides authentication, authorization, and protection against common security threats in Java applications. It integrates with Spring MVC and provides configurable filters, authentication providers, security contexts, and request authorization rules.",
        "Authentication answers the question: Who are you? Authorization answers: What are you allowed to do? For example, a user may authenticate successfully but still be forbidden from accessing an administrator-only endpoint.",
        "A typical Spring Boot application uses a SecurityFilterChain to configure HTTP security. Incoming requests pass through applicable security filters before reaching the controller. Depending on the configuration, the filters may authenticate the request, enforce authorization, handle CSRF, or process other security concerns."
      ],
      bullets: [
        "Authentication: verifies a user's identity using credentials or another supported mechanism.",
        "Authorization: decides whether the authenticated principal has permission to access a resource.",
        "SecurityFilterChain: configures the security filters and request-matching rules.",
        "SecurityContext: holds the current request's authentication information.",
        "GrantedAuthority: represents an authority or permission associated with an authentication.",
        "AuthenticationProvider: performs a particular type of authentication.",
        "UserDetailsService: loads user information for username-based authentication."
      ],
      interviewQuestions: [
        {
          question: "What is Spring Security?",
          answer: "Spring Security provides authentication, authorization, and protection against common web security threats through configurable security infrastructure."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication establishes who the caller is. Authorization determines what that caller is permitted to do."
        },
        {
          question: "What is SecurityFilterChain?",
          answer: "It defines a chain of security filters and request-matching rules used to process and secure HTTP requests."
        },
        {
          question: "What is SecurityContextHolder?",
          answer: "It provides access to the current SecurityContext, which contains the Authentication object representing the current security principal and its authorities. In servlet applications, the default strategy commonly associates the context with the current thread."
        },
        {
          question: "What is GrantedAuthority?",
          answer: "GrantedAuthority represents an authority granted to an authenticated principal, such as ROLE_ADMIN or permission-specific values such as order:read."
        },
        {
          question: "What is the difference between authentication and authorization failures?",
          answer: "Authentication failures generally mean the request lacks valid authentication and commonly produce a 401 response. Authorization failures generally mean the caller lacks permission and commonly produce a 403 response, although entry-point configuration can affect the response."
        }
      ]
    },
    {
      id: "security-filter-chain",
      title: "2. Spring Security Filter Chain Internals",
      paragraphs: [
        "In a typical Spring Boot servlet application, a request passes through the servlet container and the DelegatingFilterProxy, which delegates to Spring Security's FilterChainProxy. FilterChainProxy selects the applicable SecurityFilterChain based on its request matchers.",
        "The selected chain runs its configured security filters. Depending on the configuration, these filters can extract credentials, establish the SecurityContext, enforce request authorization, and handle security exceptions. If the request passes security checks, it can continue to the DispatcherServlet and the matching controller.",
        "The exact filter order depends on the Spring Security version and configuration. Developers should use Spring Security's configuration APIs rather than manually inserting filters at arbitrary positions."
      ],
      bullets: [
        "Client sends an HTTP request.",
        "Servlet container receives the request.",
        "DelegatingFilterProxy delegates to FilterChainProxy.",
        "FilterChainProxy selects the first matching SecurityFilterChain.",
        "Applicable filters process authentication and authorization.",
        "The request reaches Spring MVC if security processing permits it."
      ],
      code: {
        language: "java",
        code: "import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.http.HttpMethod;\nimport org.springframework.security.config.Customizer;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.web.SecurityFilterChain;\n\n@Configuration\npublic class SecurityConfig {\n\n    @Bean\n    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(csrf -> csrf.disable())\n            .sessionManagement(session -> session\n                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(HttpMethod.POST, \"/api/auth/login\").permitAll()\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .requestMatchers(\"/api/**\").authenticated()\n                .anyRequest().permitAll())\n            .httpBasic(Customizer.withDefaults())\n            .build();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "Explain the Spring Security request flow.",
          answer: "The servlet container passes the request through DelegatingFilterProxy to FilterChainProxy. FilterChainProxy selects a matching SecurityFilterChain, whose filters perform the configured security processing before the request reaches Spring MVC."
        },
        {
          question: "What is FilterChainProxy?",
          answer: "It is Spring Security's central filter that selects and invokes the applicable SecurityFilterChain for an incoming request."
        },
        {
          question: "Can an application have multiple SecurityFilterChain beans?",
          answer: "Yes. Different chains can secure different request groups. Their ordering and request matchers matter because the first matching chain is selected."
        },
        {
          question: "What is the difference between requestMatchers and anyRequest?",
          answer: "requestMatchers defines rules for specified paths or request conditions. anyRequest provides the rule for requests that did not match an earlier authorization rule in that chain."
        },
        {
          question: "Should developers manually create every Spring Security filter?",
          answer: "Usually not. Spring Security supplies and configures standard filters. Custom filters should be added only when a real requirement exists and should be placed correctly in the chain."
        }
      ]
    },
    {
      id: "password-encoding",
      title: "3. PasswordEncoder and Password Storage",
      paragraphs: [
        "Passwords should not be stored as plaintext. Spring Security provides the PasswordEncoder abstraction to encode passwords during registration and verify submitted passwords during login.",
        "Password storage should use an adaptive password-hashing algorithm, such as bcrypt, PBKDF2, scrypt, or Argon2, with an appropriate work factor and configuration. These algorithms are designed to make large-scale password guessing more expensive than fast general-purpose hashes.",
        "Encoding and matching are different operations. A password encoder generally produces a salted hash, so encoding the same password twice may produce different strings. During login, use matches(rawPassword, storedHash) instead of encoding the submitted password and comparing the two strings.",
        "Never return password hashes in API responses or write raw passwords to application logs. Password reset, account recovery, rate limiting, and protection against credential stuffing are also important parts of authentication security."
      ],
      code: {
        language: "java",
        code: "import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\nimport org.springframework.security.crypto.password.PasswordEncoder;\n\n@Configuration\npublic class PasswordConfig {\n\n    @Bean\n    PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n}"
      },
      bullets: [
        "Registration: encode the submitted password and store the resulting hash.",
        "Login: use passwordEncoder.matches(rawPassword, storedHash).",
        "Do not store plaintext passwords.",
        "Do not use a fast general-purpose hash such as plain SHA-256 as a password-storage replacement.",
        "Choose password-hashing parameters appropriate for your deployment and review them periodically.",
        "Do not log passwords, authentication secrets, or bearer tokens."
      ],
      interviewQuestions: [
        {
          question: "Why use PasswordEncoder?",
          answer: "It hashes passwords using an appropriate password-hashing algorithm so applications do not store or compare raw passwords."
        },
        {
          question: "Why should we not compare encoded passwords directly?",
          answer: "Salted password encoders can generate a different hash for the same password on each encoding. Use matches(rawPassword, storedHash) to verify the submitted password."
        },
        {
          question: "What is BCryptPasswordEncoder?",
          answer: "It is a Spring Security PasswordEncoder implementation based on bcrypt, an adaptive password-hashing algorithm designed to make password guessing more expensive."
        },
        {
          question: "Why is plaintext password storage dangerous?",
          answer: "A database leak would immediately expose users' actual passwords, including passwords they may have reused on other services."
        },
        {
          question: "What is the difference between encryption and password hashing?",
          answer: "Encryption is designed to be reversible with the appropriate key. Password hashing is designed for verification without recovering the original password."
        }
      ]
    },
    {
      id: "user-details-service",
      title: "4. UserDetailsService and AuthenticationProvider",
      paragraphs: [
        "UserDetailsService is an interface used by username-based authentication to load user information. Its loadUserByUsername method typically retrieves a user record containing the username, encoded password, and authorities.",
        "DaoAuthenticationProvider is a common authentication provider for username and password authentication. It uses a UserDetailsService to load the user and a PasswordEncoder to verify the supplied password.",
        "UserDetailsService does not itself issue JWTs. Token creation is a separate responsibility that an authentication endpoint or authentication service can perform after credentials have been successfully authenticated.",
        "Keep persistence concerns in repositories and authentication orchestration in appropriate service or security components. Handle unknown users and invalid passwords without unnecessarily revealing which account exists."
      ],
      code: {
        language: "java",
        code: "import java.util.List;\nimport org.springframework.security.core.userdetails.User;\nimport org.springframework.security.core.userdetails.UserDetails;\nimport org.springframework.security.core.userdetails.UserDetailsService;\nimport org.springframework.security.core.userdetails.UsernameNotFoundException;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class AppUserDetailsService implements UserDetailsService {\n\n    private final AppUserRepository userRepository;\n\n    public AppUserDetailsService(AppUserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n\n    @Override\n    public UserDetails loadUserByUsername(String username) {\n        AppUser appUser = userRepository.findByUsername(username)\n            .orElseThrow(() -> new UsernameNotFoundException(\"User not found\"));\n\n        return User.withUsername(appUser.getUsername())\n            .password(appUser.getPasswordHash())\n            .authorities(appUser.getAuthorities().toArray(new String[0]))\n            .build();\n    }\n}"
      },
      interviewQuestions: [
        {
          question: "What is the role of UserDetailsService?",
          answer: "It provides user details for username-based authentication, commonly by loading user information and authorities from a data source."
        },
        {
          question: "What is AuthenticationProvider?",
          answer: "It is an abstraction that performs a particular type of authentication. For example, DaoAuthenticationProvider supports username/password authentication using user details and a password encoder."
        },
        {
          question: "Does UserDetailsService generate a JWT?",
          answer: "No. Its main responsibility is to load user details. Token generation belongs to the application's token-issuing flow or an authorization server."
        },
        {
          question: "What happens if the username is not found?",
          answer: "A typical UserDetailsService throws UsernameNotFoundException. The authentication infrastructure then treats the attempt as an authentication failure."
        },
        {
          question: "Why should authorities be loaded carefully?",
          answer: "Authorities determine which operations an authenticated principal can perform. Incorrect or stale authorities can result in unauthorized access."
        }
      ]
    },
    {
      id: "jwt-fundamentals",
      title: "5. JWT Fundamentals",
      paragraphs: [
        "JWT stands for JSON Web Token. It is a compact token format that can carry claims, which are statements about a subject or the token itself. JWTs are commonly used in API authentication, delegated access, and identity-related systems.",
        "A typical signed JWT has three Base64URL-encoded parts separated by periods: header, payload, and signature. The header identifies metadata such as the signing algorithm. The payload contains claims such as subject, issuer, audience, and expiration. The signature allows a verifier to detect unauthorized modification when the token is validated correctly.",
        "A signed JWT is not automatically encrypted. Its header and payload can usually be decoded by anyone who obtains the token. Do not place passwords, private keys, or other confidential information in an ordinary signed JWT payload.",
        "JWT is a token format, not a complete authentication system. The application still needs secure issuance, validation, expiration, key management, authorization, and a strategy for revocation or compromised credentials."
      ],
      bullets: [
        "Header: token metadata, including the algorithm identifier.",
        "Payload: claims about the subject and token.",
        "Signature: protects integrity when validated using the correct key and algorithm.",
        "iss: issuer claim.",
        "sub: subject claim.",
        "aud: intended audience.",
        "exp: expiration time.",
        "iat: issued-at time.",
        "jti: token identifier, often useful in tracking or revocation designs."
      ],
      interviewQuestions: [
        {
          question: "What is a JWT?",
          answer: "A JSON Web Token is a compact token format commonly used to carry claims. A signed JWT can provide integrity verification, but signing does not encrypt its payload."
        },
        {
          question: "What are the three parts of a typical signed JWT?",
          answer: "The header, payload, and signature, encoded and separated by periods."
        },
        {
          question: "Is a JWT encrypted by default?",
          answer: "No. A typical signed JWT has an encoded header and payload that can be decoded. Encryption requires a separate encrypted-token format and appropriate key management."
        },
        {
          question: "What is the difference between a JWT and a session?",
          answer: "A session commonly relies on server-side state identified by a session cookie. A JWT can carry signed claims that a resource server validates, but JWT-based systems may still maintain server-side state for revocation, refresh tokens, or other purposes."
        },
        {
          question: "What are claims in a JWT?",
          answer: "Claims are statements carried by a token, such as its subject, issuer, audience, issue time, expiration, or application-specific permissions."
        },
        {
          question: "What is the purpose of the exp claim?",
          answer: "The exp claim defines when a token expires. A verifier should reject an expired token, allowing only the explicitly configured clock-skew tolerance."
        }
      ]
    },
    {
      id: "jwt-validation",
      title: "6. JWT Validation and Authentication Filters",
      paragraphs: [
        "A JWT authentication flow normally starts when a client sends an access token in the Authorization header using the Bearer scheme. The server extracts the token and validates it before trusting its claims.",
        "Validation should include the cryptographic signature and an explicitly trusted algorithm, expiration, issuer, and audience where applicable. The server must not trust a user ID, role, or other claim merely because it appears in the decoded payload.",
        "If validation succeeds, the application can construct an Authentication object and place it in the SecurityContext for the current request. Authorization rules then decide whether that principal can access the requested endpoint.",
        "For many Spring Boot resource servers, Spring Security's OAuth2 Resource Server support is preferable to writing a JWT filter from scratch. It provides established bearer-token processing and integrates JWT decoding, validation, and authentication with the security filter chain."
      ],
      "code": {
        "language": "java",
        "code": "import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.config.Customizer;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.web.SecurityFilterChain;\n\n@Configuration\npublic class ApiSecurityConfig {\n\n    @Bean\n    SecurityFilterChain apiSecurityFilterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(csrf -> csrf.disable())\n            .sessionManagement(session -> session\n                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/public/**\").permitAll()\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .requestMatchers(\"/api/**\").authenticated()\n                .anyRequest().permitAll())\n            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))\n            .build();\n    }\n}"
      },
      "bullets": [
        "The example uses Spring Security's resource-server JWT support rather than a custom token-parsing filter.",
        "Add the spring-boot-starter-oauth2-resource-server dependency.",
        "Configure a trusted issuer or public verification key using the appropriate Spring Boot properties.",
        "Ensure the configured decoder validates the required issuer and audience claims for your environment.",
        "Return a 401 response for invalid or missing authentication when a protected endpoint requires it.",
        "Return a 403 response when an authenticated principal lacks the required authority."
      ],
      "interviewQuestions": [
        {
          question: "How does a JWT authentication filter work?",
          answer: "It extracts a bearer token from the request, validates the token and relevant claims, and establishes an authenticated security context when validation succeeds."
        },
        {
          question: "Why is decoding a JWT not enough?",
          answer: "Decoding reveals the claims but does not establish that the token is authentic. The server must validate its signature or other applicable cryptographic protection and enforce relevant claim checks."
        },
        {
          question: "Why must the server validate the algorithm?",
          answer: "The verifier must use an explicitly trusted algorithm and appropriate key configuration. It must not blindly trust an algorithm selected by untrusted token input."
        },
        {
          question: "What is the difference between a JWT filter and OAuth2 Resource Server support?",
          answer: "A custom filter implements token extraction and authentication logic directly. OAuth2 Resource Server provides standard bearer-token processing and integrates with Spring Security's decoder, authentication, and error-handling infrastructure."
        },
        {
          question: "What should happen when a token is expired?",
          answer: "The server should reject the expired access token. The client may obtain a new token through an authorized refresh flow, if the application supports one."
        }
      ]
    },
    {
      id: "jwt-signing-keys",
      title: "7. JWT Signing Algorithms and Key Management",
      paragraphs: [
        "JWT signing commonly uses either symmetric or asymmetric cryptography. With a symmetric algorithm such as HS256, the same secret is used to sign and verify the token. With an asymmetric algorithm such as RS256, a private key signs the token and a corresponding public key verifies it.",
        "Asymmetric signing is useful when multiple resource servers need to verify tokens without possessing the private signing key. The issuer can keep the private key protected and publish trusted public keys through a controlled key-distribution mechanism.",
        "The token's algorithm field is untrusted input until validation succeeds. Configure an explicit algorithm policy, trust the appropriate key source, validate the issuer, and rotate keys through a planned process.",
        "Signing secrets and private keys must never be committed to source control. Use protected environment configuration or a secrets manager, restrict access, and ensure that logs do not expose tokens or key material."
      ],
      "bullets": [
        "HS256: symmetric HMAC signing; signers and verifiers share the secret.",
        "RS256: RSA signature; private key signs and public key verifies.",
        "Key rotation: introduce new trusted keys while accounting for existing tokens and the maximum token lifetime.",
        "Key separation: do not reuse one secret for unrelated purposes.",
        "Issuer validation: verify who issued the token.",
        "Audience validation: ensure the token is intended for this API.",
        "Algorithm policy: accept only explicitly trusted algorithms and key types."
      ],
      "interviewQuestions": [
        {
          question: "What is the difference between HS256 and RS256?",
          answer: "HS256 uses a shared secret for signing and verification. RS256 uses an RSA private key for signing and the corresponding public key for verification."
        },
        {
          question: "Where should a JWT signing secret be stored?",
          answer: "Store it in protected deployment configuration or a secrets-management system, restrict access, use sufficient cryptographic strength, and support rotation where required."
        },
        {
          question: "Why might RS256 be useful for microservices?",
          answer: "Resource servers can verify tokens with a public key without receiving the private signing key. This reduces the number of services that need access to the signing capability."
        },
        {
          question: "Why validate issuer and audience?",
          answer: "Issuer validation confirms the trusted token issuer. Audience validation helps ensure that a token issued for one service or purpose is not incorrectly accepted by another."
        },
        {
          question: "What is JWT key rotation?",
          answer: "It is the process of introducing new signing or verification keys and retiring old ones safely while accounting for outstanding tokens and trusted key-distribution configuration."
        }
      ]
    },
    {
      id: "access-refresh-tokens",
      title: "8. Access Tokens and Refresh Tokens",
      paragraphs: [
        "An access token is presented to a protected API to authorize a request. Access tokens are commonly short-lived so that exposure has a limited validity window.",
        "A refresh token is used with an authorized token endpoint to obtain a new access token. Refresh tokens are more sensitive because they can extend access over time. Their storage, expiration, rotation, reuse detection, and revocation must be designed carefully.",
        "A refresh token should not be accepted as if it were an ordinary API access token. The token endpoint should verify the refresh token's purpose and status and issue a new access token only when the refresh flow is valid.",
        "JWT access tokens are often validated without a database lookup on every request, but revocation is more complicated than with a server-side session. Systems may use short access-token lifetimes, refresh-token rotation, deny lists, token-version checks, or opaque tokens with introspection depending on their security and scalability needs."
      ],
      "bullets": [
        "Access token: presented to protected APIs.",
        "Refresh token: used to obtain new access tokens.",
        "Short lifetime: reduces the time window for a stolen access token.",
        "Refresh-token rotation: issues a replacement and invalidates the previous refresh token.",
        "Reuse detection: can help identify a stolen or replayed refresh token.",
        "Revocation: may require server-side state or a token-validation strategy that checks current status."
      ],
      "interviewQuestions": [
        {
          question: "What is the difference between access and refresh tokens?",
          answer: "Access tokens are presented to access protected resources and are usually short-lived. Refresh tokens are used to obtain new access tokens and require careful storage, rotation, and revocation design."
        },
        {
          question: "Why should access tokens have a short lifetime?",
          answer: "A short lifetime limits the period in which a stolen access token can be used without obtaining a replacement. It does not eliminate the need for secure storage and validation."
        },
        {
          question: "Can a refresh token be used to call every protected API?",
          answer: "No. Refresh tokens should be accepted only by the intended refresh flow. Resource APIs should validate access tokens intended for those APIs."
        },
        {
          question: "How can a refresh token be revoked?",
          answer: "A server can maintain refresh-token state and mark a token revoked, rotate tokens and detect reuse, or apply another server-side token lifecycle strategy appropriate to the design."
        },
        {
          question: "How can a system revoke a JWT before it expires?",
          answer: "A fully stateless verifier generally cannot know that a token has been revoked without additional state or coordination. Options include short token lifetimes, a deny list, token-version checks, or switching to opaque tokens with introspection."
        }
      ]
    },
    {
      id: "stateless-security-and-csrf",
      title: "9. Stateless Authentication and CSRF",
      paragraphs: [
        "A stateless API commonly uses SessionCreationPolicy.STATELESS so Spring Security does not use an HTTP session to persist the SecurityContext between requests. The client presents credentials, such as a bearer access token, with each request.",
        "Stateless authentication can simplify horizontal scaling because the application does not need a shared HTTP session for each authenticated client. However, stateless does not mean the application has no server-side state at all: refresh-token records, revocation lists, account status, and authorization data may still be stored.",
        "Cross-Site Request Forgery is especially relevant when browsers automatically attach credentials, such as cookies, to requests. A bearer token explicitly attached by application code is not automatically sent cross-site in the same way, but browser storage, cross-origin behavior, XSS, and other design choices still matter.",
        "Do not disable CSRF protection merely because an application uses JWTs. First establish how credentials are transported and whether browsers attach them automatically. Cookie-based authentication generally requires an appropriate CSRF defense."
      ],
      "code": {
        "language": "java",
        "code": "import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.web.SecurityFilterChain;\n\n@Configuration\npublic class StatelessApiConfig {\n\n    @Bean\n    SecurityFilterChain statelessApi(HttpSecurity http) throws Exception {\n        return http\n            .sessionManagement(session -> session\n                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/public/**\").permitAll()\n                .requestMatchers(\"/api/**\").authenticated()\n                .anyRequest().permitAll())\n            // CSRF is intentionally not disabled here.\n            // Decide based on the application's credential transport.\n            .build();\n    }\n}"
      },
      "interviewQuestions": [
        {
          question: "What is a stateless REST API?",
          answer: "It does not rely on server-side HTTP session state to remember the client between requests. Each request carries the authentication information needed for the configured validation process."
        },
        {
          question: "Why use SessionCreationPolicy.STATELESS?",
          answer: "It configures Spring Security not to use an HTTP session to persist the SecurityContext between requests, which is useful for bearer-token APIs."
        },
        {
          question: "Does stateless authentication automatically remove CSRF risk?",
          answer: "No. CSRF considerations depend on how credentials are transported and attached to requests. Automatically attached cookies can create CSRF risks even when server sessions are not used."
        },
        {
          question: "When is disabling CSRF more defensible?",
          answer: "It may be appropriate for an API that uses credentials explicitly attached by clients rather than automatically attached browser credentials, after evaluating the complete authentication and browser security design."
        },
        {
          question: "Does stateless mean the server stores no authentication-related data?",
          answer: "No. The server may still store refresh-token state, revocation records, account status, permissions, or other security information."
        }
      ]
    },
    {
      id: "authorization-roles-permissions",
      title: "10. Roles, Authorities, and Method Security",
      paragraphs: [
        "Authentication identifies the principal, while authorization determines which actions that principal can perform. Spring Security supports request-level rules and method-level security.",
        "The hasRole(\"ADMIN\") expression conventionally checks for the authority ROLE_ADMIN. The hasAuthority(\"order:read\") expression checks for that exact authority value. Use a consistent naming convention across user data, JWT claim conversion, and authorization rules.",
        "Method security allows the application to protect service operations even when they are invoked through paths other than a particular controller. Enable it explicitly when using annotations such as @PreAuthorize.",
        "A role claim inside a JWT is not trusted until the token is validated. The application must also map claims to Spring Security authorities correctly and ensure that the token's issuer and audience are appropriate."
      ],
      "code": {
        "language": "java",
        "code": "import org.springframework.context.annotation.Configuration;\nimport org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;\nimport org.springframework.security.access.prepost.PreAuthorize;\nimport org.springframework.stereotype.Service;\n\n@Configuration\n@EnableMethodSecurity\nclass MethodSecurityConfig {\n}\n\n@Service\nclass AdminReportService {\n\n    @PreAuthorize(\"hasRole('ADMIN')\")\n    public String generateReport() {\n        return \"Sensitive administrative report\";\n    }\n\n    @PreAuthorize(\"hasAuthority('order:read')\")\n    public String readOrderData() {\n        return \"Order data\";\n    }\n}"
      },
      "interviewQuestions": [
        {
          question: "What is the difference between hasRole and hasAuthority?",
          answer: "hasRole conventionally adds the ROLE_ prefix to the supplied role name. hasAuthority checks the exact authority string."
        },
        {
          question: "What is @PreAuthorize?",
          answer: "It is a method-security annotation that evaluates an authorization expression before invoking a protected method, when method security is enabled and the call passes through the relevant security interceptor."
        },
        {
          question: "How do you enable method-level security?",
          answer: "Use @EnableMethodSecurity in a configuration class and then apply annotations such as @PreAuthorize to appropriate methods."
        },
        {
          question: "Why is controller-only authorization sometimes insufficient?",
          answer: "A service method might be reached through another controller, scheduled process, or internal call path. Method security can protect sensitive operations at the service boundary as an additional defense."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer: "401 generally indicates that valid authentication is missing or unsuccessful. 403 indicates that the request is understood but the caller is not authorized to perform the operation."
        }
      ]
    },
    {
      id: "security-exceptions-cors",
      title: "11. Security Errors, CORS, and API Responses",
      paragraphs: [
        "Spring Security distinguishes authentication failures from authorization failures. AuthenticationEntryPoint handles requests that require authentication but do not have valid authentication, while AccessDeniedHandler handles access-denied cases.",
        "For APIs, return clear but non-sensitive error responses. Do not disclose signing keys, full tokens, password hashes, stack traces, or internal implementation details in authentication errors.",
        "Cross-Origin Resource Sharing is a browser-enforced policy controlling which origins can access responses from another origin. CORS is not an authentication mechanism and does not replace authorization.",
        "When using a separate React frontend, configure the allowed origins, HTTP methods, and headers deliberately. If cookies or other credentials are involved, configure credential support and origin rules carefully; wildcard origins cannot be used as a general substitute for an explicit credentialed-origin policy."
      ],
      "bullets": [
        "401 Unauthorized: commonly used when authentication is missing or invalid.",
        "403 Forbidden: commonly used when the authenticated caller lacks permission.",
        "CORS: controls browser cross-origin access; it does not authenticate users.",
        "AuthenticationEntryPoint: handles authentication-required failures.",
        "AccessDeniedHandler: handles access-denied failures.",
        "Avoid exposing sensitive token or cryptographic details in error responses."
      ],
      "interviewQuestions": [
        {
          question: "What is AuthenticationEntryPoint?",
          answer: "It handles authentication-required failures, such as a request to a protected resource without valid authentication. It commonly produces a 401 response for REST APIs."
        },
        {
          question: "What is AccessDeniedHandler?",
          answer: "It handles access-denied failures, commonly producing a 403 response when an authenticated principal does not have sufficient authority."
        },
        {
          question: "What is CORS?",
          answer: "Cross-Origin Resource Sharing is a browser security mechanism that controls which origins can make certain cross-origin requests and access their responses."
        },
        {
          question: "Does CORS secure a backend API against unauthorized clients?",
          answer: "No. CORS is not authentication or authorization. Non-browser clients can make requests without being constrained by browser CORS enforcement, so the API must enforce its own security rules."
        },
        {
          question: "How should a React frontend and Spring Boot backend handle CORS?",
          answer: "Configure the required frontend origins, methods, and headers in the backend or an appropriate gateway. Use explicit origins when credentials are involved, and continue enforcing authentication and authorization independently."
        }
      ]
    },
    {
      id: "jwt-production-security",
      title: "12. JWT Security Best Practices",
      paragraphs: [
        "JWT security depends on the entire token lifecycle, not just the signing algorithm. Token issuance, transport, validation, storage, expiration, refresh, revocation, and authorization must work together.",
        "Always use HTTPS for token-bearing requests. Avoid storing access tokens in insecure locations, prevent tokens from appearing in logs and URLs, and apply appropriate protections against cross-site scripting and cross-site request forgery based on the application's architecture.",
        "Validate tokens with trusted keys and an explicit algorithm policy. Check expiration and the claims required by the application, especially issuer and audience. Reject malformed tokens and avoid accepting tokens intended for a different service or purpose.",
        "Keep access tokens short-lived when appropriate, protect refresh tokens more carefully, and plan for key rotation and compromised credentials. Monitor repeated authentication failures and apply rate limits to sensitive authentication endpoints."
      ],
      "bullets": [
        "Use HTTPS for all authentication and token-bearing requests.",
        "Validate signature, algorithm, expiration, issuer, and audience as required.",
        "Never store passwords, private keys, or confidential information in an ordinary signed JWT payload.",
        "Keep signing keys in protected configuration or a secrets manager.",
        "Use short-lived access tokens where appropriate.",
        "Design refresh-token rotation and revocation deliberately.",
        "Never place bearer tokens in URLs or log them.",
        "Protect browser applications against XSS and apply CSRF controls where credential transport requires them.",
        "Use least-privilege authorities and validate authorization at sensitive operations.",
        "Plan for key rotation, account disablement, monitoring, and incident response."
      ],
      "interviewQuestions": [
        {
          question: "How do you secure JWT authentication in production?",
          answer: "Use HTTPS, protect signing keys, validate signatures and required claims, use appropriate token lifetimes, secure refresh-token handling, enforce least-privilege authorization, and plan for revocation and key rotation."
        },
        {
          question: "What happens if a JWT is stolen?",
          answer: "An attacker may be able to use it until it expires or is otherwise rejected. Reduce risk with secure transport and storage, short lifetimes, appropriate revocation mechanisms, and monitoring for suspicious use."
        },
        {
          question: "Should JWTs be stored in localStorage?",
          answer: "It depends on the application threat model. JavaScript-accessible storage can expose tokens to successful XSS. Cookie-based storage has different trade-offs and requires careful cookie and CSRF configuration. Choose deliberately rather than treating either option as universally safe."
        },
        {
          question: "Why should tokens not be placed in URLs?",
          answer: "URLs can be captured in browser history, access logs, analytics, screenshots, and referrer data. Bearer tokens should generally be sent through the Authorization header over HTTPS."
        },
        {
          question: "Can JWT authentication eliminate all database lookups?",
          answer: "No. A resource server may validate a self-contained access token without looking up the user on every request, but revocation, account status, current permissions, and other business rules may still require server-side state."
        }
      ]
    },
    {
      id: "security-testing",
      title: "13. Testing Spring Security and JWT",
      paragraphs: [
        "Security testing should verify both allowed and denied requests. Test public endpoints, authenticated endpoints, role restrictions, invalid tokens, expired tokens, and malformed credentials.",
        "Spring Security Test provides MockMvc integration and request post-processors such as user() and jwt() for appropriate test scenarios. A test using a mocked JWT authentication context can verify authorization rules, but it does not by itself prove that real cryptographic token validation is configured correctly.",
        "Use separate tests for decoder configuration, issuer and audience validation, signing-key behavior, and token expiration. When using a real JWT decoder, provide test keys and tokens suitable for the configuration being exercised.",
        "For authorization rules, verify that an authenticated user with the required authority succeeds and a user without it receives the expected denial response."
      ],
      "code": {
        "language": "java",
        "code": "import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\nimport org.springframework.boot.test.context.SpringBootTest;\nimport org.springframework.security.test.context.support.WithMockUser;\nimport org.springframework.test.web.servlet.MockMvc;\n\n@SpringBootTest\n@AutoConfigureMockMvc\nclass SecurityAuthorizationTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @Test\n    void anonymousUserCannotAccessProtectedEndpoint() throws Exception {\n        mockMvc.perform(get(\"/api/orders\"))\n            .andExpect(status().isUnauthorized());\n    }\n\n    @Test\n    @WithMockUser(roles = \"ADMIN\")\n    void adminCanAccessAdminEndpoint() throws Exception {\n        mockMvc.perform(get(\"/api/admin/reports\"))\n            .andExpect(status().isOk());\n    }\n}"
      },
      "bullets": [
        "Include spring-boot-starter-test and spring-security-test in the test setup.",
        "Adjust expected HTTP statuses to match your actual exception-handling and entry-point configuration.",
        "Test that protected routes reject missing and invalid tokens.",
        "Test role and authority restrictions.",
        "Test issuer, audience, signature, and expiration validation with suitable decoder tests.",
        "Do not treat @WithMockUser as proof that JWT parsing and signature verification work."
      ],
      "interviewQuestions": [
        {
          question: "How do you test secured endpoints using MockMvc?",
          answer: "Use MockMvc to make requests and assert status codes. Spring Security Test provides helpers such as @WithMockUser and request post-processors to test authentication and authorization behavior."
        },
        {
          question: "Does @WithMockUser test JWT signature validation?",
          answer: "No. It supplies a test authentication context. Use tests that exercise the configured JWT decoder and real test tokens to verify cryptographic and claim validation."
        },
        {
          question: "What security test cases should a JWT API include?",
          answer: "Test missing, malformed, expired, and invalidly signed tokens; incorrect issuer or audience; allowed and denied authorities; and public endpoint behavior."
        }
      ]
    },
    {
      id: "security-common-mistakes",
      title: "14. Common Spring Security and JWT Mistakes",
      paragraphs: [
        "Many authentication vulnerabilities arise from trusting token contents before validating them, misconfiguring request authorization, or confusing stateless operation with complete security.",
        "A signed JWT does not hide its payload. A valid signature does not prove that the token was issued for the current API unless issuer, audience, and other required claims are checked.",
        "A custom JWT filter introduces responsibility for parsing, validation, error handling, and security-context management. Prefer established resource-server support unless custom behavior is genuinely required.",
        "Security configuration must be tested end to end. A request matcher that is too broad, an incorrect authority mapping, or an endpoint accidentally marked permitAll can expose sensitive operations."
      ],
      "bullets": [
        "Trusting decoded claims without verifying the token.",
        "Accepting unexpected signing algorithms or untrusted keys.",
        "Ignoring issuer, audience, or expiration checks.",
        "Disabling CSRF without reviewing how credentials are transported.",
        "Using weak secrets or committing keys to source control.",
        "Returning password hashes or sensitive authentication details in API responses.",
        "Assuming CORS replaces backend authorization.",
        "Confusing hasRole and hasAuthority semantics.",
        "Testing only successful authentication and ignoring failure cases.",
        "Assuming a stateless JWT is automatically revocable without additional design."
      ],
      "interviewQuestions": [
        {
          question: "What is a common JWT security mistake?",
          answer: "Decoding a token and trusting its claims without validating its signature, trusted algorithm, expiration, issuer, audience, and other required conditions."
        },
        {
          question: "Why should you prefer standard JWT resource-server support when possible?",
          answer: "It provides established bearer-token processing and integrates validation with Spring Security. This reduces the amount of custom security-sensitive code that the application must maintain."
        },
        {
          question: "What can go wrong with permitAll?",
          answer: "If applied to the wrong request matcher or ordered incorrectly, it can unintentionally expose endpoints that should require authentication or a specific authority."
        },
        {
          question: "What is the most important difference between JWT signing and encryption?",
          answer: "Signing protects integrity and authenticity when correctly verified, but it does not hide the payload. Encryption is required when token contents must remain confidential."
        }
      ]
    },
    {
      id: "security-quick-revision",
      title: "15. Quick Revision Notes",
      paragraphs: [
        "Spring Security provides authentication, authorization, and web security protections. SecurityFilterChain configures the applicable request-processing filters, while SecurityContext contains the current Authentication.",
        "PasswordEncoder securely hashes passwords and verifies them with matches(). UserDetailsService loads user information for username-based authentication. DaoAuthenticationProvider commonly combines user loading and password verification.",
        "A typical signed JWT contains a header, payload, and signature. Signing does not encrypt the payload. Validate the signature, trusted algorithm, expiration, issuer, audience, and other claims required by the application.",
        "Access tokens are used with protected APIs; refresh tokens obtain new access tokens and require careful lifecycle management. Stateless authentication does not automatically eliminate CSRF risk or provide immediate token revocation.",
        "For Spring Boot APIs, consider Spring Security OAuth2 Resource Server support rather than implementing custom JWT validation. Use HTTPS, secure keys, least-privilege authorization, explicit CORS rules, and comprehensive security tests."
      ],
      bullets: [
        "Authentication = who are you?",
        "Authorization = what can you access?",
        "SecurityFilterChain = request security configuration.",
        "PasswordEncoder = password hashing and verification.",
        "UserDetailsService = load user details.",
        "JWT = header + payload + signature for a typical signed token.",
        "A signed JWT is not automatically encrypted.",
        "401 = authentication required or invalid; 403 = access denied.",
        "HS256 uses a shared secret; RS256 uses a private/public key pair.",
        "Access token = API access; refresh token = obtain a new access token.",
        "STATELESS = no SecurityContext persistence in an HTTP session.",
        "CSRF protection depends on credential transport, not just token format.",
        "Validate signature, algorithm, expiration, issuer, and audience as required.",
        "Prefer standard resource-server support for JWT-protected APIs.",
        "Test invalid tokens, authorization failures, and key/claim validation."
      ]
    }
  ]
};
