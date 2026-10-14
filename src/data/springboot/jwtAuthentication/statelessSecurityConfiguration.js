
export const statelessSecurityConfiguration = {
  id: 1208,
  title: "Stateless Security Configuration",
  slug: "stateless-security-configuration",
  topicTitle: "JWT Authentication",
  description:
    "Understand how to configure stateless Spring Security, protect endpoints, validate JWT bearer tokens, and apply appropriate CSRF, CORS, and authorization rules.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "security-chain",
      title: "Configure SecurityFilterChain",
      paragraphs: [
        "Modern Spring Security uses a SecurityFilterChain bean to configure web security. Older applications commonly extended WebSecurityConfigurerAdapter, but that approach was deprecated and removed in modern Spring Security versions.",
        "A SecurityFilterChain defines which security filters apply to incoming HTTP requests and how those requests are authenticated, authorized, and handled when security checks fail.",
        "SessionCreationPolicy.STATELESS tells Spring Security not to use an HTTP session to persist the security context between requests. A client generally supplies its credentials on each request, for example through an Authorization: Bearer header containing a JWT.",
        "Stateless does not mean that the application stores no data on the server. User records, databases, signing keys, token revocation records, and other application data can still exist. It specifically describes the application's HTTP session and authentication-state strategy.",
        "The following example illustrates a stateless configuration with public authentication endpoints and an authenticated-by-default policy. It enables HTTP Basic authentication as an example, not JWT authentication. HTTP Basic should not be left enabled accidentally when the application intends to use only bearer tokens."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/actuator/health")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .build();
    }
}`
      },
      bullets: [
        "SecurityFilterChain defines web security behavior.",
        "STATELESS prevents session-based persistence of the security context between requests.",
        "permitAll allows unauthenticated access to matching endpoints but does not disable other security controls.",
        "anyRequest().authenticated() requires authentication for all other matching requests.",
        "A stateless configuration still needs a configured authentication mechanism.",
        "Disable CSRF only when appropriate for the application's credential transport and threat model.",
        "Add a JWT bearer-token mechanism before treating this as a complete JWT configuration."
      ]
    },
    {
      id: "stateless-concept",
      title: "What Is Stateless Authentication?",
      paragraphs: [
        "In traditional session-based authentication, the server commonly creates an HTTP session after login and associates it with a session identifier, often carried in a cookie. The server uses that session to retrieve authentication state on later requests.",
        "In a stateless bearer-token architecture, the client sends an access token with each protected request. The server validates the token and establishes authentication for that request without relying on an HTTP session to remember the previous request.",
        "A signed JWT can carry claims such as a subject and expiration time. Its signature and required claims must be validated before the application trusts those claims. Decoding a JWT is not sufficient to authenticate its holder.",
        "Stateless authentication can make it easier to distribute requests across multiple application instances because each instance can validate a token using trusted verification material. However, immediate revocation, logout, account suspension, and permission changes may require additional design."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | Request with Authorization: Bearer <token>
  v
Spring Security Filter Chain
  |
  v
Validate bearer token
  |
  +---- Invalid or expired ----> Authentication failure
  |
  v
Create authenticated principal
  |
  v
Check endpoint authorization
  |
  +---- Not permitted ----------> 403 Forbidden
  |
  v
Controller -> Service -> Repository`
      },
      bullets: [
        "Session-based: authentication state is commonly stored in an HTTP session.",
        "Stateless bearer-token: credentials are supplied with each protected request.",
        "Stateless does not mean that the server has no database or other persistent state.",
        "Token expiration limits how long a token can be accepted.",
        "A stateless architecture still requires secure token validation and authorization.",
        "Load balancing is easier when requests do not depend on a particular server's in-memory session."
      ]
    },
    {
      id: "authorization",
      title: "Public and Protected Endpoints",
      paragraphs: [
        "Endpoint authorization determines which requests can reach application functionality. Authentication endpoints such as registration and login are often public because users need to access them before obtaining an access token.",
        "Protected endpoints require a valid authentication mechanism. Additional authorization rules can restrict access by role or authority, for example allowing only administrators to access an administration API.",
        "Request matchers should be specific enough to avoid accidentally exposing sensitive endpoints. A broad public matcher can unintentionally allow unauthenticated access to operations that should be protected.",
        "CORS is a browser security mechanism governing cross-origin access to responses. It does not authenticate users or grant application permissions. A request that passes CORS checks must still pass the server's authentication and authorization checks."
      ],
      code: {
        language: "java",
        code: `http.authorizeHttpRequests(auth -> auth
    .requestMatchers(
        "/api/v1/auth/register",
        "/api/v1/auth/login",
        "/actuator/health"
    ).permitAll()
    .requestMatchers("/api/v1/admin/**")
        .hasRole("ADMIN")
    .requestMatchers("/api/v1/reports/**")
        .hasAnyRole("ADMIN", "MANAGER")
    .anyRequest()
        .authenticated()
);`
      },
      bullets: [
        "Keep public endpoints to the minimum necessary.",
        "Place more specific authorization matchers before broad matching rules.",
        "hasRole(\"ADMIN\") typically checks for the ROLE_ADMIN authority.",
        "hasAuthority(\"REPORT_READ\") checks for that exact authority.",
        "Use authentication for identity and authorization for permissions.",
        "Configure CORS for trusted frontend origins and required methods and headers.",
        "Never treat a hidden frontend button or a CORS policy as a substitute for backend authorization."
      ]
    },
    {
      id: "jwt-bearer-token",
      title: "Configure JWT Bearer-Token Authentication",
      paragraphs: [
        "A stateless JWT API needs a bearer-token authentication mechanism. One standard approach is Spring Security OAuth2 Resource Server support, which uses a JwtDecoder to verify JWTs and convert validated claims into an authenticated principal.",
        "For a signed JWT, the decoder must use trusted verification keys and enforce the intended algorithm policy. The application should validate the claims required by its token contract, such as expiration and, where applicable, issuer and audience.",
        "The Resource Server configuration below is an illustrative alternative to a custom JWT filter. It assumes the relevant Spring Security OAuth2 Resource Server and JOSE support is available and that a JwtDecoder bean has been configured appropriately for the token issuer and signing algorithm.",
        "Do not configure a token decoder to trust arbitrary keys or issuer URLs supplied by an untrusted request. Verification material and issuer configuration must come from trusted application configuration."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class JwtSecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        return http
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/actuator/health")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> {}))
                .build();
    }
}`
      },
      bullets: [
        "The OAuth2 Resource Server JWT support validates bearer tokens using a configured JwtDecoder.",
        "A suitable JwtDecoder bean must be available through trusted key or issuer configuration.",
        "This example does not implement token issuance; login must obtain or generate tokens separately.",
        "Validate issuer and audience when required by the application's token contract.",
        "A valid signature alone does not establish that every claim is appropriate for your API.",
        "Use explicit authority mapping when authorization depends on JWT roles or scopes.",
        "Do not add a custom JWT filter and Resource Server authentication for the same token flow without a clear reason."
      ]
    },
    {
      id: "request-flow",
      title: "How a JWT Request Is Processed",
      paragraphs: [
        "The client first authenticates through the login endpoint and receives an access token. For a protected API call, the client sends the token in the Authorization header using the Bearer scheme.",
        "Spring Security processes the request through its filter chain. The bearer-token mechanism extracts the token, and the configured decoder verifies it and checks the required claims. If validation succeeds, Spring Security creates an authenticated principal for the request.",
        "The authorization rules then determine whether the principal may access the requested endpoint. A request can be authenticated but still be denied because the principal lacks the required role or authority.",
        "An invalid or missing token on a protected endpoint normally results in an authentication failure, commonly HTTP 401. An authenticated user without sufficient permission normally receives HTTP 403."
      ],
      code: {
        language: "text",
        code: `GET /api/v1/orders
Authorization: Bearer <access-token>
        |
        v
Bearer-token authentication filter
        |
        v
JwtDecoder validates token
        |
        +---- Invalid token ------> 401 Unauthorized
        |
        v
Authenticated principal
        |
        v
Authorization rules
        |
        +---- Insufficient access -> 403 Forbidden
        |
        v
OrderController
        |
        v
OrderService
        |
        v
OrderRepository`
      },
      bullets: [
        "The client should send the access token on each protected request.",
        "The backend must validate the token rather than merely decode its contents.",
        "Authentication establishes the principal for the current request.",
        "Authorization determines whether the principal can perform the operation.",
        "Controllers should not implement their own incomplete JWT signature checks.",
        "Security filter failures may occur before a controller method is invoked."
      ]
    },
    {
      id: "csrf-cors",
      title: "CSRF and CORS in Stateless APIs",
      paragraphs: [
        "Cross-Site Request Forgery (CSRF) occurs when a browser can be induced to send an authenticated request that the user did not intend. The risk depends partly on whether the browser automatically attaches authentication credentials to requests.",
        "A backend that accepts bearer tokens only through an Authorization header explicitly added by trusted client code has a different CSRF threat model from a backend that authenticates through automatically attached cookies. Disabling CSRF can be reasonable for the former architecture, but the decision must be based on the actual credential transport and application behavior.",
        "HttpOnly cookies can reduce direct JavaScript access to a token, but browsers automatically attach matching cookies. Cookie-based authentication therefore requires appropriate CSRF defenses, such as suitable SameSite settings and a deliberate CSRF-token strategy where needed.",
        "Cross-Origin Resource Sharing (CORS) controls browser access to cross-origin responses. It does not prevent all cross-site requests, replace CSRF defenses, or replace authentication and authorization."
      ],
      code: {
        language: "java",
        code: `// Illustrative CORS configuration for a browser client.
// Adapt the origin, methods, and headers to your application.

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

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
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
        return source;
    }
}`
      },
      bullets: [
        "Use the actual trusted frontend origins instead of permissive production defaults.",
        "Enable Spring Security CORS integration when required by the application.",
        "If cookies are used, configure allowed origins and credentials deliberately.",
        "Credentialed CORS requests cannot use a wildcard origin response.",
        "CORS does not make an endpoint private.",
        "Do not disable CSRF simply because JWTs are involved.",
        "Review the whole authentication flow, including refresh-token and logout endpoints."
      ]
    },
    {
      id: "error-handling",
      title: "Handle Authentication and Authorization Failures",
      paragraphs: [
        "Security failures should be translated into appropriate HTTP responses without exposing internal implementation details. A missing or invalid bearer token on a protected endpoint normally produces HTTP 401 Unauthorized.",
        "HTTP 403 Forbidden normally indicates that the request was authenticated but the principal is not authorized to perform the operation. Applications can customize this behavior according to their API contract.",
        "AuthenticationEntryPoint handles authentication failures in the security layer. AccessDeniedHandler handles access-denied failures. These are particularly important because a security filter can reject a request before a controller or @RestControllerAdvice is reached.",
        "Error responses should avoid revealing signing keys, complete tokens, internal stack traces, or sensitive account information."
      ],
      bullets: [
        "401 Unauthorized: authentication is missing or invalid.",
        "403 Forbidden: the authenticated principal lacks the required permission.",
        "Use AuthenticationEntryPoint for appropriate security-layer authentication failures.",
        "Use AccessDeniedHandler for authorization failures.",
        "Keep public error responses consistent and avoid exposing internal details.",
        "Log security events carefully without logging bearer tokens or secrets."
      ]
    },
    {
      id: "testing",
      title: "Testing Stateless Security",
      paragraphs: [
        "Test the security configuration with public endpoints, protected endpoints, valid tokens, invalid tokens, expired tokens, and insufficient permissions. Configuration that compiles successfully can still expose an endpoint unintentionally or reject legitimate requests.",
        "Verify that protected endpoints reject requests without a token, accept valid tokens, and reject tokens with invalid signatures or required claims. If roles or scopes are used, test the authority mapping as well.",
        "Stateless behavior should also be reviewed at the application level. Confirm that authentication does not depend on a session cookie from a previous request and that the intended authentication mechanism is actually enabled."
      ],
      bullets: [
        "A public registration endpoint can be called without a bearer token.",
        "A public login endpoint can be called without a bearer token.",
        "A protected endpoint rejects a missing token.",
        "A protected endpoint accepts a valid token.",
        "Expired, malformed, and tampered tokens are rejected.",
        "Authorization rules reject principals without required roles or authorities.",
        "CORS behavior matches the configured trusted origins.",
        "CSRF behavior matches the chosen credential transport.",
        "Verify that the application does not rely on an HTTP session to persist authentication between requests."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Configuration Mistakes",
      paragraphs: [
        "Security configuration mistakes often occur when an application enables stateless sessions but forgets to configure an authentication mechanism, exposes too many public routes, or disables protections without considering the application's credential transport."
      ],
      bullets: [
        "Assuming STATELESS automatically enables JWT authentication.",
        "Enabling HTTP Basic accidentally when the API is intended to use only bearer tokens.",
        "Assuming CSRF is always unnecessary for a JWT-based application.",
        "Using broad public matchers that expose sensitive endpoints.",
        "Treating CORS as an authentication or authorization mechanism.",
        "Trusting decoded JWT claims without signature and claim validation.",
        "Failing to configure trusted JWT verification keys or issuer settings.",
        "Assuming controller advice handles all security filter failures.",
        "Forgetting to map roles or scopes to Spring Security authorities.",
        "Assuming stateless authentication automatically supports immediate token revocation."
      ]
    },
    {
      id: "best-practices",
      title: "Stateless Security Best Practices",
      paragraphs: [
        "A production-ready stateless API requires more than SessionCreationPolicy.STATELESS. It needs a deliberate authentication mechanism, safe token validation, explicit authorization, appropriate browser security controls, and tests that verify the intended behavior."
      ],
      bullets: [
        "Use SecurityFilterChain with current Spring Security configuration APIs.",
        "Use STATELESS when authentication should not depend on an HTTP session.",
        "Choose one clearly defined bearer-token authentication approach.",
        "Prefer Spring Security Resource Server support for standard JWT bearer-token validation when it meets the application's requirements.",
        "Validate signatures and required claims using trusted configuration.",
        "Keep signing keys and private keys out of source control and client responses.",
        "Keep public endpoints explicit and protect sensitive endpoints with authorization rules.",
        "Choose CSRF controls based on whether credentials are automatically attached by the browser.",
        "Configure CORS for known trusted origins.",
        "Handle authentication and authorization failures at the security layer.",
        "Test valid tokens, invalid tokens, expiry, roles, and public endpoint access.",
        "Design logout and revocation behavior rather than assuming JWTs can always be revoked immediately."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What does SessionCreationPolicy.STATELESS mean?",
          answer: "It tells Spring Security not to use an HTTP session to persist the security context between requests. The application still needs an authentication mechanism for each protected request."
        },
        {
          question: "What is SecurityFilterChain?",
          answer: "SecurityFilterChain defines the security filters and rules applied to matching HTTP requests, including authentication, authorization, session management, and security failure handling."
        },
        {
          question: "Does STATELESS automatically enable JWT authentication?",
          answer: "No. STATELESS configures session behavior. The application must separately configure a JWT bearer-token authentication mechanism, such as Spring Security OAuth2 Resource Server support or an appropriately implemented custom filter."
        },
        {
          question: "What is the difference between session-based and stateless authentication?",
          answer: "Session-based authentication commonly retrieves authentication state from a server-side HTTP session. Stateless bearer-token authentication validates credentials supplied with each request without depending on an HTTP session to remember the previous request."
        },
        {
          question: "How does Spring Security process a JWT request?",
          answer: "The bearer-token mechanism extracts the token, a configured decoder validates it and required claims, Spring Security establishes an authenticated principal, and authorization rules determine whether the request may access the endpoint."
        },
        {
          question: "Is disabling CSRF always safe for a JWT API?",
          answer: "No. The decision depends on how credentials are transported. Explicitly supplied Authorization headers have a different CSRF threat model from cookies that browsers automatically attach."
        },
        {
          question: "What is the difference between CORS and CSRF?",
          answer: "CORS governs browser access to cross-origin responses. CSRF concerns unwanted authenticated requests initiated through a user's browser. CORS is not a general replacement for CSRF protection."
        },
        {
          question: "What is the difference between HTTP 401 and HTTP 403?",
          answer: "HTTP 401 normally indicates missing or invalid authentication. HTTP 403 normally indicates that an authenticated principal lacks the permission required for the operation."
        },
        {
          question: "What is the purpose of permitAll()?",
          answer: "It allows requests matching a configured rule without requiring an authenticated principal. It does not disable validation, rate limiting, or other application security controls."
        },
        {
          question: "Why might @RestControllerAdvice not handle a JWT authentication failure?",
          answer: "Security filters can reject a request before a controller is invoked. Those failures may need to be handled using an AuthenticationEntryPoint or AccessDeniedHandler."
        },
        {
          question: "Can a stateless JWT application still use a database?",
          answer: "Yes. Stateless refers to the authentication/session strategy, not the absence of persistent storage. The application can still store users, permissions, refresh tokens, or revocation records in a database."
        },
        {
          question: "Can JWT access tokens be revoked immediately?",
          answer: "Not automatically. A self-contained token may remain valid until expiration unless the application uses an additional mechanism, such as a denylist, token-version check, or centralized validation."
        },
        {
          question: "Why might Spring Security OAuth2 Resource Server be preferred over a custom JWT filter?",
          answer: "It provides a standard bearer-token processing and validation mechanism, reducing the need to implement token extraction, decoder integration, and authentication handling manually."
        },
        {
          question: "How do you test stateless security configuration?",
          answer: "Test public and protected routes, missing and valid tokens, expired or tampered tokens, authorization failures, and whether authentication improperly depends on an HTTP session."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Stateless security prevents Spring Security from relying on an HTTP session to persist authentication between requests. JWT bearer-token validation and endpoint authorization must still be configured explicitly."
      ],
      bullets: [
        "SecurityFilterChain: defines web security behavior.",
        "STATELESS: does not use an HTTP session to persist the security context between requests.",
        "Bearer token: credentials supplied with a protected request.",
        "JwtDecoder: validates JWTs using trusted verification configuration.",
        "permitAll(): allows unauthenticated access to matching endpoints.",
        "authenticated(): requires an authenticated principal.",
        "hasRole() and hasAuthority(): enforce authorization requirements.",
        "401: authentication failure; 403: authorization failure in the usual case.",
        "CSRF: evaluate based on how credentials are transported.",
        "CORS: controls browser cross-origin access; it does not replace authentication.",
        "Stateless configuration alone does not provide JWT authentication or immediate token revocation."
      ]
    }
  ]
};
