
export const accessAndRefreshTokens = {
  id: 1203,
  title: "Access Tokens and Refresh Tokens",
  slug: "access-and-refresh-tokens",
  topicTitle: "JWT Authentication",
  description:
    "Understand access and refresh token lifetimes, secure storage, refresh flows, rotation, reuse detection, revocation, and Spring Boot implementation patterns.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "access-token",
      title: "1. Access Tokens",
      paragraphs: [
        "An access token is a credential presented by a client when it requests a protected resource from an API. For example, after a user logs in to a banking application, the client may use an access token to request account details from the banking API.",
        "In a JWT-based authentication system, an access token may be a signed JSON Web Token containing claims such as the subject, issuer, audience, expiration time, and authorities. The API verifies the token before using its claims to authenticate the request.",
        "An access token should normally have a limited lifetime. If an attacker obtains a valid token, the attacker may be able to use it until it expires or is otherwise rejected. Short lifetimes reduce this exposure, although they do not replace secure token storage and transport.",
        "Authentication and authorization are different. Authentication establishes which identity the token represents. Authorization determines whether that identity can perform a particular action. A valid token for a normal user should not automatically grant access to administrator operations.",
        "A signed JWT is generally readable by anyone who possesses it unless its contents are separately encrypted. A signature protects integrity and helps verify the issuer; it does not hide the claims. Never place passwords, private keys, or other secrets in ordinary JWT claims."
      ],
      bullets: [
        "Purpose: authorize requests to protected APIs.",
        "Typical format: a signed JWT, although access tokens can also be opaque.",
        "Common claims: sub, iss, aud, exp, iat, jti, and possibly scope or roles.",
        "Use HTTPS for all token-bearing requests.",
        "Do not put access tokens in URLs, browser logs, application logs, or analytics events.",
        "Use the minimum authorities and scopes required for the client.",
        "Choose a short lifetime appropriate to the application's risk and usability requirements."
      ],
      code: {
        language: "http",
        code: "GET /api/accounts/me HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer <access-token>"
      }
    },
    {
      id: "access-token-validation",
      title: "2. How an API Validates an Access Token",
      paragraphs: [
        "When a request reaches a protected Spring Boot endpoint, Spring Security's authentication infrastructure extracts the bearer token and passes it to the configured authentication mechanism. For JWT resource-server authentication, the configured decoder verifies the token and validates the required claims.",
        "A secure JWT validation process checks the signature using a trusted key and an explicitly permitted signing algorithm. It also validates the expiration time and, when configured or required by the system, the issuer, audience, and not-before time.",
        "After validation, the application converts the token's relevant claims into an authenticated principal and authorities. Authorization rules then decide whether the principal can access the requested endpoint or resource.",
        "A token's signature alone does not establish that it is appropriate for every API. A valid token issued for one service should not automatically be accepted by another service. Audience and issuer validation help prevent tokens from being used in the wrong context.",
        "JWT validation does not necessarily contact a database for every request. This can improve performance, but a self-contained access token may remain usable until expiration unless the system adds a revocation mechanism, introspection, or another explicit check."
      ],
      bullets: [
        "Validate the signature and permitted signing algorithm.",
        "Reject expired tokens.",
        "Validate issuer and audience according to the security design.",
        "Validate not-before and other required claims.",
        "Map only trusted claims to authorities.",
        "Apply endpoint-level and resource-level authorization.",
        "Never accept a token merely because it can be decoded."
      ],
      code: {
        language: "java",
        code: "import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.config.Customizer;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.web.SecurityFilterChain;\n\n@Configuration\npublic class SecurityConfig {\n\n    @Bean\n    SecurityFilterChain securityFilterChain(HttpSecurity http)\n            throws Exception {\n\n        http\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/public/**\").permitAll()\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()\n            )\n            .oauth2ResourceServer(oauth2 -> oauth2\n                .jwt(Customizer.withDefaults())\n            );\n\n        return http.build();\n    }\n}"
      },
      output: "Public endpoints are accessible without authentication. Other endpoints require a valid authenticated principal, and /api/admin/** additionally requires the ADMIN authority mapping.",
      bullets: [
        "This example configures Spring Security as a JWT resource server.",
        "A JwtDecoder and its trusted key configuration must also be supplied, for example through the application's resource-server JWT configuration.",
        "hasRole(\"ADMIN\") normally checks for the ROLE_ADMIN authority. Configure claim-to-authority conversion to match the token format.",
        "Use a maintained security framework instead of implementing JWT signature verification manually."
      ]
    },
    {
      id: "refresh-token",
      title: "3. Refresh Tokens",
      paragraphs: [
        "A refresh token allows a client to request a new access token without asking the user to enter their credentials again. It is useful when access tokens expire frequently but users should remain signed in for a longer session.",
        "Refresh tokens are highly sensitive credentials. Anyone who steals an active refresh token may be able to obtain new access tokens. A refresh token can therefore provide an attacker with longer-lasting access than a single short-lived access token.",
        "Refresh tokens may be opaque random values rather than JWTs. An opaque token has no meaningful claims for the client to inspect; the authorization server looks up its associated session and status. This makes server-side rotation and revocation straightforward to manage.",
        "A robust implementation records refresh-token state or an equivalent session record on the server. It tracks expiration, revocation, the associated user or client, and, when rotation is used, the token's family or replacement relationship.",
        "Refresh tokens must be accepted only by the intended refresh or token endpoint. They should not be used as ordinary bearer credentials for business APIs."
      ],
      bullets: [
        "Purpose: obtain a new access token after the existing one expires.",
        "Usually longer-lived than access tokens, but still subject to expiration.",
        "Protect more carefully because they can extend an authenticated session.",
        "Prefer high-entropy, unpredictable token values for opaque refresh tokens.",
        "Store only a cryptographic hash of an opaque refresh token on the server when practical, so a database leak does not directly reveal usable token values.",
        "Support logout, administrative revocation, and revocation after suspected compromise.",
        "Do not log, expose, or casually copy refresh tokens."
      ],
      code: {
        language: "text",
        code: "User signs in\n    |\n    v\nAuthentication server issues:\n    |-- Short-lived access token\n    |-- Longer-lived refresh token\n    |\n    v\nClient calls protected APIs with access token\n    |\n    v\nAccess token expires\n    |\n    v\nClient submits refresh token to refresh endpoint\n    |\n    v\nServer validates session and refresh-token status\n    |\n    v\nServer issues a new access token\n(and usually rotates the refresh token when rotation is enabled)"
      }
    },
    {
      id: "access-vs-refresh",
      title: "4. Access Token vs Refresh Token",
      paragraphs: [
        "Although both tokens relate to authentication, they have different purposes and should have different validation rules. An access token is intended for API access. A refresh token is intended to obtain a replacement access token from the authorization server.",
        "A longer refresh-token lifetime improves convenience but increases the consequences of theft. The system must balance usability with session expiration, inactivity limits, device management, and revocation requirements."
      ],
      bullets: [
        "Access token: presented to protected resource APIs.",
        "Refresh token: presented to the dedicated token-refresh endpoint.",
        "Access token: usually short-lived.",
        "Refresh token: may last longer, subject to absolute and inactivity expiration policies.",
        "Access token: can often be validated locally when it is a signed JWT.",
        "Refresh token: commonly requires checking server-side session or token state.",
        "Both tokens are credentials and must be protected."
      ],
      code: {
        language: "text",
        code: "ACCESS TOKEN\nClient -> Resource API\nResource API -> Validate access token\nResource API -> Authorize operation\n\nREFRESH TOKEN\nClient -> Authorization / refresh endpoint\nRefresh endpoint -> Validate refresh token and session\nRefresh endpoint -> Issue replacement access token\nRefresh endpoint -> Rotate refresh token when configured"
      }
    },
    {
      id: "refresh-flow",
      title: "5. Typical Refresh Flow",
      paragraphs: [
        "Step 1: The user signs in with valid credentials. The authentication server issues an access token and, if the chosen authentication flow supports it, a refresh token.",
        "Step 2: The client sends the access token with requests to protected APIs. The API validates the token and applies authorization rules.",
        "Step 3: When an API rejects the access token because it has expired, the client may send its refresh token to a dedicated refresh endpoint. The client should not repeatedly refresh for unrelated errors such as an authorization failure or a network outage.",
        "Step 4: The server validates the refresh token, its intended use, expiration, revocation status, and associated session. With rotation enabled, it atomically marks the old token as used and creates a replacement refresh token.",
        "Step 5: The server returns a new access token and, when rotation is enabled, the replacement refresh token. The client replaces its previous credentials and continues making requests.",
        "Step 6: If refresh validation fails, the server rejects the request. Depending on the failure, the client may need to clear its session and ask the user to sign in again.",
        "The refresh endpoint must not issue unlimited access tokens merely because a token has a valid signature. The server must also check whether the refresh credential is valid for this operation and whether its session remains active."
      ],
      bullets: [
        "Use a dedicated endpoint, such as POST /auth/refresh.",
        "Send refresh credentials in the request body or a carefully configured secure cookie, not in a URL.",
        "Check token status and session policy on the server.",
        "Rotate refresh tokens when required by the security design.",
        "Return an appropriate client error for invalid, expired, or revoked refresh credentials without revealing sensitive internals.",
        "Handle network failures separately from authentication failures.",
        "Avoid infinite retry loops when refreshing fails.",
        "Design for simultaneous requests so the client does not accidentally reuse a rotated token."
      ],
      code: {
        language: "http",
        code: "POST /auth/refresh HTTP/1.1\nHost: auth.example.com\nContent-Type: application/json\n\n{\n  \"refreshToken\": \"<refresh-token>\"\n}"
      },
      output: "On success, the server returns a new access token and, if refresh-token rotation is enabled, a new refresh token. The exact response format depends on the API contract."
    },
    {
      id: "refresh-token-rotation",
      title: "6. Refresh Token Rotation",
      paragraphs: [
        "Refresh-token rotation means that a refresh token is replaced when it is successfully used. The server marks the old token as consumed and issues a new refresh token. A previously consumed token must not simply remain valid as though it were unused.",
        "Rotation limits the value of a stolen refresh token after it has been used legitimately. If an attacker later tries to use the old token, the server may detect reuse and treat it as a possible compromise.",
        "A refresh-token family represents a chain of rotated tokens associated with a session or grant. When reuse of an already consumed token is detected, the authorization server can revoke the active token family or session and require the user to authenticate again.",
        "Rotation must be implemented atomically. If the server checks the old token, issues a replacement, and marks the old token as used in separate non-atomic operations, concurrent requests may both succeed. A transaction, row lock, conditional update, or equivalent concurrency control can help enforce one-time use.",
        "Strict rotation introduces a client-side concurrency challenge. Two requests may try to refresh at the same time with the same token. The client should coordinate refresh operations so only one refresh request is in flight per session where possible. The server should still enforce one-time use independently.",
        "A reuse event may occur because of theft, but it can also occur due to network retries, multiple browser tabs, or delayed responses. The server should define its policy deliberately rather than silently accepting old tokens indefinitely."
      ],
      bullets: [
        "Issue a replacement refresh token after successful use.",
        "Mark the old token as consumed or invalid.",
        "Use atomic state changes to prevent concurrent double use.",
        "Track token families or session identifiers when reuse detection is required.",
        "Consider revoking the active family after confirmed reuse.",
        "Coordinate client refresh requests and token replacement.",
        "Do not log raw tokens when investigating reuse events."
      ],
      code: {
        language: "text",
        code: "Initial session:\nR1 = active\n\nFirst successful refresh:\nR1 = consumed\nR2 = active\n\nSecond attempt using R1:\nR1 = already consumed\n        |\n        v\nDetect possible reuse\n        |\n        v\nApply policy: reject and revoke the active token family/session\n        |\n        v\nRequire a fresh authentication when appropriate"
      }
    },
    {
      id: "refresh-token-server-model",
      title: "7. Server-Side Refresh Token Model",
      paragraphs: [
        "A server-side refresh-token record lets the application decide whether a token is active, expired, revoked, or already consumed. The exact schema depends on whether the system uses opaque tokens, JWT refresh tokens with server-side state, or an external identity provider.",
        "For an opaque refresh token, the client receives a cryptographically random value. The server hashes the value and stores the hash alongside metadata such as the user, session, expiration time, revocation status, and token-family identifier.",
        "The server hashes an incoming token using the same deterministic cryptographic hash procedure and compares the result with the stored hash. For high-entropy random tokens, a cryptographic hash such as SHA-256 is commonly suitable for this lookup; passwords need a different, deliberately slow password-hashing scheme.",
        "A refresh-token record should not be confused with a complete session-management system. Real applications may also need device information, last-used timestamps, absolute expiration, inactivity expiration, and audit events that do not contain secrets.",
        "The following entity is a simplified example for a Spring Boot application. It illustrates metadata only; production implementations also need token generation, secure hash handling, transactional rotation, expiry checks, and database constraints."
      ],
      bullets: [
        "Store the token hash rather than the raw opaque token when feasible.",
        "Associate tokens with a user and session or token family.",
        "Track expiration and revocation.",
        "Track whether a rotated token has already been consumed.",
        "Use database constraints and concurrency controls to protect state transitions.",
        "Avoid treating a client-supplied user ID as proof of ownership.",
        "Use UTC-based time handling consistently and define session expiration policies explicitly."
      ],
      code: {
        language: "java",
        code: "import jakarta.persistence.Column;\nimport jakarta.persistence.Entity;\nimport jakarta.persistence.GeneratedValue;\nimport jakarta.persistence.GenerationType;\nimport jakarta.persistence.Id;\nimport jakarta.persistence.Table;\nimport java.time.Instant;\n\n@Entity\n@Table(name = \"refresh_tokens\")\npublic class RefreshToken {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, unique = true, length = 64)\n    private String tokenHash;\n\n    @Column(nullable = false)\n    private Long userId;\n\n    @Column(nullable = false, length = 64)\n    private String familyId;\n\n    @Column(nullable = false)\n    private Instant expiresAt;\n\n    @Column(nullable = false)\n    private boolean revoked;\n\n    @Column(nullable = false)\n    private boolean consumed;\n\n    protected RefreshToken() {\n    }\n\n    // Add constructors, accessors, and controlled state-transition methods.\n}"
      },
      output: "The entity represents refresh-token state. It does not by itself implement secure token issuance, rotation, or revocation.",
      bullets: [
        "In a production model, consider foreign-key relationships to user and session entities.",
        "Define database migrations for indexes and constraints rather than relying only on entity annotations.",
        "Use a sufficiently unique, unpredictable family identifier.",
        "A real implementation should update consumed and revoked state through controlled transactional operations."
      ]
    },
    {
      id: "refresh-endpoint-example",
      title: "8. Designing a Spring Boot Refresh Endpoint",
      paragraphs: [
        "A refresh endpoint should be separate from ordinary business APIs. Its job is to validate the refresh credential and issue replacement credentials, not to accept an expired access token as a substitute for a refresh token.",
        "The controller should validate the request format and delegate token verification and rotation to a service. The service should check the stored token state, expiration, session policy, and revocation status before issuing a replacement.",
        "The example below illustrates a thin controller and a service contract. It deliberately leaves the implementation of token generation and persistence to the service, because those operations must be implemented together with appropriate cryptography and transactional concurrency control.",
        "For an opaque refresh token, the service should generate a high-entropy random token, store its hash, invalidate the old token, and issue the new credentials as one logically consistent operation. If a failure occurs during rotation, the transaction should not leave the session in a partially updated state.",
        "The example uses a JSON request for clarity. For a browser application, an HttpOnly, Secure cookie may be preferable for refresh credentials, but cookie-based refresh endpoints require a deliberate CSRF defense and suitable SameSite policy."
      ],
      bullets: [
        "Keep controllers thin and put token lifecycle rules in a service.",
        "Use request validation and a documented response contract.",
        "Reject missing, malformed, expired, revoked, or consumed refresh tokens.",
        "Perform rotation in a transaction with concurrency protection.",
        "Do not return internal exception messages or database details to the client.",
        "Keep refresh tokens out of API access-token validation rules."
      ],
      code: {
        language: "java",
        code: "import jakarta.validation.constraints.NotBlank;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.RequestBody;\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\nimport jakarta.validation.Valid;\n\n@RestController\n@RequestMapping(\"/auth\")\npublic class AuthController {\n\n    private final TokenService tokenService;\n\n    public AuthController(TokenService tokenService) {\n        this.tokenService = tokenService;\n    }\n\n    @PostMapping(\"/refresh\")\n    public ResponseEntity<TokenResponse> refresh(\n            @Valid @RequestBody RefreshRequest request) {\n\n        TokenResponse response = tokenService.refresh(\n            request.refreshToken()\n        );\n\n        return ResponseEntity.ok(response);\n    }\n\n    public record RefreshRequest(\n        @NotBlank String refreshToken\n    ) {}\n\n    public record TokenResponse(\n        String accessToken,\n        String refreshToken,\n        String tokenType,\n        long expiresIn\n    ) {}\n}"
      }
    },
    {
      id: "refresh-service-contract",
      title: "9. Refresh Service Responsibilities",
      paragraphs: [
        "The service is responsible for enforcing refresh-token lifecycle rules. It must not assume that a token is valid merely because the client supplied a non-empty string.",
        "For a stateful opaque refresh token, a typical service flow hashes the submitted value, finds the corresponding record, verifies that it is active and unexpired, checks the associated session, and performs rotation. It then issues a new access token and replacement refresh token.",
        "The operation should be transactional where the persistence design supports it. The service must ensure that two requests cannot both consume the same refresh token successfully. Depending on the database and repository design, this can use pessimistic locking or a conditional update that succeeds only when the token remains active and unused.",
        "The code below shows the high-level shape rather than a complete implementation. Repository methods, token generation, claim construction, hashing, and exception mapping must be implemented according to the application's actual security design."
      ],
      bullets: [
        "Validate the token hash and stored token state.",
        "Check absolute expiration and any inactivity policy.",
        "Verify the user and session have not been disabled or revoked.",
        "Atomically consume the old refresh token.",
        "Generate a replacement refresh token and store only its hash when using opaque tokens.",
        "Generate a new access token with the correct subject, issuer, audience, expiry, and authorities.",
        "Record security-relevant events without recording token values."
      ],
      code: {
        language: "java",
        code: "import org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class TokenService {\n\n    private final RefreshTokenRepository refreshTokenRepository;\n    private final TokenIssuer tokenIssuer;\n\n    public TokenService(\n            RefreshTokenRepository refreshTokenRepository,\n            TokenIssuer tokenIssuer) {\n        this.refreshTokenRepository = refreshTokenRepository;\n        this.tokenIssuer = tokenIssuer;\n    }\n\n    @Transactional\n    public AuthController.TokenResponse refresh(String presentedToken) {\n        String tokenHash = tokenIssuer.hashRefreshToken(presentedToken);\n\n        RefreshToken stored = refreshTokenRepository\n            .findByTokenHashForUpdate(tokenHash)\n            .orElseThrow(InvalidRefreshTokenException::new);\n\n        if (stored.isRevoked()\n                || stored.isConsumed()\n                || !stored.getExpiresAt().isAfter(tokenIssuer.now())) {\n            throw new InvalidRefreshTokenException();\n        }\n\n        // Also verify that the user and associated session remain active.\n        // The repository operation and transaction must prevent double use.\n        stored.setConsumed(true);\n\n        String replacement = tokenIssuer.createRefreshToken();\n        refreshTokenRepository.save(\n            tokenIssuer.createRefreshTokenRecord(stored, replacement)\n        );\n\n        String accessToken = tokenIssuer.createAccessToken(stored.getUserId());\n\n        return new AuthController.TokenResponse(\n            accessToken,\n            replacement,\n            \"Bearer\",\n            tokenIssuer.accessTokenLifetimeSeconds()\n        );\n    }\n}"
      },
      output: "This is a service outline, not a drop-in implementation. Repository locking, token generation and hashing, user/session checks, entity accessors, and exception classes must exist. The locking query must be supported by the selected database and executed within the transaction.",
      bullets: [
        "A possible repository method is findByTokenHashForUpdate, implemented with an appropriate JPA locking query.",
        "Ensure a consumed token is rejected on every subsequent use.",
        "Define a reuse-detection policy for previously consumed tokens; simply returning an invalid-token error may be insufficient for a system that requires token-family revocation.",
        "Ensure rollback behavior and database constraints are consistent with the token rotation design.",
        "Do not copy this outline into production without implementing and testing its security-sensitive dependencies."
      ]
    },
    {
      id: "refresh-token-revocation",
      title: "10. Refresh Token Revocation and Logout",
      paragraphs: [
        "Revocation means that a token or session is no longer allowed to be used. Common reasons include user logout, password changes, administrator action, account suspension, a lost device, or evidence that a token has been stolen.",
        "For stateful refresh tokens, revocation can be implemented by marking the token, token family, or session as revoked. The refresh endpoint checks this state before issuing new credentials.",
        "Revoking a refresh token does not necessarily invalidate an already issued self-contained JWT access token. If an API validates access tokens locally, the JWT may remain usable until its expiration unless the application uses an additional revocation check, token introspection, a denylist, or another enforcement mechanism.",
        "A practical design may combine short-lived access tokens with refresh-session revocation. This limits the remaining exposure of a stolen access token while preventing the revoked session from obtaining further tokens.",
        "Logout should clear the client's stored credentials and revoke the relevant server-side refresh session where applicable. Clearing a browser cookie alone does not revoke a copied token that remains valid on the server."
      ],
      bullets: [
        "Revoke refresh tokens or sessions on logout when the design supports server-side state.",
        "Support administrative and security-triggered revocation.",
        "Consider revoking a token family after detected reuse.",
        "Do not assume that refresh-token revocation instantly invalidates all issued JWT access tokens.",
        "Use short access-token lifetimes and add stronger revocation mechanisms when risk requires them.",
        "Clear client credentials after logout or an unrecoverable refresh failure."
      ],
      code: {
        language: "text",
        code: "Logout request\n    |\n    v\nAuthenticate or identify the session according to the logout design\n    |\n    v\nRevoke the server-side refresh session / token family\n    |\n    v\nClear client-side credentials\n    |\n    v\nReject future refresh attempts for that session\n\nNote: An already issued self-contained access JWT may remain valid\nuntil expiration unless additional revocation checks are enforced."
      }
    },
    {
      id: "secure-token-storage",
      title: "11. Secure Token Storage",
      paragraphs: [
        "Correct token storage depends on the type of client. A browser application faces risks such as cross-site scripting and cross-site request forgery, while a native mobile application can use operating-system-backed secure storage.",
        "For browser-based applications, storing long-lived refresh tokens in localStorage makes them accessible to JavaScript running in the origin. If an attacker can execute malicious JavaScript through an XSS vulnerability, those tokens may be stolen. An HttpOnly cookie prevents JavaScript from directly reading the cookie, although XSS can still perform actions as the user while the vulnerable page is running.",
        "Cookies used for refresh tokens should normally be configured with Secure and HttpOnly attributes and a deliberate SameSite policy. Because browsers attach cookies automatically, cookie-based refresh endpoints must also account for CSRF. Appropriate defenses may include SameSite restrictions, origin checks, and CSRF tokens depending on the architecture.",
        "Native applications should use appropriate platform secure storage rather than ordinary preferences or plain-text files. Server-side clients should use a secrets manager or other protected credential storage suitable for their environment.",
        "No storage approach eliminates every risk. The application should also prevent XSS, use HTTPS, limit token scope and lifetime, restrict CORS to trusted origins, and ensure tokens are not exposed through logs or error reports."
      ],
      bullets: [
        "Browser: consider a Secure, HttpOnly cookie for refresh credentials.",
        "Cookie-based authentication: design explicit CSRF protections.",
        "Mobile: use platform-backed secure storage.",
        "Backend service: use a secrets manager or protected configuration.",
        "Avoid putting tokens in query strings or URL fragments for API calls.",
        "Do not store refresh tokens in logs, source code, screenshots, or analytics.",
        "Restrict CORS to known origins; CORS is not a replacement for authentication or authorization.",
        "Prevent XSS and validate inputs instead of relying on storage controls alone."
      ]
    },
    {
      id: "token-expiration-policy",
      title: "12. Token Expiration and Session Policy",
      paragraphs: [
        "Access-token lifetime, refresh-token lifetime, and user-session lifetime are related but distinct concepts. A token can expire while the broader session remains active, allowing a refresh operation. Conversely, an application can revoke a session before a refresh token reaches its expiration time.",
        "An absolute session lifetime places a maximum limit on how long a session can continue. An inactivity lifetime expires a session after it has not been used for a specified period. Refreshing a token should not automatically extend every expiration indefinitely unless that behavior is an intentional part of the session policy.",
        "Token lifetimes should be selected according to the sensitivity of the application, the consequences of token theft, the expected user experience, and the available revocation mechanisms. A high-risk application may require stricter session limits or reauthentication for sensitive operations.",
        "Client and server clocks may differ. Token validation should use established library behavior and consistent time handling, with only a small, deliberate clock-skew allowance where appropriate.",
        "The access-token lifetime returned to the client should match the configured policy. The client should use the response metadata to determine when to refresh rather than assuming a fixed duration that may differ across environments."
      ],
      bullets: [
        "Access-token expiry controls how long an access credential is normally accepted.",
        "Refresh-token expiry controls how long a refresh credential may be used.",
        "Absolute session expiry sets a maximum session duration.",
        "Inactivity expiry ends sessions that have been idle too long.",
        "Sensitive actions may require fresh authentication even when the session is active.",
        "Avoid unlimited sliding sessions without a clearly defined security policy.",
        "Test expiration boundaries and clock-skew behavior."
      ]
    },
    {
      id: "common-refresh-token-mistakes",
      title: "13. Common Mistakes and Best Practices",
      paragraphs: [
        "A common mistake is accepting a refresh token at ordinary API endpoints. Refresh tokens should be accepted only by the intended authorization endpoint and should have validation rules appropriate to their purpose.",
        "Another mistake is issuing a new access token without checking whether the refresh session has been revoked or the token has already been consumed. Signature validation alone cannot enforce server-side rotation or revocation policy.",
        "Some applications rotate tokens but do not protect the operation against simultaneous refresh requests. This can cause duplicate issuance, unexpected logouts, or inconsistent client state. The client and server both need a concurrency strategy.",
        "A further mistake is returning detailed validation errors that reveal whether a particular token, account, or session exists. Keep client-facing responses appropriately generic while recording useful, secret-free security events internally.",
        "Finally, developers sometimes assume that logging out or deleting a JWT immediately invalidates it. A self-contained access token continues to pass local validation until its expiration unless the resource server performs an additional revocation check."
      ],
      bullets: [
        "Never use access-token validity as the only test for refresh-token validity.",
        "Do not accept refresh tokens as ordinary API access tokens.",
        "Do not store raw refresh tokens in a database when a secure hash-based design is practical.",
        "Do not reuse refresh tokens after rotation.",
        "Do not allow concurrent refresh operations to consume the same token successfully.",
        "Do not expose tokens in URLs, logs, exception messages, or telemetry.",
        "Do not assume refresh-token revocation immediately invalidates every access JWT.",
        "Do not hard-code signing keys or token secrets in source code.",
        "Test logout, expiry, revocation, rotation, reuse, and simultaneous refresh behavior."
      ]
    },
    {
      id: "refresh-token-testing",
      title: "14. Testing the Refresh Flow",
      paragraphs: [
        "Token lifecycle testing should cover successful refresh as well as every state in which refresh must fail. Unit tests can verify service decisions, while integration tests can validate persistence, transaction behavior, endpoint responses, and security configuration.",
        "A successful refresh test should verify that a new access token is issued and, when rotation is enabled, a replacement refresh token is returned. It should also verify that the previous refresh token is no longer accepted.",
        "Negative tests should cover expired, revoked, unknown, malformed, and already-consumed refresh tokens. They should also check that disabled users or revoked sessions cannot obtain new access tokens.",
        "Concurrency tests are important for rotation. Two simultaneous requests using the same refresh token should not both succeed in consuming it. Verify the behavior using the real database engine or a representative integration-test setup, since in-memory databases may not reproduce every production locking behavior.",
        "Tests should assert that failure responses do not contain raw tokens, stack traces, signing keys, or database details."
      ],
      bullets: [
        "Valid active token: refresh succeeds.",
        "Expired token: refresh fails.",
        "Revoked token: refresh fails.",
        "Previously consumed token: refresh fails and the reuse policy is applied.",
        "Unknown or malformed token: refresh fails safely.",
        "Inactive user or revoked session: refresh fails.",
        "Successful rotation: old token is rejected and replacement token works.",
        "Concurrent refresh attempts: only one consumes the token successfully.",
        "Logout: the revoked session cannot refresh again.",
        "Failure response: no secrets or internal diagnostics are exposed."
      ],
      code: {
        language: "java",
        code: "import static org.junit.jupiter.api.Assertions.assertNotNull;\nimport static org.junit.jupiter.api.Assertions.assertThrows;\nimport org.junit.jupiter.api.Test;\n\nclass TokenServiceTest {\n\n    private final TokenService tokenService = createTestService();\n\n    @Test\n    void refreshRejectsAnInvalidToken() {\n        assertThrows(\n            InvalidRefreshTokenException.class,\n            () -> tokenService.refresh(\"invalid-token\")\n        );\n    }\n\n    @Test\n    void refreshIssuesReplacementCredentialsForAnActiveToken() {\n        // Arrange a persisted, active refresh token using test fixtures.\n        String activeRefreshToken = createActiveRefreshTokenFixture();\n\n        AuthController.TokenResponse response =\n            tokenService.refresh(activeRefreshToken);\n\n        assertNotNull(response.accessToken());\n        assertNotNull(response.refreshToken());\n    }\n\n    // createTestService() and createActiveRefreshTokenFixture() represent\n    // test setup helpers that must be implemented for the chosen test stack.\n}"
      },
      output: "These snippets illustrate the assertions to make; the fixture and dependency setup are intentionally left for the application's test configuration."
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      paragraphs: [
        "Prepare to explain not only the definitions of access and refresh tokens but also the security decisions behind token expiration, refresh rotation, revocation, and storage. Interviewers may ask you to describe the complete request flow in a Spring Boot application."
      ],
      interviewQuestions: [
        {
          question: "1. What is an access token?",
          answer: "An access token is a credential that a client presents to a protected API to access resources. It may be a signed JWT or an opaque token. The API validates the credential and applies authorization rules."
        },
        {
          question: "2. What is a refresh token?",
          answer: "A refresh token is a credential used to request a new access token without requiring the user to enter credentials again. It is normally accepted by a dedicated token endpoint and needs strong protection and lifecycle controls."
        },
        {
          question: "3. Why use refresh tokens if access tokens already exist?",
          answer: "Short-lived access tokens reduce the time a stolen access token can normally be used. Refresh tokens allow a user to maintain a session without frequently signing in again, provided the refresh session remains valid."
        },
        {
          question: "4. Which token usually has the longer lifetime?",
          answer: "A refresh token usually has a longer lifetime than an access token. Because it can be exchanged for new access tokens, it requires stronger storage, expiration, rotation, and revocation controls."
        },
        {
          question: "5. What happens when an access token expires?",
          answer: "The API should reject the expired access token. If the client has a valid refresh token and the session is still active, it can call the refresh endpoint to obtain a new access token. If refresh fails, the client may need to ask the user to sign in again."
        },
        {
          question: "6. What is refresh-token rotation?",
          answer: "Rotation replaces a refresh token after successful use. The old token is marked as consumed and a new one is issued. This helps detect reuse of a stolen or previously consumed token."
        },
        {
          question: "7. What is refresh-token reuse detection?",
          answer: "Reuse detection identifies an attempt to use a refresh token that has already been consumed or invalidated by rotation. Depending on the policy, the server may revoke the associated token family or session and require reauthentication."
        },
        {
          question: "8. What is a refresh-token family?",
          answer: "A refresh-token family is a group of tokens linked to the same session or grant across rotation. Tracking the family allows the server to revoke the active session chain when it detects suspicious reuse."
        },
        {
          question: "9. Why should refresh tokens be stored on the server?",
          answer: "Server-side state lets the application track expiration, consumption, revocation, and session ownership. This supports logout and reuse detection. The design must protect stored token data, for example by storing hashes of high-entropy opaque tokens."
        },
        {
          question: "10. Should refresh tokens be JWTs?",
          answer: "Not necessarily. An opaque random refresh token is often convenient because the server can track its state directly. JWT refresh tokens are also possible, but revocation and one-time rotation still require an appropriate state-management strategy if those features are needed."
        },
        {
          question: "11. Does revoking a refresh token immediately invalidate an access JWT?",
          answer: "Not necessarily. A resource server that validates a self-contained JWT locally may continue accepting it until expiration. Immediate access-token revocation requires an additional mechanism, such as introspection, a denylist, or a session-status check."
        },
        {
          question: "12. Where should browser applications store refresh tokens?",
          answer: "A common option is a Secure, HttpOnly cookie with an appropriate SameSite policy and CSRF protections. The correct choice depends on the architecture. localStorage exposes tokens to JavaScript, so XSS can potentially steal them."
        },
        {
          question: "13. Why is HTTPS mandatory for token-bearing requests?",
          answer: "HTTPS protects data in transit against interception and modification. Without it, an attacker on the network may steal bearer tokens and use them to impersonate the client."
        },
        {
          question: "14. How do you prevent two simultaneous requests from rotating the same refresh token?",
          answer: "The client should coordinate refresh requests so only one is in flight per session where possible. The server must independently enforce one-time use through a transaction, row lock, or conditional database update so that concurrent requests cannot both consume the same token."
        },
        {
          question: "15. How should a Spring Boot application implement refresh tokens?",
          answer: "Use a dedicated refresh endpoint and a service responsible for validating token state, checking expiration and revocation, rotating tokens, and issuing new credentials. Persist refresh-token state when needed, enforce atomic updates, and use Spring Security for access-token authentication and authorization."
        },
        {
          question: "16. What is the difference between authentication and authorization?",
          answer: "Authentication establishes the identity associated with a request. Authorization determines whether that identity is allowed to perform a particular action or access a particular resource."
        },
        {
          question: "17. Can a JWT be decoded without being validated?",
          answer: "Yes. Decoding reveals the claims, but it does not prove the token is authentic or valid. The API must verify the signature and required claims using a trusted validation configuration."
        },
        {
          question: "18. What should happen when a refresh token is revoked?",
          answer: "The refresh endpoint should reject it and must not issue new credentials. The client should clear or replace its local session state as appropriate. Previously issued access tokens may require separate revocation checks or may remain valid until expiry."
        },
        {
          question: "19. What is the difference between absolute and inactivity expiration?",
          answer: "Absolute expiration limits the total duration of a session regardless of activity. Inactivity expiration ends a session after it has not been used for a configured period."
        },
        {
          question: "20. Why should refresh tokens not be sent to ordinary APIs?",
          answer: "Refresh tokens grant the ability to obtain new access credentials. Ordinary APIs should accept only credentials intended for their resource access, reducing the risk of a refresh token being exposed or misused across services."
        }
      ]
    },
    {
      id: "short-interview-note",
      title: "16. Short Notes for Revision",
      paragraphs: [
        "Access tokens are used to call protected APIs and should generally be short-lived. Refresh tokens are used to obtain new access tokens and need stronger lifecycle protection because they can extend a session.",
        "A secure refresh design validates token status and session policy, supports expiration and revocation, and uses rotation and reuse detection where appropriate. Rotation must be atomic, and the client must handle simultaneous refresh requests carefully.",
        "In Spring Boot, keep the refresh endpoint separate from business APIs, put token lifecycle logic in a service, and use Spring Security to validate access tokens. Remember that revoking a refresh token does not automatically invalidate every self-contained access JWT."
      ],
      bullets: [
        "Access token = access protected resources.",
        "Refresh token = request replacement access credentials.",
        "Rotation = consume old refresh token and issue a new one.",
        "Reuse detection = identify an attempt to use a consumed token.",
        "Revocation = prevent a token or session from being used again.",
        "HTTPS + secure storage + short lifetimes + server-side lifecycle controls = stronger token security."
      ]
    }
  ]
};
