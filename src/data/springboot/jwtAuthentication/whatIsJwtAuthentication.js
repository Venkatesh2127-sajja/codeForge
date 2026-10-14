
export const whatIsJwtAuthentication = {
  id: 1201,
  title: "What Is JWT Authentication?",
  slug: "what-is-jwt-authentication",
  topicTitle: "JWT Authentication",
  description:
    "Understand JSON Web Tokens, stateless authentication, token structure, and how JWT authentication works with Spring Security, Spring Boot REST APIs, and React frontends.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction to JWT",
      paragraphs: [
        "JWT stands for JSON Web Token. It is a compact format for representing claims between two parties. In a typical Spring Boot REST API, the server can issue a signed JWT after successfully authenticating a user.",
        "Authentication verifies the identity of a user or client. For example, when a user enters an email and password, the backend checks whether those credentials are valid. After successful authentication, the application may issue an access token that the client presents on subsequent requests.",
        "The client commonly sends the token through the Authorization HTTP header using the Bearer scheme. Spring Security can validate the token and establish an authenticated principal for the current request. Authorization rules then determine which resources that principal can access.",
        "JWT is a token format, not a complete authentication system. It does not automatically provide login endpoints, user registration, password storage, refresh-token management, logout, or authorization policies. The application must implement or configure these capabilities.",
        "A typical signed JWT uses a JSON header, a JSON payload containing claims, and a cryptographic signature. The header and payload are normally Base64URL-encoded, not encrypted. Anyone who obtains a typical signed JWT can usually read its payload, so confidential information should not be placed in ordinary JWT claims."
      ],
      bullets: [
        "JWT stands for JSON Web Token.",
        "It represents claims in a compact token format.",
        "A signed JWT can provide integrity and authenticity under a trusted-key verification model.",
        "Signing does not encrypt the payload.",
        "The backend must validate a token before trusting its claims.",
        "Authentication and authorization are separate responsibilities.",
        "JWT is commonly used with REST APIs, mobile applications, and single-page applications.",
        "JWT does not replace Spring Security."
      ]
    },
    {
      id: "request-flow",
      title: "2. How JWT Authentication Works",
      paragraphs: [
        "Imagine a React frontend communicating with a Spring Boot backend. The user submits an email and password to a login endpoint. The backend authenticates those credentials using its configured authentication mechanism, commonly Spring Security.",
        "If authentication succeeds, the application creates and returns a signed access token. The frontend can then include that token in requests to protected API endpoints.",
        "When a protected request arrives, Spring Security extracts the bearer token and validates it using a trusted verification key or configured JWT decoder. The application checks required claims such as expiration and issuer, along with audience or other claims required by its security policy.",
        "After successful validation, Spring Security establishes an authenticated principal for the request. Authorization rules determine whether the principal is permitted to perform the requested operation. A valid token alone does not grant access to every endpoint."
      ],
      code: {
        language: "http",
        code: `GET /api/profile HTTP/1.1
Host: localhost:8080
Authorization: Bearer <signed-access-token>`
      },
      output:
        "If the token is valid and the principal is authorized, the API returns the requested profile. A missing or invalid token on a protected endpoint normally results in 401 Unauthorized. An authenticated principal without the required permission normally receives 403 Forbidden.",
      bullets: [
        "Step 1: The user submits login credentials.",
        "Step 2: The backend authenticates the credentials.",
        "Step 3: The application issues an access token after successful authentication.",
        "Step 4: The frontend sends the token in the Authorization header.",
        "Step 5: Spring Security validates the token and required claims.",
        "Step 6: The backend applies authorization rules.",
        "Step 7: The controller processes the request if access is allowed."
      ]
    },
    {
      id: "jwt-structure",
      title: "3. Structure of a JWT",
      paragraphs: [
        "A signed JWT in JWS compact serialization normally consists of three Base64URL-encoded components separated by periods: header, payload, and signature.",
        "The header describes information such as the signing algorithm. The payload contains claims, such as the subject and expiration time. The signature allows a verifier with the appropriate trusted key to detect changes to the signed content.",
        "The alg header identifies an algorithm, but a server must not blindly trust the algorithm selected by an untrusted token. The application must enforce an acceptable algorithm and use trusted verification material.",
        "Base64URL encoding is not encryption. A typical signed JWT can be decoded to read its header and payload without possessing the signing key. The key is needed to verify the signature, not to decode the payload."
      ],
      code: {
        language: "text",
        code: `header.payload.signature
   |       |        |
   |       |        +-- Signature over the signed content
   |       |
   |       +----------- Claims: subject, expiry, issuer, etc.
   |
   +------------------- Metadata such as the signing algorithm`
      },
      bullets: [
        "Header: token metadata, including the algorithm.",
        "Payload: claims describing the subject or token context.",
        "Signature: protects the integrity of the signed content.",
        "A signed JWT is not necessarily encrypted.",
        "Never store passwords, signing secrets, or confidential data in readable claims.",
        "Validate the signature and required claims before trusting the payload."
      ]
    },
    {
      id: "claims",
      title: "4. Important JWT Claims",
      paragraphs: [
        "Claims are statements carried by a JWT. Registered claims have standardized meanings, while applications can define additional claims for their own requirements.",
        "The sub claim commonly identifies the user or service represented by the token. The iss claim identifies the issuer, and aud identifies the intended recipient or recipients. The exp claim indicates when the token expires.",
        "The nbf claim defines a time before which the token must not be accepted. The iat claim records when the token was issued. The jti claim provides a token identifier, but it does not automatically revoke the token or prevent replay."
      ],
      code: {
        language: "json",
        code: `{
  "sub": "user-123",
  "iss": "codeforge-api",
  "aud": "codeforge-api",
  "iat": 1791288000,
  "exp": 1791288900
}`
      },
      bullets: [
        "iss: issuer of the token.",
        "sub: subject represented by the token.",
        "aud: intended recipient or recipients.",
        "exp: expiration time expressed as a NumericDate.",
        "nbf: earliest time at which the token may be accepted.",
        "iat: token issue time.",
        "jti: token identifier, not automatic revocation.",
        "The application must explicitly validate claims required by its security policy."
      ]
    },
    {
      id: "session-comparison",
      title: "5. JWT vs Server-Side Sessions",
      paragraphs: [
        "With traditional session-based authentication, the server commonly creates an HTTP session after login and associates authentication state with that session. The client usually sends a session identifier, often through a cookie, on subsequent requests.",
        "With a self-contained signed JWT, the token carries claims that the server can validate without retrieving a session for every request. The server still needs trusted verification keys and may consult a database or revocation store when the security design requires it.",
        "JWTs can simplify authentication across multiple backend instances because each instance can validate tokens using the same trusted verification configuration. However, self-contained tokens can be harder to revoke immediately. Short expiration times, token denylisting, token-version checks, or centralized validation can address particular revocation requirements.",
        "Neither sessions nor JWTs are universally better. The appropriate design depends on the application's browser behavior, token lifecycle, revocation requirements, infrastructure, and threat model."
      ],
      bullets: [
        "Session authentication commonly stores authentication state on the server.",
        "JWT authentication can validate a signed token without relying on an HTTP session.",
        "JWTs can simplify authentication across distributed API instances.",
        "JWT does not automatically make an application faster or more secure.",
        "Session identifiers and JWTs both require secure transport and storage.",
        "Immediate token revocation requires additional design for self-contained JWTs.",
        "Choose based on security requirements, operational complexity, and client architecture."
      ]
    },
    {
      id: "spring-security",
      title: "6. JWT and Spring Security",
      paragraphs: [
        "Spring Security provides the authentication and authorization infrastructure used by a Spring Boot application. JWT supplies a token format that can be used as part of that infrastructure.",
        "A common approach is to configure Spring Security OAuth2 Resource Server support for bearer-token authentication. The application provides trusted issuer or key configuration and a suitable JwtDecoder, which validates tokens and integrates with Spring Security's authentication flow.",
        "Another approach is a custom JWT filter, but the filter must extract the token, invoke trusted validation logic, establish authentication only after successful validation, and handle authentication failures correctly. Reimplementing standard JWT validation unnecessarily can introduce security defects.",
        "SessionCreationPolicy.STATELESS configures session behavior; it does not enable JWT authentication by itself. The application must configure a bearer-token authentication mechanism and appropriate endpoint authorization rules."
      ],
      code: {
        language: "java",
        code: `http
    .sessionManagement(session ->
        session.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS
        )
    )
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/v1/auth/**").permitAll()
        .anyRequest().authenticated()
    )
    .oauth2ResourceServer(oauth2 ->
        oauth2.jwt(jwt -> {})
    );`
      },
      bullets: [
        "AuthenticationManager coordinates supported authentication operations.",
        "A JWT decoder verifies the token using trusted configuration.",
        "The security context represents authentication for the current request.",
        "Authorization rules protect endpoints and operations.",
        "STATELESS does not configure JWT validation on its own.",
        "Spring Security Resource Server is a standard option for bearer-token APIs.",
        "Use a custom JWT filter only when its responsibilities and failure behavior are well understood."
      ]
    },
    {
      id: "access-and-refresh",
      title: "7. Access Tokens and Refresh Tokens",
      paragraphs: [
        "An access token is presented to protected APIs to obtain access to permitted resources. Access tokens are often short-lived to limit the period during which a stolen token can be used.",
        "A refresh token is used in a separate, controlled flow to obtain a new access token without asking the user to enter credentials again. Refresh tokens generally need stronger lifecycle controls, such as secure storage, rotation, expiration, and revocation.",
        "Access tokens and refresh tokens should not automatically be treated as interchangeable. An API should accept only the appropriate token type for each operation and validate the expected issuer, audience, claims, and lifecycle.",
        "Revoking a refresh token does not necessarily invalidate access tokens that have already been issued. The application must decide how to handle those tokens, for example through short lifetimes or an additional revocation mechanism."
      ],
      bullets: [
        "Access token: presented to protected APIs.",
        "Refresh token: used to request new access tokens through a dedicated flow.",
        "Use appropriate expiration and storage policies for both token types.",
        "Rotate and revoke refresh tokens according to the application's security design.",
        "Do not expose refresh tokens unnecessarily to frontend JavaScript.",
        "Design logout behavior explicitly; removing a token from the client does not revoke a copied token on its own."
      ]
    },
    {
      id: "token-storage",
      title: "8. Sending and Storing JWTs Securely",
      paragraphs: [
        "Tokens must be protected both while they are transmitted and while they are stored. Use HTTPS so that credentials and tokens are not exposed to network observers.",
        "Browser localStorage is accessible to JavaScript running in the page. A successful cross-site scripting attack can potentially read tokens stored there. HttpOnly cookies reduce direct JavaScript access to cookie contents, but browsers automatically attach matching cookies, so cookie-based authentication requires an appropriate CSRF strategy.",
        "The correct storage choice depends on the application architecture. Consider the threat model, XSS defenses, cookie attributes, refresh-token handling, and CSRF requirements rather than assuming one storage mechanism is universally safe.",
        "Do not place tokens in URLs or log them. URLs can be retained in browser history, server logs, analytics, and referrer information."
      ],
      bullets: [
        "Use HTTPS in production.",
        "Do not place bearer tokens in query parameters.",
        "Avoid logging tokens or Authorization headers.",
        "Protect browser applications against cross-site scripting.",
        "Evaluate HttpOnly, Secure, and SameSite cookie attributes when using cookies.",
        "Use CSRF defenses appropriate to the credential transport.",
        "Store signing keys on the server in secure configuration or secret-management systems.",
        "Never embed a server signing secret in a React frontend."
      ]
    },
    {
      id: "advantages-limitations",
      title: "9. Advantages and Limitations of JWT",
      paragraphs: [
        "JWTs can make it easier for multiple API instances to validate authentication using shared or distributed trusted verification keys. Claims also provide a compact way to communicate identity and token metadata.",
        "However, JWTs introduce responsibilities for key management, token expiration, refresh flows, revocation, claim validation, and client-side storage. Large claims also increase request size because the token is commonly transmitted with every protected request.",
        "A token that is correctly signed can still be inappropriate for an API if its issuer, audience, expiration, or permissions are wrong. JWT should therefore be treated as one component of an authentication architecture rather than a complete security solution."
      ],
      bullets: [
        "Advantages: compact format, broad ecosystem support, and local validation with trusted keys.",
        "Advantages: can reduce dependence on per-request session lookups.",
        "Limitations: revocation can require additional infrastructure.",
        "Limitations: tokens increase request size.",
        "Limitations: stolen bearer tokens can be replayed while accepted.",
        "Limitations: claims can become stale when user permissions change.",
        "Use short lifetimes and suitable revocation or revalidation mechanisms for sensitive systems."
      ]
    },
    {
      id: "common-mistakes",
      title: "10. Common JWT Authentication Mistakes",
      paragraphs: [
        "Many JWT security problems come from treating the token as trusted merely because it exists or can be decoded. A secure implementation validates the token and then applies the application's authorization rules."
      ],
      bullets: [
        "Assuming JWT is encrypted by default.",
        "Trusting decoded claims without verifying the signature.",
        "Accepting any signing algorithm specified in an untrusted token header.",
        "Generating tokens before authentication succeeds.",
        "Treating a valid token as permission to access every endpoint.",
        "Forgetting issuer, audience, expiration, or other required claim validation.",
        "Storing sensitive information in readable JWT claims.",
        "Placing signing secrets in frontend code or source control.",
        "Assuming logout automatically revokes an already-issued self-contained access token.",
        "Disabling CSRF without understanding how browser credentials are transmitted.",
        "Using JWT without an explicit token-expiration and refresh strategy."
      ]
    },
    {
      id: "best-practices",
      title: "11. JWT Authentication Best Practices",
      paragraphs: [
        "A secure JWT architecture starts by defining who can issue tokens, which services can accept them, which claims are mandatory, and how long tokens remain valid. It then implements authentication, authorization, storage, monitoring, and token lifecycle controls around that policy."
      ],
      bullets: [
        "Authenticate credentials before issuing an access token.",
        "Use maintained JWT and Spring Security libraries.",
        "Validate signatures with trusted keys and an explicit algorithm policy.",
        "Validate expiration and the required issuer, audience, and subject claims.",
        "Keep access tokens appropriately short-lived.",
        "Use secure signing-key storage and a key-rotation strategy.",
        "Apply authorization rules after authentication.",
        "Protect refresh tokens with an explicit rotation and revocation strategy.",
        "Choose browser token storage and CSRF controls based on the threat model.",
        "Never log passwords, signing secrets, or complete bearer tokens.",
        "Test malformed, expired, and tampered tokens as well as insufficient permissions."
      ]
    },
    {
      id: "interview",
      title: "12. Interview Questions",
      interviewQuestions: [
        {
          question: "What is JWT?",
          answer: "JWT stands for JSON Web Token. It is a compact format for representing claims. A server can issue a signed JWT after authenticating a user, and a client can present it with subsequent API requests."
        },
        {
          question: "Is JWT encrypted by default?",
          answer: "No. A typical signed JWT has a readable payload. Signing protects the integrity of the signed content; it does not provide confidentiality."
        },
        {
          question: "Does JWT replace Spring Security?",
          answer: "No. JWT is a token format. Spring Security provides authentication integration, security-context management, and authorization. JWT can be integrated into that security architecture."
        },
        {
          question: "How does JWT authentication work in Spring Boot?",
          answer: "The backend authenticates the user's credentials, issues a signed access token, and validates that token on protected requests. Spring Security establishes the authenticated principal and applies authorization rules."
        },
        {
          question: "What are the three parts of a signed JWT?",
          answer: "Header, payload, and signature. They are represented as Base64URL-encoded header and payload components followed by a signature, separated by periods."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication verifies identity. Authorization determines which resources or operations the authenticated identity is permitted to access."
        },
        {
          question: "What is the difference between JWT and session-based authentication?",
          answer: "Session-based authentication commonly uses server-side session state. A self-contained JWT can be validated using trusted keys without relying on an HTTP session for every request, but revocation may require additional mechanisms."
        },
        {
          question: "What is an access token?",
          answer: "An access token is a credential presented to a protected API. The API validates it and applies authorization rules before returning protected resources."
        },
        {
          question: "What is a refresh token?",
          answer: "A refresh token is used in a separate flow to obtain a new access token. It requires secure storage, expiration, and appropriate rotation and revocation controls."
        },
        {
          question: "What happens when a JWT expires?",
          answer: "The API rejects the token as an authentication credential. If the application supports a valid refresh flow, the client may obtain a new access token."
        },
        {
          question: "What does SessionCreationPolicy.STATELESS mean?",
          answer: "It tells Spring Security not to use an HTTP session to persist the security context between requests. It does not automatically configure JWT authentication."
        },
        {
          question: "Why must a JWT signature be verified?",
          answer: "Signature verification helps establish that the signed content has not been modified and was produced by a party trusted under the configured key and algorithm policy."
        },
        {
          question: "Can a valid JWT access every endpoint?",
          answer: "No. The token must pass validation, and the authenticated principal must still satisfy the endpoint's authorization rules."
        },
        {
          question: "What is the difference between HTTP 401 and HTTP 403?",
          answer: "HTTP 401 normally indicates missing or invalid authentication. HTTP 403 normally indicates that an authenticated principal lacks the required permission."
        },
        {
          question: "What are the main security risks of JWT?",
          answer: "Common risks include stolen bearer tokens, weak or exposed signing keys, missing claim validation, excessive token lifetime, insecure browser storage, and inadequate revocation or refresh-token controls."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "13. Quick Revision Notes",
      paragraphs: [
        "JWT is a compact token format commonly used to represent claims in API authentication. The backend issues a token after successful authentication, validates it when presented, and applies authorization rules before allowing access to protected resources."
      ],
      bullets: [
        "JWT: JSON Web Token.",
        "Header: token metadata.",
        "Payload: claims.",
        "Signature: protects the integrity of the signed content.",
        "Bearer token: a credential presented with an API request.",
        "Authentication: verifies identity.",
        "Authorization: checks permissions.",
        "STATELESS: does not persist the security context in an HTTP session between requests.",
        "401: authentication failure in the usual case.",
        "403: insufficient permission in the usual case.",
        "A signed JWT is not automatically encrypted.",
        "JWT does not replace Spring Security or eliminate the need for authorization."
      ]
    }
  ]
};
