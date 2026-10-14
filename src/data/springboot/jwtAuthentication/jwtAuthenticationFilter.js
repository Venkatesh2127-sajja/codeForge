
export const jwtAuthenticationFilter = {
  id: 1207,
  title: "JWT Authentication Filter",
  slug: "jwt-authentication-filter",
  topicTitle: "JWT Authentication",
  description:
    "Understand OncePerRequestFilter, bearer-token extraction, JWT validation, user loading, SecurityContext management, filter-chain configuration, and authentication failure handling in Spring Security.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "filter-purpose",
      title: "1. What Is a JWT Authentication Filter?",
      paragraphs: [
        "A JWT authentication filter is a component in the Spring Security filter chain that examines incoming HTTP requests for a bearer token. When a token is present, the filter validates it and, if validation succeeds, establishes an authenticated identity for the current request.",
        "In a stateless REST API, the client commonly sends an access token in the Authorization header. The filter extracts the token, asks a JWT service to validate it, resolves the associated user when required, and creates a Spring Security Authentication object.",
        "The filter is part of authentication, not token generation. Token generation normally happens after successful login. The authentication filter processes tokens that clients send with subsequent requests.",
        "A JWT filter does not replace Spring Security. It integrates with the security framework by placing the resulting Authentication in the SecurityContext. Spring Security can then apply authorization rules such as requiring an authenticated user or an ADMIN role.",
        "If the request does not contain a bearer token, the filter can usually continue without setting authentication. Public endpoints may still be accessible, while protected endpoints will be rejected later by the security configuration.",
        "If a bearer token is present but invalid, the request must not be treated as authenticated. A consistent implementation returns an authentication failure rather than silently ignoring the invalid credential and potentially creating confusing security behavior."
      ],
      bullets: [
        "Reads the Authorization header.",
        "Extracts a Bearer token.",
        "Validates the token's signature and required claims.",
        "Resolves the identity represented by the token.",
        "Creates an Authentication object after successful validation.",
        "Stores authentication in the SecurityContext.",
        "Continues the filter chain so Spring Security can authorize the request.",
        "Does not generate access tokens."
      ],
      code: {
        language: "text",
        code: "Client sends HTTP request\n        |\n        v\nSpring Security filter chain\n        |\n        v\nJWT authentication filter\n        |\n        +---- No bearer token ----> Continue without authentication\n        |\n        +---- Invalid token ------> Authentication failure\n        |\n        +---- Valid token --------> Create Authentication\n                                         |\n                                         v\n                                Set SecurityContext\n                                         |\n                                         v\n                                Continue filter chain\n                                         |\n                                         v\n                                Authorization and controller"
      }
    },
    {
      id: "flow",
      title: "2. Filter Processing Flow",
      paragraphs: [
        "The filter runs before the controller. A request passes through the configured Spring Security filters before Spring MVC dispatches it to a controller handler.",
        "First, the filter reads the Authorization header and checks whether it uses the Bearer scheme. If no bearer token is supplied, the filter normally continues without establishing JWT-based authentication.",
        "Next, the filter extracts the token and validates it. Validation should verify the signature with a trusted key and check required claims such as expiration, issuer, and audience according to the application's token policy.",
        "After validation, the filter obtains the identity from the trusted token subject. Depending on the design, it may load the corresponding user through UserDetailsService to obtain current authorities and check account status.",
        "The filter then constructs an authenticated Authentication object and places it in the SecurityContext. Downstream security components can use that authentication to decide whether the request is authorized.",
        "If the token is invalid, the filter should return or delegate an authentication failure. Do not continue as though authentication succeeded. An authentication failure should normally result in HTTP 401, while a successfully authenticated user who lacks permission normally receives HTTP 403."
      ],
      code: {
        language: "text",
        code: "HTTP Request\n    |\n    v\nRead Authorization header\n    |\n    v\nIs the scheme Bearer?\n    |\n    +-- No token --> Continue filter chain\n    |\n    +-- Yes\n         |\n         v\n    Extract token\n         |\n         v\n    Validate signature and claims\n         |\n         +-- Invalid --> Return authentication failure\n         |\n         +-- Valid\n              |\n              v\n         Resolve user and authorities\n              |\n              v\n         Create Authentication\n              |\n              v\n         Set SecurityContext\n              |\n              v\n         Continue filter chain"
      }
    },
    {
      id: "implementation-guidance",
      title: "3. Implementation Requirements",
      paragraphs: [
        "A custom servlet-based JWT filter commonly extends OncePerRequestFilter. It implements doFilterInternal, which receives the current HttpServletRequest, HttpServletResponse, and FilterChain.",
        "The filter should depend on a JWT service for token validation rather than implementing cryptographic verification itself. A user lookup component can resolve the authenticated user and current authorities.",
        "Only use claims from a token after its signature and required claims have been validated. A username or role supplied in an unverified token must never be treated as trusted identity information.",
        "Set the SecurityContext only after authentication succeeds. If the application already has an authenticated context, avoid overwriting it without a deliberate reason.",
        "Authentication failures must be handled consistently. Because custom filters can run before Spring Security's exception-translation filter, exceptions thrown by an early filter are not necessarily translated into HTTP responses automatically. An injected AuthenticationEntryPoint is one way to handle invalid bearer credentials explicitly.",
        "Keep token issuance in the login flow and token validation in the authentication layer. Separating these responsibilities makes the code easier to test and maintain."
      ],
      bullets: [
        "Use OncePerRequestFilter for a typical servlet-based implementation.",
        "Delegate token parsing and validation to a trusted JWT service.",
        "Use a stable identity model for the token subject and application user.",
        "Never trust roles or usernames from an unverified token.",
        "Handle invalid tokens as authentication failures.",
        "Do not swallow every exception and continue with an unauthenticated request.",
        "Keep authentication logic separate from business logic.",
        "Configure the filter within the Spring Security filter chain."
      ]
    },
    {
      id: "once-per-request-filter",
      title: "4. What Is OncePerRequestFilter?",
      paragraphs: [
        "OncePerRequestFilter is a Spring Web base class for servlet filters that need once-per-request-dispatch behavior under its filtering rules. It provides an implementation of the Filter contract and asks subclasses to implement doFilterInternal.",
        "A subclass does not normally need to implement the generic doFilter method. Instead, it implements doFilterInternal with the logic for the current request.",
        "The word 'once' needs some care. Servlet requests can involve different dispatch types, including REQUEST, ASYNC, and ERROR. OncePerRequestFilter provides rules and overridable methods for controlling behavior across dispatches; it should not be interpreted as a guarantee that every possible application scenario executes the filter exactly once regardless of dispatch configuration.",
        "For a JWT authentication filter, this abstraction avoids repeating the standard servlet-filter bookkeeping. The developer can focus on reading the bearer token, validating it, establishing authentication, and continuing the chain.",
        "A filter should normally call filterChain.doFilter exactly once when it intends to continue processing. If it writes an authentication failure response, it should return rather than continue to the controller."
      ],
      code: {
        language: "java",
        code: "import jakarta.servlet.FilterChain;\nimport jakarta.servlet.ServletException;\nimport jakarta.servlet.http.HttpServletRequest;\nimport jakarta.servlet.http.HttpServletResponse;\nimport java.io.IOException;\nimport org.springframework.web.filter.OncePerRequestFilter;\n\npublic class ExampleFilter extends OncePerRequestFilter {\n\n    @Override\n    protected void doFilterInternal(\n            HttpServletRequest request,\n            HttpServletResponse response,\n            FilterChain filterChain)\n            throws ServletException, IOException {\n\n        // Perform request-specific filter processing here.\n\n        filterChain.doFilter(request, response);\n    }\n}"
      },
      bullets: [
        "OncePerRequestFilter is part of Spring Web.",
        "doFilterInternal contains the custom filter logic.",
        "The request and response represent the current servlet exchange.",
        "FilterChain allows processing to continue to the next filter.",
        "Do not call the chain after completing a terminal authentication-failure response.",
        "Dispatch behavior can be customized when asynchronous or error dispatches require special handling."
      ]
    },
    {
      id: "authorization-header",
      title: "5. Extract the Bearer Token",
      paragraphs: [
        "A common JWT API uses the Authorization header with the Bearer authentication scheme. For example, a client may send Authorization: Bearer followed by the access-token string.",
        "The filter should check whether the header exists and whether the scheme is Bearer before extracting the token. Header names are case-insensitive, and implementations should handle the scheme according to the intended HTTP authentication behavior.",
        "Do not extract a token from arbitrary headers or query parameters unless a separate, deliberate protocol requires it. Tokens in URLs are particularly risky because URLs may be stored in browser history, access logs, proxy logs, or referrer data.",
        "If the request has no bearer token, a common design lets the filter continue without setting authentication. The endpoint's authorization rules later decide whether anonymous access is permitted.",
        "If a bearer credential is explicitly supplied but malformed or invalid, the filter should reject it consistently rather than silently accepting a different identity source."
      ],
      code: {
        language: "java",
        code: "import jakarta.servlet.http.HttpServletRequest;\n\npublic final class BearerTokenExtractor {\n\n    private BearerTokenExtractor() {\n    }\n\n    public static String extract(HttpServletRequest request) {\n        String header = request.getHeader(\"Authorization\");\n\n        if (header == null || header.isBlank()) {\n            return null;\n        }\n\n        if (!header.regionMatches(true, 0, \"Bearer \", 0, 7)) {\n            return null;\n        }\n\n        String token = header.substring(7).trim();\n\n        return token.isEmpty() ? null : token;\n    }\n}"
      },
      bullets: [
        "Header format: Authorization: Bearer <access-token>.",
        "Do not log the extracted token.",
        "Do not treat an arbitrary header value as a valid JWT.",
        "An absent bearer token is different from a supplied but invalid token.",
        "A production implementation should explicitly define how malformed Authorization headers are handled."
      ]
    },
    {
      id: "jwt-service-contract",
      title: "6. The JWT Service Used by the Filter",
      paragraphs: [
        "The JWT service is responsible for parsing and validating a token. It should verify the signature using a trusted key and validate the claims required by the application's policy.",
        "The token-generation service from the previous lesson creates tokens, but generation alone is not sufficient for authentication. The receiving filter needs validation operations such as extracting the subject from a verified token and determining whether the token is valid for the expected user.",
        "For JJWT 0.12.x, parsing a signed claims JWT can be done using Jwts.parser(), verifyWith(trustedKey), build(), and parseSignedClaims(token). The parser should be configured with the trusted key and any required issuer or audience validation.",
        "Do not read a subject from an unverified payload and then use it to load a user. The token's signature and required claims must be verified before its subject is trusted.",
        "The following is an illustrative validation service for the HS256 setup used in this course. It assumes that JwtKeyConfiguration provides the same trusted SecretKey used to verify tokens from the expected issuer."
      ],
      code: {
        language: "java",
        code: "package com.codeforge.security;\n\nimport io.jsonwebtoken.Claims;\nimport io.jsonwebtoken.JwtException;\nimport io.jsonwebtoken.Jwts;\nimport javax.crypto.SecretKey;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class JwtValidationService {\n\n    private final SecretKey signingKey;\n\n    public JwtValidationService(SecretKey signingKey) {\n        this.signingKey = signingKey;\n    }\n\n    public Claims parseVerifiedClaims(String token) {\n        return Jwts.parser()\n            .verifyWith(signingKey)\n            .requireIssuer(\"codeforge-api\")\n            .build()\n            .parseSignedClaims(token)\n            .getPayload();\n    }\n\n    public String extractSubject(String token) {\n        Claims claims = parseVerifiedClaims(token);\n        String subject = claims.getSubject();\n\n        if (subject == null || subject.isBlank()) {\n            throw new JwtException(\"Missing subject claim\");\n        }\n\n        return subject;\n    }\n}"
      },
      bullets: [
        "The parser verifies the signature using the trusted key.",
        "The required issuer check rejects tokens from an unexpected issuer.",
        "JJWT validates expiration when parsing a signed claims token.",
        "Add audience validation when the application requires a specific audience.",
        "A real implementation should use the correct key and algorithm policy for the issuer.",
        "Handle JWT parsing and validation exceptions at the authentication boundary.",
        "Never treat decoding alone as proof that a token is valid."
      ]
    },
    {
      id: "filter-implementation",
      title: "7. Implement the JWT Authentication Filter",
      paragraphs: [
        "The following implementation combines bearer-token extraction, JWT validation, user lookup, Authentication creation, and SecurityContext management.",
        "The filter uses JwtValidationService to obtain a subject only after token validation. It then uses UserDetailsService to load the current user and authorities. Loading the user can also let the application apply current account status and credential-state checks through Spring Security's user-details infrastructure.",
        "The filter creates a UsernamePasswordAuthenticationToken with the loaded UserDetails and its authorities. Although the class name includes 'Password', its authenticated form is also commonly used to represent a previously authenticated principal; the filter is not rechecking the password.",
        "The filter sets a new SecurityContext only after validation and user resolution succeed. It then continues the chain. If a supplied bearer token is invalid, it delegates to an AuthenticationEntryPoint and returns without continuing to the controller.",
        "This implementation is intentionally explicit about failure handling. If the token is invalid, it does not simply catch the exception and continue as though the request had no credentials."
      ],
      code: {
        language: "java",
        code: "package com.codeforge.security;\n\nimport io.jsonwebtoken.JwtException;\nimport jakarta.servlet.FilterChain;\nimport jakarta.servlet.ServletException;\nimport jakarta.servlet.http.HttpServletRequest;\nimport jakarta.servlet.http.HttpServletResponse;\nimport java.io.IOException;\nimport org.springframework.security.authentication.BadCredentialsException;\nimport org.springframework.security.authentication.UsernamePasswordAuthenticationToken;\nimport org.springframework.security.core.context.SecurityContext;\nimport org.springframework.security.core.context.SecurityContextHolder;\nimport org.springframework.security.core.userdetails.UserDetails;\nimport org.springframework.security.core.userdetails.UserDetailsService;\nimport org.springframework.security.core.userdetails.UsernameNotFoundException;\nimport org.springframework.security.web.AuthenticationEntryPoint;\nimport org.springframework.web.filter.OncePerRequestFilter;\n\npublic class JwtAuthenticationFilter extends OncePerRequestFilter {\n\n    private final JwtValidationService jwtValidationService;\n    private final UserDetailsService userDetailsService;\n    private final AuthenticationEntryPoint authenticationEntryPoint;\n\n    public JwtAuthenticationFilter(\n            JwtValidationService jwtValidationService,\n            UserDetailsService userDetailsService,\n            AuthenticationEntryPoint authenticationEntryPoint) {\n        this.jwtValidationService = jwtValidationService;\n        this.userDetailsService = userDetailsService;\n        this.authenticationEntryPoint = authenticationEntryPoint;\n    }\n\n    @Override\n    protected void doFilterInternal(\n            HttpServletRequest request,\n            HttpServletResponse response,\n            FilterChain filterChain)\n            throws ServletException, IOException {\n\n        String token = BearerTokenExtractor.extract(request);\n\n        if (token == null) {\n            filterChain.doFilter(request, response);\n            return;\n        }\n\n        try {\n            String subject =\n                jwtValidationService.extractSubject(token);\n\n            if (SecurityContextHolder.getContext()\n                    .getAuthentication() == null) {\n\n                UserDetails userDetails =\n                    userDetailsService.loadUserByUsername(subject);\n\n                if (!userDetails.isEnabled()\n                        || !userDetails.isAccountNonLocked()\n                        || !userDetails.isAccountNonExpired()) {\n                    throw new BadCredentialsException(\n                        \"User account is not available\"\n                    );\n                }\n\n                UsernamePasswordAuthenticationToken authentication =\n                    new UsernamePasswordAuthenticationToken(\n                        userDetails,\n                        null,\n                        userDetails.getAuthorities()\n                    );\n\n                authentication.setDetails(\n                    new org.springframework.security.web.authentication.WebAuthenticationDetailsSource()\n                        .buildDetails(request)\n                );\n\n                SecurityContext context =\n                    SecurityContextHolder.createEmptyContext();\n                context.setAuthentication(authentication);\n                SecurityContextHolder.setContext(context);\n            }\n\n            filterChain.doFilter(request, response);\n\n        } catch (JwtException | IllegalArgumentException\n                | BadCredentialsException\n                | UsernameNotFoundException ex) {\n\n            SecurityContextHolder.clearContext();\n            authenticationEntryPoint.commence(\n                request,\n                response,\n                new BadCredentialsException(\"Invalid bearer token\")\n            );\n        }\n    }\n}"
      },
      bullets: [
        "The filter expects JwtValidationService and UserDetailsService to be configured as Spring beans.",
        "The filter should be created and registered through the security configuration shown in the next section.",
        "The sample checks enabled, locked, and account-expiration status. If the application also requires credentialsNonExpired, include that check as well.",
        "A supplied invalid bearer token causes an authentication failure.",
        "The filter does not create or refresh tokens.",
        "Production systems may prefer Spring Security's built-in OAuth2 Resource Server support instead of a custom JWT filter.",
        "Do not allow exceptions from the filter to be swallowed without an intentional authentication-failure policy."
      ]
    },
    {
      id: "security-context",
      title: "8. Understand SecurityContext and Authentication",
      paragraphs: [
        "Spring Security uses the SecurityContext to hold authentication information for the current execution context. The SecurityContext contains an Authentication object representing the principal, authorities, and authentication status.",
        "The principal is usually the authenticated user or a UserDetails object. Authorities describe permissions granted to that principal, such as ROLE_USER or ROLE_ADMIN.",
        "After the JWT filter validates the token and resolves the user, it creates an authenticated Authentication object and places it into the SecurityContextHolder. Downstream authorization checks can then use the identity and authorities.",
        "Create a new SecurityContext rather than mutating a potentially shared context unnecessarily. Spring Security manages context handling through its configured security infrastructure; in a typical stateless request, the context is not intended to become a permanent login session.",
        "Do not confuse setting the SecurityContext with granting access to every endpoint. Authentication establishes who the request represents; authorization still determines which resources and operations are allowed."
      ],
      code: {
        language: "java",
        code: "import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;\nimport org.springframework.security.core.context.SecurityContext;\nimport org.springframework.security.core.context.SecurityContextHolder;\nimport org.springframework.security.core.userdetails.UserDetails;\n\nUserDetails userDetails = userDetailsService\n    .loadUserByUsername(subject);\n\nUsernamePasswordAuthenticationToken authentication =\n    new UsernamePasswordAuthenticationToken(\n        userDetails,\n        null,\n        userDetails.getAuthorities()\n    );\n\nSecurityContext context =\n    SecurityContextHolder.createEmptyContext();\ncontext.setAuthentication(authentication);\nSecurityContextHolder.setContext(context);"
      },
      bullets: [
        "Authentication represents the authenticated principal and authorities.",
        "SecurityContext holds the current Authentication.",
        "SecurityContextHolder provides access to the current context.",
        "Authorities are used by Spring Security authorization rules.",
        "Never construct an authenticated principal from unverified claims.",
        "In stateless APIs, do not rely on an HTTP session to preserve JWT authentication between requests."
      ]
    },
    {
      id: "security-configuration",
      title: "9. Register the Filter in Spring Security",
      paragraphs: [
        "Creating a filter class is not enough; the filter must be registered in the Spring Security filter chain. A common custom-filter arrangement places the JWT filter before UsernamePasswordAuthenticationFilter.",
        "For a stateless bearer-token API, the configuration commonly uses SessionCreationPolicy.STATELESS. This tells Spring Security not to create or use an HTTP session to persist the security context for subsequent requests.",
        "The example below creates the filter as part of the security configuration. It deliberately does not annotate the filter class with @Component, helping avoid accidental registration as both a servlet-container filter and a Spring Security filter.",
        "The application also needs a configured UserDetailsService and a JWT key bean. The entry point shown here returns HTTP 401 for authentication failures. Authorization failures for authenticated users are handled separately and normally result in HTTP 403.",
        "Disabling CSRF can be appropriate for a stateless API that authenticates using bearer tokens supplied explicitly in the Authorization header and does not rely on automatically attached browser credentials. Do not disable CSRF indiscriminately for applications that authenticate with cookies."
      ],
      code: {
        language: "java",
        code: "package com.codeforge.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.core.userdetails.UserDetailsService;\nimport org.springframework.security.web.AuthenticationEntryPoint;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;\nimport org.springframework.security.web.authentication.HttpStatusEntryPoint;\nimport org.springframework.http.HttpStatus;\n\n@Configuration\npublic class SecurityConfig {\n\n    @Bean\n    AuthenticationEntryPoint authenticationEntryPoint() {\n        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);\n    }\n\n    @Bean\n    JwtAuthenticationFilter jwtAuthenticationFilter(\n            JwtValidationService jwtValidationService,\n            UserDetailsService userDetailsService,\n            AuthenticationEntryPoint authenticationEntryPoint) {\n\n        return new JwtAuthenticationFilter(\n            jwtValidationService,\n            userDetailsService,\n            authenticationEntryPoint\n        );\n    }\n\n    @Bean\n    SecurityFilterChain securityFilterChain(\n            HttpSecurity http,\n            JwtAuthenticationFilter jwtAuthenticationFilter)\n            throws Exception {\n\n        http\n            .csrf(csrf -> csrf.disable())\n            .sessionManagement(session -> session\n                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)\n            )\n            .exceptionHandling(exceptions -> exceptions\n                .authenticationEntryPoint(authenticationEntryPoint())\n            )\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/auth/login\").permitAll()\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .requestMatchers(\"/api/**\").authenticated()\n                .anyRequest().permitAll()\n            )\n            .addFilterBefore(\n                jwtAuthenticationFilter,\n                UsernamePasswordAuthenticationFilter.class\n            );\n\n        return http.build();\n    }\n}"
      },
      bullets: [
        "The filter is inserted before UsernamePasswordAuthenticationFilter.",
        "STATELESS means Spring Security does not use an HTTP session to persist authentication between requests.",
        "The login endpoint is permitted without an existing access token.",
        "The admin path requires the ROLE_ADMIN authority when using hasRole(\"ADMIN\").",
        "The example disables CSRF for an explicit-header bearer-token API; choose CSRF configuration based on the application's actual credential transport.",
        "If you use Spring Security's OAuth2 Resource Server support, you can often avoid implementing this custom filter.",
        "Ensure the filter is not also registered separately as a servlet-container filter."
      ]
    },
    {
      id: "authentication-vs-authorization",
      title: "10. Authentication vs Authorization",
      paragraphs: [
        "Authentication answers the question: who is making this request? In a JWT-based API, successful token validation and principal resolution establish the identity used for the request.",
        "Authorization answers the question: what is this identity allowed to do? After authentication, Spring Security checks the endpoint rules and the user's authorities.",
        "For example, both a normal user and an administrator may present valid tokens. The normal user may access their own profile, while only an administrator may access an administrative endpoint.",
        "A JWT filter should not replace resource-level authorization. Even a valid token with a trusted subject does not prove that the subject owns a particular account, order, document, or other resource. The application must enforce those ownership and permission rules."
      ],
      code: {
        language: "java",
        code: "http.authorizeHttpRequests(auth -> auth\n    .requestMatchers(\"/api/public/**\").permitAll()\n    .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n    .requestMatchers(\"/api/**\").authenticated()\n    .anyRequest().permitAll()\n);"
      },
      bullets: [
        "Authentication establishes the principal.",
        "Authorization determines the allowed operations.",
        "HTTP 401 normally indicates missing or invalid authentication.",
        "HTTP 403 normally indicates insufficient permission for an authenticated principal.",
        "Use ownership checks for user-specific resources.",
        "Do not rely on frontend route protection as the API's security boundary."
      ]
    },
    {
      id: "error-handling",
      title: "11. Handle Invalid and Expired Tokens",
      paragraphs: [
        "A JWT can fail validation because it is malformed, expired, signed with the wrong key, issued by an unexpected issuer, or missing a required claim. The filter must ensure these failures do not create an authenticated request.",
        "A supplied invalid bearer token should be rejected consistently. An AuthenticationEntryPoint can generate the HTTP 401 response for an authentication failure. The example filter invokes the entry point directly because an exception thrown by an early custom filter is not guaranteed to be handled by a later exception-translation filter.",
        "A valid token can still belong to an account that is disabled or locked. If the application loads current user details, it can check account status and reject authentication when the user is not allowed to sign in.",
        "Do not return raw exception messages, signing details, stack traces, or token contents to the client. Use a consistent error response and record only safe diagnostic information internally.",
        "Be careful with broad exception handlers. Catch expected JWT and authentication failures, but do not silently swallow programming errors or infrastructure failures. Decide explicitly how user-directory or database outages should be handled."
      ],
      bullets: [
        "Invalid or expired token: return an authentication failure.",
        "Disabled or locked user: do not establish authentication.",
        "Valid identity without permission: return an authorization failure.",
        "Do not expose raw tokens or internal exception details.",
        "Avoid catching every Exception and treating every failure as an invalid token.",
        "Use consistent response semantics and secret-free logs."
      ],
      code: {
        language: "java",
        code: "catch (JwtException | IllegalArgumentException\n        | BadCredentialsException\n        | UsernameNotFoundException ex) {\n\n    SecurityContextHolder.clearContext();\n\n    authenticationEntryPoint.commence(\n        request,\n        response,\n        new BadCredentialsException(\"Invalid bearer token\")\n    );\n\n    return;\n}"
      },
      bullets: [
        "This is the failure-handling fragment from the filter example.",
        "If adapting the fragment, keep it inside the doFilterInternal method and return immediately after the entry point has handled the failure.",
        "Review exception boundaries for the application's database and user-provider behavior."
      ]
    },
    {
      id: "stateless-authentication",
      title: "12. Why JWT APIs Commonly Use Stateless Authentication",
      paragraphs: [
        "In a traditional session-based system, the server commonly stores session state and the client sends a session identifier with each request. The server uses that identifier to locate the session.",
        "In a stateless JWT API, each request supplies an access token, and the server validates it to establish the principal for that request. The application does not need to store an HTTP session merely to remember the authenticated identity.",
        "Stateless authentication can simplify horizontal scaling because requests do not need to reach the same application instance to find an in-memory login session. However, JWTs do not eliminate all server-side state: refresh-token rotation, logout, revocation, and account-status checks may still require persistence or another shared mechanism.",
        "The SecurityContext is still used while processing an individual request. Statelessness means authentication is not persisted in an HTTP session between requests; it does not mean that the request is processed without authentication state."
      ],
      code: {
        language: "text",
        code: "Request 1 -> Application Instance A\nAuthorization: Bearer <access-token>\n\nRequest 2 -> Application Instance B\nAuthorization: Bearer <access-token>\n\nEach instance validates the token using trusted key material.\nNeither request requires an HTTP session to remember the login."
      },
      bullets: [
        "Stateless APIs commonly use SessionCreationPolicy.STATELESS.",
        "The client sends the access token with each protected request.",
        "The server establishes authentication for the current request.",
        "A load balancer can route requests to different instances.",
        "Revocation and refresh workflows may still need shared state.",
        "Protect signing keys consistently across all verifying instances."
      ]
    },
    {
      id: "common-mistakes",
      title: "13. Common JWT Filter Mistakes",
      paragraphs: [
        "A common mistake is setting the SecurityContext before validating the token. That creates an authentication state based on untrusted data and can allow unauthorized access.",
        "Another mistake is extracting a username from an unverified JWT and immediately loading a user. A token subject should be trusted only after the token's signature and required claims have been validated.",
        "Developers may also forget to register the filter in the Spring Security chain or accidentally register it twice. A filter class existing in the project does not guarantee that it executes in the intended security chain.",
        "A filter that catches all exceptions and continues the chain can make security behavior unpredictable. Expected invalid-token failures should be handled explicitly, and unexpected infrastructure or programming failures should not be disguised as successful authentication.",
        "Finally, a custom filter may be unnecessary. Spring Security's OAuth2 Resource Server support already provides established bearer-token processing and JWT validation integration for many applications."
      ],
      bullets: [
        "Never authenticate before validating the token.",
        "Never trust a subject or role from an unverified token.",
        "Never generate tokens inside the request-validation filter.",
        "Do not accidentally register the same filter in two different filter mechanisms.",
        "Do not silently ignore an explicitly supplied invalid token.",
        "Do not treat authentication as authorization.",
        "Do not disable CSRF without understanding how credentials are sent.",
        "Prefer built-in resource-server support when it satisfies the requirements."
      ]
    },
    {
      id: "testing-filter",
      title: "14. Testing the JWT Authentication Filter",
      paragraphs: [
        "Filter tests should verify both successful authentication and failure behavior. They should check whether the SecurityContext is populated correctly, whether the downstream filter chain continues, and whether invalid credentials produce the intended HTTP response.",
        "A valid-token test should provide a token signed with a test key, a matching user returned by UserDetailsService, and authorities expected by the endpoint. After filter execution, the test can assert that the SecurityContext contains the expected principal.",
        "Negative tests should cover malformed tokens, expired tokens, incorrect signatures, unexpected issuers, missing subjects, and users who are disabled or locked.",
        "Also test a request without an Authorization header. For an optional bearer-token filter, that request should continue through the chain without the filter creating authentication. The endpoint's authorization configuration determines whether it can ultimately succeed.",
        "Use Spring Security test support and servlet mocks where appropriate. Integration tests should additionally verify the actual filter-chain configuration and endpoint access rules."
      ],
      bullets: [
        "Valid token: authentication is established.",
        "No token: the filter continues without creating JWT authentication.",
        "Malformed or expired token: authentication fails.",
        "Wrong signature or issuer: authentication fails.",
        "Disabled or locked account: authentication is not established.",
        "Admin-only endpoint: users without the required authority are denied.",
        "Authentication failure: the controller is not executed.",
        "Unexpected exceptions: the behavior is deliberate and observable without leaking secrets."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertNull;\nimport static org.mockito.Mockito.verify;\nimport static org.mockito.Mockito.verifyNoInteractions;\n\nimport jakarta.servlet.FilterChain;\nimport org.junit.jupiter.api.Test;\nimport org.springframework.mock.web.MockHttpServletRequest;\nimport org.springframework.mock.web.MockHttpServletResponse;\nimport org.springframework.security.core.context.SecurityContextHolder;\n\nclass JwtAuthenticationFilterTest {\n\n    @Test\n    void requestWithoutBearerTokenContinuesUnauthenticated()\n            throws Exception {\n\n        MockHttpServletRequest request =\n            new MockHttpServletRequest();\n        MockHttpServletResponse response =\n            new MockHttpServletResponse();\n        FilterChain chain = org.mockito.Mockito.mock(FilterChain.class);\n\n        SecurityContextHolder.clearContext();\n\n        // Construct the filter with test dependencies, then call doFilter.\n        // The test fixture should verify that the chain was continued and\n        // that no JWT authentication was created.\n\n        verifyNoInteractions(chain);\n        assertNull(SecurityContextHolder.getContext().getAuthentication());\n    }\n}"
      },
      output: "The test fragment illustrates the desired assertions, but it is not a complete runnable test: it does not construct or invoke the filter, and its verification should be replaced with assertions against the actual execution. Use a complete fixture that invokes filter.doFilter(request, response, chain), then verify the chain and SecurityContext behavior."
    },
    {
      id: "built-in-resource-server",
      title: "15. Custom JWT Filter vs OAuth2 Resource Server",
      paragraphs: [
        "A custom JWT filter is useful when an application has a specific authentication protocol or needs custom behavior that is not covered by standard Spring Security components. It also requires the development team to maintain token extraction, validation integration, error handling, and filter-ordering behavior.",
        "Spring Security's OAuth2 Resource Server support already provides bearer-token authentication integration. With a configured JwtDecoder, it can validate JWTs and establish authentication through the framework's standard components.",
        "For a typical API that accepts JWT access tokens from an authorization server, the built-in resource-server approach is often the simpler and safer starting point. It reduces the amount of custom security-sensitive code that the application must maintain.",
        "Choose based on actual requirements. Do not create a custom filter merely because JWT authentication is involved; use one when its additional behavior is justified and can be tested thoroughly."
      ],
      code: {
        language: "java",
        code: "http\n    .authorizeHttpRequests(auth -> auth\n        .requestMatchers(\"/auth/login\").permitAll()\n        .anyRequest().authenticated()\n    )\n    .oauth2ResourceServer(oauth2 -> oauth2\n        .jwt(org.springframework.security.config.Customizer.withDefaults())\n    );"
      },
      bullets: [
        "Custom filter: gives control over token processing and application-specific behavior.",
        "Resource Server: provides built-in bearer-token authentication support.",
        "Both approaches still require trusted key configuration and appropriate authorization rules.",
        "Do not configure competing JWT authentication mechanisms without understanding their interaction.",
        "Prefer the standard framework path unless custom requirements justify additional code."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      paragraphs: [
        "For interviews, explain the request lifecycle clearly: the filter reads the bearer token, validates it, resolves the identity, establishes authentication in the SecurityContext, and lets Spring Security apply authorization rules before the controller handles the request."
      ],
      interviewQuestions: [
        {
          question: "1. What is a JWT authentication filter?",
          answer: "It is a Spring Security filter that reads a bearer token from an HTTP request, validates it, resolves the authenticated principal, and places an Authentication object in the SecurityContext."
        },
        {
          question: "2. Why extend OncePerRequestFilter?",
          answer: "It provides a servlet-filter base class with once-per-request-dispatch behavior under its filtering rules. Developers implement doFilterInternal instead of writing the generic filter plumbing themselves."
        },
        {
          question: "3. Where is the JWT filter placed?",
          answer: "A common custom-filter configuration places it before UsernamePasswordAuthenticationFilter using addFilterBefore. The exact placement depends on the security design and other filters."
        },
        {
          question: "4. Does the JWT filter generate access tokens?",
          answer: "No. It validates tokens supplied with incoming requests. Access-token generation normally occurs after successful authentication in the login flow."
        },
        {
          question: "5. What is the Authorization header format?",
          answer: "A common format is Authorization: Bearer followed by the access token. The filter extracts the token after recognizing the Bearer scheme."
        },
        {
          question: "6. What happens when a request has no token?",
          answer: "The filter can continue without creating authentication. Spring Security's authorization rules determine whether the requested endpoint allows anonymous access or requires authentication."
        },
        {
          question: "7. What happens when a token is invalid?",
          answer: "The request must not be authenticated. The filter or configured security infrastructure should return an authentication failure, commonly HTTP 401, without allowing the request to reach a protected controller as an authenticated user."
        },
        {
          question: "8. What is SecurityContextHolder?",
          answer: "It is the Spring Security mechanism that provides access to the current SecurityContext, which holds the Authentication for the current execution context."
        },
        {
          question: "9. What is an Authentication object?",
          answer: "It represents the principal, credentials or authentication details where applicable, authorities, and authentication status used by Spring Security."
        },
        {
          question: "10. Why use UserDetailsService?",
          answer: "It can load the application user and current authorities from a trusted user store. This allows the filter to resolve a validated token subject and apply account-state checks."
        },
        {
          question: "11. Why must the signature be validated before trusting the subject?",
          answer: "A JWT payload can be decoded without proving authenticity. Validating the signature and required claims helps establish that the token was issued by a trusted source and has not been modified."
        },
        {
          question: "12. What is the difference between HTTP 401 and 403?",
          answer: "HTTP 401 indicates that valid authentication is missing or has failed. HTTP 403 generally indicates that the authenticated principal does not have permission to perform the requested operation."
        },
        {
          question: "13. Why use SessionCreationPolicy.STATELESS?",
          answer: "It configures Spring Security not to create or use an HTTP session to persist authentication between requests. Each request supplies its own bearer token."
        },
        {
          question: "14. What is the difference between authentication and authorization?",
          answer: "Authentication establishes who the principal is. Authorization determines which resources and operations that principal may access."
        },
        {
          question: "15. Why should the filter not catch every exception and continue?",
          answer: "Silently continuing can hide authentication failures and produce unpredictable behavior. Expected token failures should be handled explicitly, while unexpected application or infrastructure failures should not be disguised as successful processing."
        },
        {
          question: "16. Can the JWT filter replace Spring Security?",
          answer: "No. The filter integrates with Spring Security by establishing authentication. Spring Security still manages authorization rules, security context handling, exception handling, and other protections."
        },
        {
          question: "17. Can a JWT filter prevent every unauthorized request by itself?",
          answer: "No. The filter authenticates the principal, but endpoint rules and resource-level checks must enforce authorization. A valid token does not automatically grant access to every resource."
        },
        {
          question: "18. Why should token generation and validation be separate?",
          answer: "Token generation issues credentials after successful authentication. Validation checks credentials supplied with later requests. Separating these responsibilities makes the security flow easier to understand, test, and maintain."
        },
        {
          question: "19. Can two different application instances validate the same JWT?",
          answer: "Yes, if they have the appropriate trusted verification key and compatible validation rules. This is one reason stateless JWT APIs can work well behind a load balancer."
        },
        {
          question: "20. Is a custom JWT filter always necessary?",
          answer: "No. Spring Security's OAuth2 Resource Server support already handles standard bearer-token authentication and JWT validation integration. A custom filter should be used when its additional behavior is genuinely needed."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "17. Short Notes for Revision",
      paragraphs: [
        "A JWT authentication filter reads a bearer token from the Authorization header, validates the token, resolves the authenticated user, creates an Authentication object, and stores it in the SecurityContext.",
        "OncePerRequestFilter provides a convenient servlet-filter base class. A common custom filter is registered before UsernamePasswordAuthenticationFilter, but the exact position depends on the security architecture.",
        "If no token is present, the filter can continue without authentication. If a supplied token is invalid, the request must not be treated as authenticated. Spring Security then applies authorization rules to the established principal."
      ],
      bullets: [
        "OncePerRequestFilter = servlet-filter base class.",
        "Authorization header = common location for a bearer token.",
        "JwtValidationService = validates the token and trusted claims.",
        "UserDetailsService = loads the application user and authorities.",
        "Authentication = represents the authenticated principal.",
        "SecurityContext = holds the current Authentication.",
        "401 = authentication failure.",
        "403 = insufficient permission for an authenticated user.",
        "STATELESS = no HTTP-session persistence of authentication.",
        "JWT filter validates incoming tokens; the login flow generates them."
      ]
    }
  ]
};
