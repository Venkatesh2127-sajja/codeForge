
export const jwtSecurityBestPractices = {
  id: 1210,
  title: "JWT Security Best Practices",
  slug: "jwt-security-best-practices",
  topicTitle: "JWT Authentication",
  description:
    "Learn production-ready JWT security practices covering signing keys, token lifetimes, revocation, browser storage, validation, authorization, and monitoring.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "keys",
      title: "Protect Signing Keys",
      paragraphs: [
        "A signing key is one of the most sensitive components of a JWT authentication system. With symmetric algorithms such as HS256, the same secret is used to sign and verify tokens. Anyone who obtains that secret and can access the signing functionality may be able to create tokens that pass signature verification.",
        "Generate cryptographically random keys and keep them outside source control. Store production keys in an appropriate secret manager or protected deployment configuration. Restrict access to the minimum set of applications and operators that require it.",
        "Asymmetric algorithms such as RS256 or ES256 separate signing from verification. The issuer keeps the private key, while APIs can verify tokens using a trusted public key. This is useful when several resource servers validate tokens issued by one identity provider.",
        "Use an explicit algorithm policy. Never trust an algorithm simply because an untrusted JWT header requests it. Configure the verifier to accept only the intended algorithms and trusted keys."
      ],
      bullets: [
        "Never hardcode production secrets or commit them to Git.",
        "Generate keys using a cryptographically secure random-number generator.",
        "Use strong keys and approved algorithms.",
        "Restrict access to signing keys and audit sensitive operations.",
        "Plan key rotation and key identifiers where necessary.",
        "Never treat a token-provided key URL or key identifier as automatically trusted.",
        "Do not log signing keys, private keys, or complete bearer tokens."
      ]
    },
    {
      id: "symmetric-vs-asymmetric",
      title: "Symmetric vs Asymmetric Signing",
      paragraphs: [
        "Symmetric signing uses one shared secret for both signing and verification. It can be straightforward for a single application, but every service that verifies tokens must protect the same secret. A compromised verifier that possesses the secret may also gain the ability to sign tokens.",
        "Asymmetric signing uses a private key to sign and a corresponding public key to verify. Resource servers can verify tokens without receiving the private signing key, reducing the number of systems that must protect signing authority.",
        "Neither approach removes the need for secure key storage, claim validation, authorization, and key rotation. Choose the approach that fits the trust boundaries and operational needs of the system."
      ],
      code: {
        language: "text",
        code: `Symmetric signing (HS256)

        Shared secret
         /       \\
        v         v
      Issuer    API verifier
      signs     verifies

Asymmetric signing (RS256 / ES256)

      Private key             Public key
          |                       |
          v                       v
        Issuer  ------------>  API verifier
          signs token           verifies token`
      },
      bullets: [
        "HS256: protect the shared secret in every service that uses it.",
        "RS256: protect the issuer's private key and distribute trusted public keys.",
        "ES256: uses elliptic-curve signatures and a private/public key pair.",
        "Use algorithms supported by your identity provider and security configuration.",
        "Do not assume asymmetric signing makes an unvalidated token trustworthy."
      ]
    },
    {
      id: "lifetime",
      title: "Use Appropriate Token Lifetimes",
      paragraphs: [
        "An access token grants access to protected APIs. If an attacker steals a valid bearer token, the attacker may be able to use it until the token expires or the system rejects it for another reason.",
        "Short-lived access tokens reduce the window in which a stolen token can be used. The appropriate lifetime depends on the sensitivity of the application, the expected user experience, and how quickly access must be withdrawn.",
        "Refresh tokens are used to obtain new access tokens without requiring the user to authenticate again each time. They need explicit expiration, secure storage, rotation or reuse detection where appropriate, and revocation controls.",
        "Token expiration is not the same as key rotation or immediate revocation. A token can remain cryptographically valid until its expiration unless the verifier applies additional checks."
      ],
      bullets: [
        "Set an explicit expiration claim for access tokens.",
        "Choose token lifetimes based on risk rather than convenience alone.",
        "Use refresh tokens only when needed and protect them more carefully than short-lived access tokens.",
        "Avoid issuing access tokens with unnecessarily long lifetimes.",
        "Consider clock skew carefully when configuring expiration validation.",
        "Do not use a refresh token as if it were an ordinary API access token."
      ]
    },
    {
      id: "refresh-token-security",
      title: "Secure Refresh Tokens",
      paragraphs: [
        "A refresh token can provide a longer-lived path to obtaining new access tokens. If an attacker steals a refresh token, the attacker may be able to maintain access for much longer than with a short-lived access token.",
        "For applications that support refresh tokens, maintain server-side refresh-session state when revocation, rotation, or reuse detection is required. On a successful refresh, issue a replacement refresh token and invalidate the previous one according to the chosen rotation design.",
        "If a previously invalidated refresh token is reused, the system may treat it as a sign of token theft and revoke the affected token family or session. The exact response should match the application's security requirements.",
        "Do not assume every refresh token should be a JWT. Opaque, high-entropy random refresh tokens can be useful because the server can manage their state and revocation centrally."
      ],
      bullets: [
        "Use high-entropy refresh tokens.",
        "Store refresh-token state securely when revocation or reuse detection is required.",
        "Rotate refresh tokens according to a documented policy.",
        "Invalidate refresh sessions on logout or other relevant security events.",
        "Apply expiration and inactivity policies.",
        "Protect refresh endpoints against abuse and brute-force attempts."
      ]
    },
    {
      id: "revocation",
      title: "JWT Revocation and Logout",
      paragraphs: [
        "A self-contained JWT can often be verified without a database lookup. This makes validation efficient, but it also means that a token does not automatically become invalid when a user logs out or an administrator disables an account.",
        "One strategy is to use short-lived access tokens and revoke the associated refresh session at logout. The existing access token may remain usable until expiration, so this approach is not sufficient when immediate access withdrawal is required.",
        "For faster revocation, the application can maintain a denylist of revoked token identifiers, check a session or token version, or use a centralized token-validation mechanism. These options introduce additional state, storage, or network checks.",
        "A JWT may contain a jti claim identifying a token. If a denylist uses jti, ensure the identifier is unique and scoped appropriately, and retain the revocation record until the token can no longer be accepted."
      ],
      code: {
        language: "text",
        code: `Logout with refresh-session revocation

Client
  |
  | POST /auth/logout
  v
Spring Boot API
  |
  | Revoke refresh session
  v
Session / token store
  |
  | Future refresh requests rejected
  v
No new access tokens from that session

Note:
An already issued access JWT may remain valid
until expiration unless additional revocation
checks are performed.`
      },
      bullets: [
        "Document whether logout invalidates refresh tokens only or also immediately invalidates access tokens.",
        "Use a revocation strategy that matches the required response time.",
        "Expire denylist entries when the corresponding tokens can no longer be accepted.",
        "Consider distributed-cache consistency if several application instances check revocation state.",
        "Do not claim immediate JWT revocation unless the verification flow actually enforces it."
      ]
    },
    {
      id: "browser",
      title: "Browser and API Security",
      paragraphs: [
        "Use HTTPS for authentication and protected API traffic. HTTPS protects tokens while they travel between the browser and the server, but it does not protect tokens from every client-side attack.",
        "Avoid placing tokens in URLs. URLs can be recorded in browser history, proxy logs, server logs, analytics systems, and referrer information. Send bearer access tokens in the Authorization header when using the bearer-token pattern.",
        "Browser token storage involves trade-offs. JavaScript-readable storage, including localStorage, can be exposed if an attacker successfully executes malicious JavaScript through cross-site scripting (XSS).",
        "Cookies marked HttpOnly prevent ordinary client-side JavaScript from reading the cookie. Secure restricts cookie transmission to HTTPS, and SameSite helps control cross-site cookie sending. However, cookies are attached automatically by the browser under applicable conditions, so cookie-based authentication must include appropriate cross-site request forgery (CSRF) protection.",
        "There is no universally safest storage choice for every architecture. Choose a strategy based on the application's threat model, whether it is a browser-only client or a backend-for-frontend design, and how CSRF and XSS risks are mitigated."
      ],
      bullets: [
        "Use HTTPS everywhere, including authentication endpoints.",
        "Never put access tokens or refresh tokens in query parameters.",
        "Avoid logging Authorization headers.",
        "Use HttpOnly, Secure, and an appropriate SameSite cookie policy when cookies are selected.",
        "Apply CSRF defenses when the authentication mechanism uses automatically attached cookies.",
        "Prevent XSS with output encoding, safe rendering, and an appropriate Content Security Policy.",
        "Do not store passwords or confidential application data inside JWT claims."
      ]
    },
    {
      id: "jwt-validation",
      title: "Validate Every Important JWT Claim",
      paragraphs: [
        "Signature verification checks whether a token was signed by a trusted key and whether its signed contents have been modified. A secure application must also validate the token's relevant claims and intended use.",
        "The issuer (iss) identifies who issued the token. The audience (aud) identifies the intended recipient or recipients. An API should reject a token intended for a different service when audience validation is part of its security policy.",
        "The expiration (exp) limits how long the token is valid. The not-before (nbf) claim can restrict when a token becomes valid. The issued-at (iat) claim records issuance time but does not replace expiration validation.",
        "The exact claims required depend on the identity provider and token profile. Configure validation against the issuer and audience expected by your application rather than assuming every signed token is suitable."
      ],
      code: {
        language: "text",
        code: `Incoming bearer token
          |
          v
Verify signature with trusted key
          |
          v
Check permitted signing algorithm
          |
          v
Validate issuer and audience
          |
          v
Validate expiration and not-before
          |
          v
Build authenticated principal
          |
          v
Apply endpoint and resource permissions`
      },
      bullets: [
        "Verify signatures using a trusted key source.",
        "Restrict acceptable signing algorithms.",
        "Validate issuer and audience as required by the token contract.",
        "Validate expiration and not-before claims when present or required.",
        "Apply any required token-type or purpose checks.",
        "Reject malformed, expired, incorrectly signed, or incorrectly scoped tokens.",
        "Do not decode a JWT and trust its claims without verifying it."
      ]
    },
    {
      id: "authorization",
      title: "Authentication Is Not Authorization",
      paragraphs: [
        "Authentication establishes which principal is making a request. Authorization determines whether that principal is allowed to perform the requested action on the specific resource.",
        "A valid JWT does not automatically grant access to every API endpoint. Spring Security should enforce role, authority, scope, ownership, or other business-specific rules after the token has been validated.",
        "For example, a token can identify a user as an ordinary customer, but that does not mean the user can access another customer's order or invoke an administrator-only endpoint.",
        "Authorization must be enforced on the server for every protected operation. Hiding a button in React or checking permissions only in the frontend does not secure the backend."
      ],
      code: {
        language: "java",
        code: `import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin/reports")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdminReport() {
        return "Restricted administrative report";
    }
}`
      },
      bullets: [
        "Enable method security when using @PreAuthorize.",
        "Use endpoint-level and, where needed, resource-level authorization.",
        "Verify ownership when users access records by ID.",
        "Do not rely on a user ID supplied by the client as proof of ownership.",
        "Return 401 when authentication is missing or invalid and 403 when an authenticated principal lacks permission, according to the API's security design."
      ]
    },
    {
      id: "algorithm-confusion",
      title: "Prevent Algorithm and Key Confusion",
      paragraphs: [
        "JWT headers and claims are untrusted until the token has been successfully validated. The alg header states the algorithm used by the token, but the application must decide which algorithms are permitted.",
        "A verifier should not accept arbitrary algorithms or select an unrelated key type based only on token-controlled data. Configure the expected signing algorithm and trusted verification-key source explicitly.",
        "When keys are obtained from an identity provider's JWKS endpoint, use the configured trusted issuer and its documented key source. Treat kid as a selector within a trusted key set, not as proof that a key is safe.",
        "When a key rotates, the verifier should follow a defined process for refreshing trusted keys and handling tokens signed by old keys. Do not fetch keys from arbitrary URLs embedded in untrusted token headers."
      ],
      bullets: [
        "Allow only explicitly supported signing algorithms.",
        "Match key types to the intended algorithm.",
        "Do not trust a token's claims before signature and claim validation succeed.",
        "Use trusted issuer metadata or a configured JWKS endpoint.",
        "Treat kid as a key-selection hint, not a trust decision.",
        "Reject unexpected algorithms, unknown keys, and invalid signatures."
      ]
    },
    {
      id: "csrf-cors",
      title: "Configure CSRF and CORS Correctly",
      paragraphs: [
        "Cross-site request forgery (CSRF) is a concern when a browser automatically attaches authentication credentials, such as cookies, to requests. An attacker may try to cause the browser to send an authenticated request from an untrusted site.",
        "HttpOnly cookies reduce the ability of JavaScript to read a cookie, but they do not prevent the browser from sending it. Cookie-based authentication therefore needs a suitable CSRF strategy, which may include Spring Security's CSRF protection, SameSite cookie settings, and additional request validation.",
        "Cross-origin resource sharing (CORS) controls which browser origins can read responses to cross-origin requests. CORS is not an authentication mechanism and does not replace CSRF protection or backend authorization.",
        "For credentialed cross-origin requests, configure explicit trusted origins rather than allowing every origin. Wildcard origins cannot be used as a permissive substitute for an explicit origin when credentials are enabled."
      ],
      bullets: [
        "Keep CSRF protection enabled when appropriate for cookie-based authentication.",
        "Do not disable CSRF merely because the application uses JWTs.",
        "Use an explicit allowlist of trusted browser origins.",
        "Configure allowed methods and headers narrowly enough for the application.",
        "Never treat CORS as a replacement for authorization.",
        "Test browser behavior for login, refresh, logout, and cross-origin API calls."
      ]
    },
    {
      id: "monitoring",
      title: "Monitor Suspicious Authentication Activity",
      paragraphs: [
        "Production JWT security requires monitoring as well as correct token validation. Authentication logs and security metrics can help identify brute-force attempts, repeated invalid tokens, refresh-token reuse, and unusual access patterns.",
        "Record useful metadata such as timestamps, endpoint names, failure categories, correlation IDs, and relevant non-sensitive account identifiers. Avoid recording full JWTs, passwords, signing secrets, or unnecessary personal information.",
        "Rate-limit sensitive endpoints such as login and token refresh. Alert on unusual failure rates or refresh-session anomalies according to the application's risk and operational capacity.",
        "Logging should support investigation without exposing credentials. Protect logs with access controls, retention policies, and integrity safeguards appropriate to the environment."
      ],
      bullets: [
        "Monitor repeated authentication failures and unexpected refresh activity.",
        "Apply rate limits to login and token-refresh endpoints.",
        "Use structured logs and correlation IDs.",
        "Never log complete bearer tokens or signing keys.",
        "Restrict access to authentication logs.",
        "Alert on suspicious patterns without treating every invalid token as a confirmed attack."
      ]
    },
    {
      id: "dependency-security",
      title: "Keep Security Dependencies Updated",
      paragraphs: [
        "JWT and Spring Security libraries receive maintenance and security fixes over time. An old dependency can contain known vulnerabilities or use APIs that no longer match the supported security configuration.",
        "Use dependency management appropriate to your Spring Boot version and periodically review dependency updates. Test authentication and authorization behavior after upgrades rather than assuming all changes are harmless.",
        "Do not copy security code blindly from an old tutorial. JWT APIs, Spring Security configuration patterns, and recommended integrations can differ between versions."
      ],
      bullets: [
        "Use a supported Spring Boot and Spring Security release line.",
        "Keep related JWT modules compatible.",
        "Review dependency vulnerability reports.",
        "Test expired tokens, invalid signatures, authorization failures, and key rotation after upgrades.",
        "Prefer supported framework integrations when they satisfy the application's requirements."
      ]
    },
    {
      id: "production-checklist",
      title: "Production JWT Security Checklist",
      paragraphs: [
        "Before deploying a JWT-protected Spring Boot API, review the full authentication lifecycle rather than checking token generation alone. A secure system must issue tokens appropriately, validate them consistently, enforce authorization, and handle session termination and operational monitoring."
      ],
      bullets: [
        "Signing keys are generated securely and stored outside source control.",
        "The verifier accepts only approved signing algorithms and trusted keys.",
        "Issuer, audience, expiration, and other required claims are validated.",
        "Access tokens have an explicit, risk-appropriate lifetime.",
        "Refresh tokens have expiration, storage, rotation, and revocation policies where applicable.",
        "Logout behavior and the remaining validity of existing access tokens are documented.",
        "Browser storage decisions account for XSS and CSRF risks.",
        "Protected endpoints enforce roles, scopes, ownership, and business permissions.",
        "Authentication endpoints have appropriate rate limits.",
        "Logs contain useful diagnostic metadata but never expose tokens or secrets.",
        "Dependencies and configuration are reviewed and tested before release.",
        "Key rotation and compromised-token response procedures are documented."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "How can JWTs be revoked?",
          answer: "JWTs are commonly accepted until expiration unless the system adds revocation controls. Options include tracking revoked token identifiers, revoking refresh sessions, maintaining session state, or using short access-token lifetimes."
        },
        {
          question: "What is the risk of storing JWTs in localStorage?",
          answer: "JavaScript running on the same origin can read localStorage, so a successful XSS attack may steal a stored token. The appropriate storage design depends on the threat model and application architecture."
        },
        {
          question: "Does JWT replace authorization?",
          answer: "No. A valid token can establish identity or convey claims, but the API must still check permissions for the requested operation and resource."
        },
        {
          question: "What is the difference between HS256 and RS256?",
          answer: "HS256 uses a shared secret for signing and verification. RS256 uses an RSA private key to sign and a corresponding public key to verify, allowing resource servers to validate tokens without possessing the private signing key."
        },
        {
          question: "Why should access tokens be short-lived?",
          answer: "A shorter lifetime reduces the period during which a stolen access token can be used. It does not eliminate the need for secure storage, authorization, or a revocation strategy."
        },
        {
          question: "Does logging out automatically invalidate a JWT?",
          answer: "No. A stateless JWT may remain valid until expiration unless the system checks a revocation list, session state, token version, or another invalidation mechanism. Revoking a refresh session alone does not necessarily invalidate an already issued access token."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication establishes the identity of the caller. Authorization determines whether that caller can perform a particular operation or access a particular resource."
        },
        {
          question: "What is the purpose of the audience claim?",
          answer: "The aud claim identifies the intended recipient of a token. An API can reject tokens whose audience does not match the API's expected identity."
        },
        {
          question: "Why is the issuer claim important?",
          answer: "The iss claim identifies the token issuer. Validating it helps ensure that the token comes from the expected identity provider or trusted authorization service."
        },
        {
          question: "What is the difference between XSS and CSRF?",
          answer: "XSS involves injecting or executing malicious script in a trusted origin, potentially exposing JavaScript-readable tokens. CSRF tricks a browser into sending an authenticated request, often using automatically attached cookies."
        },
        {
          question: "Do HttpOnly cookies completely prevent token theft?",
          answer: "No. HttpOnly prevents ordinary JavaScript from reading the cookie, but it does not eliminate XSS-related risks or prevent the browser from sending authenticated requests. Cookie authentication also requires appropriate CSRF protection."
        },
        {
          question: "Does CORS secure a Spring Boot API?",
          answer: "No. CORS controls browser access to cross-origin responses. It does not authenticate callers or replace server-side authorization, and it is not a general defense against CSRF."
        },
        {
          question: "Why should a server not trust the alg header?",
          answer: "The header is part of an untrusted token until validation succeeds. The verifier must enforce its own algorithm policy and use trusted keys rather than allowing the token to choose arbitrary verification behavior."
        },
        {
          question: "What is a JWT denylist?",
          answer: "A denylist records token identifiers or other revocation information so a verifier can reject specific tokens before their normal expiration. It improves revocation control but introduces a state lookup and associated operational considerations."
        },
        {
          question: "What is refresh-token rotation?",
          answer: "Refresh-token rotation replaces a refresh token when it is used and invalidates the old token. Detecting reuse of an invalidated token can help identify token theft and trigger revocation of the associated session or token family."
        },
        {
          question: "What is key rotation, and why is it needed?",
          answer: "Key rotation replaces signing keys according to a planned procedure. It limits the impact of key exposure and supports cryptographic maintenance while accounting for tokens that were signed by an older key."
        },
        {
          question: "What should be monitored in a production JWT system?",
          answer: "Monitor authentication failures, suspicious refresh activity, unusual access patterns, and security-relevant events. Use rate limits and structured logs, but never log complete bearer tokens, passwords, or signing keys."
        },
        {
          question: "What happens when a user's role changes after a JWT has been issued?",
          answer: "If authorization relies entirely on role claims embedded in the token, those claims may remain unchanged until the token expires. Applications needing faster permission updates can use shorter token lifetimes or consult current server-side authorization or session state."
        }
      ]
    }
  ]
};
