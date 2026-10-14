
export const validatingJwtTokens = {
  id: 1206,
  title: "Validating JWT Tokens",
  slug: "validating-jwt-tokens",
  topicTitle: "JWT Authentication",
  description:
    "Understand JWT signature verification, required claims, issuer and audience validation, expiration handling, and secure token-validation errors in Spring Boot.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "validation",
      title: "Validate a Signed JWT",
      paragraphs: [
        "A server must never trust a JWT simply because it can decode the payload. Decoding reveals the token's contents, but it does not prove that the token was issued by a trusted party or that its contents have not been modified.",
        "For a signed JWT in JWS compact format, the token normally contains three Base64URL-encoded parts: header, payload, and signature. The signature protects the signed content against undetected modification when the verifier uses the correct trusted key and an acceptable algorithm. A signed JWT is not necessarily encrypted, so its claims should not contain confidential information.",
        "Validation has multiple responsibilities. The application verifies the signature, restricts the accepted algorithm, checks expiration and not-before constraints when present, and validates required claims such as issuer, audience, and subject according to its token contract.",
        "The example below uses JJWT 0.12.x APIs. It verifies the signature with a configured SecretKey, requires the expected issuer, and explicitly requires a nonblank subject and an expiration claim. JJWT validates expiration when present, but the application must check that expiration is present if it is mandatory.",
        "The signing key must be securely configured and must correspond to the key used to sign the token. For an HS256 token, the same secret key is used for signing and verification. The key should have sufficient cryptographic strength and must not be hardcoded into production source code."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

@Service
public class JwtValidationService {

    private final SecretKey signingKey;

    public JwtValidationService(SecretKey signingKey) {
        this.signingKey = signingKey;
    }

    public Claims validateAndGetClaims(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(signingKey)
                .requireIssuer("codeforge-api")
                .build()
                .parseSignedClaims(token)
                .getPayload();

        if (claims.getSubject() == null
                || claims.getSubject().isBlank()) {
            throw new JwtException(
                    "JWT subject is required");
        }

        if (claims.getExpiration() == null) {
            throw new JwtException(
                    "JWT expiration is required");
        }

        return claims;
    }
}`
      },
      bullets: [
        "Signature verification protects the integrity and authenticity of a token under the configured trust model.",
        "Issuer validation checks that the token's iss claim matches the expected issuer.",
        "Expiration validation rejects tokens whose exp time has passed.",
        "A required expiration claim must be checked for presence; a parser cannot reject a missing claim solely because no expiration has elapsed.",
        "Validate audience when the application defines an intended recipient.",
        "Validate not-before when present; a token must not be accepted before its nbf time.",
        "Use a trusted key and explicitly restrict the accepted signing algorithm.",
        "The example requires a subject and expiration but does not yet enforce an audience."
      ]
    },
    {
      id: "validation-flow",
      title: "JWT Validation Flow",
      paragraphs: [
        "JWT validation starts when the client sends a token to a protected endpoint. The server extracts the token using its configured authentication mechanism and passes it to a trusted JWT parser or decoder.",
        "The parser checks whether the token is structurally valid, verifies the signature using the trusted key, and evaluates applicable time and issuer constraints. The application then checks any additional mandatory claims before treating the token as an authenticated identity.",
        "Only after validation succeeds should the application's authentication mechanism establish an authenticated principal. Authorization checks then decide whether that principal may access the requested resource."
      ],
      code: {
        language: "text",
        code: `Client sends bearer token
          |
          v
Extract JWT from Authorization header
          |
          v
Parse signed JWT
          |
          v
Verify signature and allowed algorithm
          |
          v
Validate exp, nbf, iss, aud, and required claims
          |
     +----+----+
     |         |
   Invalid    Valid
     |         |
     v         v
 Reject      Establish authenticated principal
               |
               v
        Check authorization rules
               |
               v
        Execute protected operation`
      },
      bullets: [
        "Token parsing is not the same as token validation.",
        "A valid signature does not automatically mean the token is intended for this API.",
        "Authentication should only be established after required validation succeeds.",
        "Authorization is a separate decision made after authentication.",
        "Use consistent clock-skew settings across token issuers and verifiers."
      ]
    },
    {
      id: "claims",
      title: "Important JWT Claims",
      paragraphs: [
        "Claims are statements about the token's subject or intended use. Registered JWT claim names have standardized meanings, while applications can also define private claims for their own requirements.",
        "The iss claim identifies the issuer. The sub claim identifies the subject, commonly a user or service. The aud claim identifies the intended recipient or recipients. The exp claim defines when the token expires, and nbf defines the time before which the token must not be accepted.",
        "The iat claim records when a token was issued. The jti claim identifies a particular token, but merely including a jti does not revoke the token or prevent replay. Revocation requires an additional mechanism if the application needs it.",
        "A token verifier should enforce the claims required by its own trust contract. Do not assume every claim is present or meaningful simply because a JWT library successfully parsed the token."
      ],
      code: {
        language: "java",
        code: `Claims claims = Jwts.parser()
        .verifyWith(signingKey)
        .requireIssuer("codeforge-api")
        .build()
        .parseSignedClaims(token)
        .getPayload();

String subject = claims.getSubject();
String issuer = claims.getIssuer();
String audience = claims.getAudience();
java.util.Date expiration = claims.getExpiration();
java.util.Date issuedAt = claims.getIssuedAt();
java.util.Date notBefore = claims.getNotBefore();
String jwtId = claims.getId();`
      },
      bullets: [
        "iss: identifies the token issuer.",
        "sub: identifies the token subject.",
        "aud: identifies the intended recipient or recipients.",
        "exp: expiration time expressed as a NumericDate.",
        "nbf: the token must not be accepted before this time.",
        "iat: records the token's issue time.",
        "jti: a token identifier; it does not provide revocation automatically.",
        "Validate only claims that are meaningful to the application's token contract, and require mandatory claims explicitly."
      ]
    },
    {
      id: "issuer-audience",
      title: "Validate Issuer and Audience",
      paragraphs: [
        "Issuer validation prevents a verifier from accepting tokens issued by an unexpected authority. In JJWT, requireIssuer configures the expected issuer and causes parsing to fail if the claim does not match.",
        "Audience validation is important when tokens can be issued for multiple applications or APIs. A token intended for one API should not automatically be accepted by another API just because both trust the same signing key.",
        "An issuer check alone does not prove that the token is intended for the current service. If the application uses the aud claim, validate the expected audience as part of the same trusted token-validation policy.",
        "The example below assumes that the issuer includes an audience claim with the value codeforge-api. The issuer and audience strings must match the values actually placed in tokens by the trusted issuer."
      ],
      code: {
        language: "java",
        code: `Claims claims = Jwts.parser()
        .verifyWith(signingKey)
        .requireIssuer("codeforge-api")
        .requireAudience("codeforge-api")
        .build()
        .parseSignedClaims(token)
        .getPayload();`
      },
      bullets: [
        "Use the exact expected issuer configured by your identity provider or token issuer.",
        "Require the expected audience when the API uses audience restriction.",
        "Do not accept issuer or key URLs supplied arbitrarily by an untrusted token.",
        "A shared signing key does not mean every token signed with it is intended for every service.",
        "Keep token-issuer configuration consistent across development, test, and production environments."
      ]
    },
    {
      id: "expiration",
      title: "Expiration and Time-Based Validation",
      paragraphs: [
        "The exp claim defines the time after which a token must not be accepted. JJWT checks expiration when the claim is present and rejects an expired token during parsing.",
        "If expiration is mandatory for your application's access tokens, explicitly require the claim to be present. A token with no exp claim is not automatically expired merely because the current time has passed.",
        "The nbf claim specifies when a token becomes valid. A token presented before that time must be rejected. The iat claim records issuance time but does not automatically enforce every policy concerning maximum token age or future issuance.",
        "Clock skew can occur between systems. A small, deliberate tolerance may be appropriate, but a large tolerance weakens the intended time restrictions. Configure it consistently and avoid using it to hide clock synchronization problems."
      ],
      code: {
        language: "java",
        code: `Claims claims = Jwts.parser()
        .verifyWith(signingKey)
        .requireIssuer("codeforge-api")
        .clockSkewSeconds(30)
        .build()
        .parseSignedClaims(token)
        .getPayload();

if (claims.getExpiration() == null) {
    throw new JwtException(
            "Expiration claim is required");
}

if (claims.getSubject() == null
        || claims.getSubject().isBlank()) {
    throw new JwtException(
            "Subject claim is required");
}`
      },
      bullets: [
        "exp limits how long an access token can be accepted.",
        "nbf prevents acceptance before the specified time.",
        "iat does not automatically enforce a maximum token age.",
        "Require exp explicitly when the application mandates it.",
        "Use a small clock-skew allowance only when justified.",
        "Issue short-lived access tokens according to the application's risk and usability requirements.",
        "A refresh flow must independently validate the refresh token and its lifecycle."
      ]
    },
    {
      id: "errors",
      title: "Handling Invalid Tokens",
      paragraphs: [
        "Malformed tokens, expired tokens, signature failures, unsupported algorithms, and claim-validation failures must not establish authentication. A protected bearer-token endpoint normally responds with HTTP 401 Unauthorized when authentication credentials are missing or unacceptable.",
        "HTTP 403 Forbidden normally indicates that the request has been authenticated but the principal lacks permission to perform the requested operation. An invalid token is generally an authentication failure, not an authorization failure.",
        "Avoid returning detailed parser exceptions or cryptographic information to the client. Such details can leak implementation information and make the API's error behavior inconsistent. Record only the information needed for safe operational monitoring, without logging the raw token.",
        "In a Spring Security Resource Server configuration, invalid bearer tokens are handled by the framework's authentication failure mechanism. If implementing a custom JWT filter, convert expected token-validation failures into an authentication failure and allow the configured entry point to produce the response. Do not silently continue as though authentication succeeded."
      ],
      code: {
        language: "java",
        code: `try {
    Claims claims =
            jwtValidationService.validateAndGetClaims(token);

    // Use validated claims only after parsing succeeds.
    String subject = claims.getSubject();

} catch (JwtException | IllegalArgumentException ex) {
    // Reject the token through the application's
    // configured authentication failure mechanism.
    // Do not return internal exception details to the client.
}`
      },
      bullets: [
        "401 Unauthorized: authentication is missing or unacceptable.",
        "403 Forbidden: the authenticated principal lacks required permission.",
        "Treat malformed, expired, and incorrectly signed tokens as invalid credentials.",
        "Do not expose signing keys, stack traces, or cryptographic details in public error responses.",
        "Do not log complete JWTs or Authorization headers.",
        "Handle expected parsing failures separately from unrelated programming or infrastructure errors.",
        "Prefer standard Spring Security bearer-token failure handling when using Resource Server support."
      ]
    },
    {
      id: "security-filter-integration",
      title: "Integrate Validation with Spring Security",
      paragraphs: [
        "A token-validation service alone does not secure an endpoint. It must be used by an authentication mechanism that validates the bearer token and establishes an authenticated principal only after successful validation.",
        "For standard JWT APIs, Spring Security OAuth2 Resource Server is usually a suitable choice. It integrates bearer-token extraction, decoder validation, authentication creation, and security failure handling with the Spring Security filter chain.",
        "If a custom filter is necessary, it must avoid trusting claims before validation, must not accept unsupported algorithms, and must handle token-validation failures safely. It should also avoid swallowing unrelated exceptions or allowing an invalid token to produce an authenticated SecurityContext.",
        "Avoid implementing two independent JWT authentication paths for the same request unless their responsibilities are deliberately defined. Duplicated validation logic can produce inconsistent behavior."
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
        "The Resource Server configuration requires an appropriate JwtDecoder.",
        "The decoder must verify tokens using trusted key or issuer configuration.",
        "Configure issuer, audience, and additional claim validation according to the token contract.",
        "Authentication must be established only after successful validation.",
        "Authorization rules remain necessary after a token has been validated.",
        "A custom filter should not bypass the framework's authentication failure handling."
      ]
    },
    {
      id: "testing",
      title: "Testing JWT Validation",
      paragraphs: [
        "A JWT validator should be tested with both valid and invalid tokens. Successful parsing of one valid token is not enough to demonstrate that the validation policy is complete.",
        "Tests should verify that changing the payload without recomputing a valid signature causes rejection, that an expired token is rejected, and that incorrect issuer or audience claims are rejected when those claims are required.",
        "Also test missing mandatory claims. For example, if exp is required, create a correctly signed test token without exp and confirm that the application rejects it. This catches the difference between a claim that is present but expired and a claim that is absent.",
        "Use test keys and test identities for automated tests. Do not place production signing secrets in test fixtures, logs, or source control."
      ],
      bullets: [
        "A valid signature and acceptable claims are accepted.",
        "A token with a modified payload and invalid signature is rejected.",
        "An expired token is rejected.",
        "A token with an unexpected issuer is rejected.",
        "A token with an unexpected audience is rejected when audience validation is required.",
        "A token missing a required subject is rejected.",
        "A token missing a required expiration is rejected.",
        "A token presented before its nbf time is rejected.",
        "Invalid tokens never establish an authenticated principal.",
        "Security errors do not expose raw tokens or signing-key material."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common JWT Validation Mistakes",
      paragraphs: [
        "JWT validation failures often result from confusing decoding with verification, trusting token claims too early, or relying on a library's default behavior without defining which claims the application requires."
      ],
      bullets: [
        "Decoding a JWT and trusting its payload without verifying the signature.",
        "Accepting any algorithm specified by an untrusted token header.",
        "Using the wrong key or an inadequately protected signing secret.",
        "Checking expiration only when present while assuming it is mandatory.",
        "Verifying the issuer but forgetting the audience when the API requires audience restriction.",
        "Trusting a subject or role claim before successful validation.",
        "Assuming a jti claim automatically revokes or prevents replay of a token.",
        "Returning raw JWT parser errors to the client.",
        "Logging full tokens or Authorization headers.",
        "Treating every failure as HTTP 403 instead of distinguishing authentication from authorization.",
        "Assuming a validation helper secures endpoints even when no authentication mechanism invokes it."
      ]
    },
    {
      id: "best-practices",
      title: "JWT Validation Best Practices",
      paragraphs: [
        "Define a token acceptance policy before implementing validation. Decide which issuer, audience, signing algorithms, keys, and claims are trusted, which claims are mandatory, and how token expiration and revocation are handled.",
        "Use a maintained JWT library or Spring Security Resource Server support, keep verification material secure, and reject tokens that do not satisfy the full policy. Treat every claim as untrusted input until cryptographic and application-level validation has succeeded."
      ],
      bullets: [
        "Use trusted keys and explicitly restrict acceptable signing algorithms.",
        "Validate the signature before trusting claims.",
        "Require expiration for access tokens when mandated by the application.",
        "Validate issuer and audience according to the token contract.",
        "Check subject and other mandatory claims for presence and acceptable values.",
        "Validate not-before and any additional time-based restrictions.",
        "Keep token lifetimes short enough for the application's security requirements.",
        "Use secure key rotation and trusted key selection where multiple keys are supported.",
        "Avoid sensitive personal or confidential information in readable JWT claims.",
        "Use framework-supported authentication failure handling.",
        "Plan token revocation and refresh-token lifecycle separately from signature validation.",
        "Test missing claims and malformed tokens as well as expired tokens."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "How does a server validate a JWT?",
          answer: "It parses the token, verifies the signature using a trusted key and acceptable algorithm, validates required time-based claims, and checks claims such as issuer, audience, and subject according to the application's token policy."
        },
        {
          question: "What is the difference between decoding and validating a JWT?",
          answer: "Decoding reads the token's contents. Validation verifies that the token is acceptable, including signature verification and required claim checks. Decoding alone does not prove authenticity."
        },
        {
          question: "What happens when a JWT expires?",
          answer: "The API rejects the token as an authentication credential. If the application supports a refresh flow, the client may use a valid refresh token to obtain a new access token."
        },
        {
          question: "What does the exp claim represent?",
          answer: "It specifies the expiration time as a NumericDate. The token must not be accepted after that time, subject to any deliberately configured clock-skew policy."
        },
        {
          question: "Why must an application check whether exp is present?",
          answer: "A parser can reject an expired exp value when the claim exists, but absence of exp does not necessarily mean that the token is expired. If expiration is mandatory, the application must require the claim."
        },
        {
          question: "What is the difference between iss and aud?",
          answer: "iss identifies who issued the token. aud identifies the intended recipient or recipients. Both may need validation to ensure the token comes from a trusted issuer and is intended for the current API."
        },
        {
          question: "What happens if someone modifies a signed JWT payload?",
          answer: "The signature will no longer match the modified signed content, so a correct verifier using the trusted key rejects the token."
        },
        {
          question: "Does a valid JWT signature mean that the user can access every endpoint?",
          answer: "No. Signature verification establishes token integrity and authenticity under the trust model. The application must also validate required claims and apply authorization rules."
        },
        {
          question: "What is the purpose of the nbf claim?",
          answer: "It specifies the time before which the token must not be accepted. A token presented too early should be rejected."
        },
        {
          question: "Does the jti claim revoke a JWT?",
          answer: "No. It identifies a token but does not revoke it by itself. Revocation requires an additional mechanism, such as a denylist or centralized token-state check."
        },
        {
          question: "How should invalid JWTs be handled in Spring Security?",
          answer: "They must not establish authentication. A protected bearer-token endpoint normally returns 401 through the configured authentication failure mechanism, without exposing internal parser details."
        },
        {
          question: "What is the difference between HTTP 401 and HTTP 403?",
          answer: "401 normally indicates missing or invalid authentication. 403 normally indicates that an authenticated principal lacks the required permission."
        },
        {
          question: "Why is audience validation useful?",
          answer: "It helps ensure that a token issued for one application or API is not accepted by another service that is not an intended recipient."
        },
        {
          question: "How can JWT validation be implemented in Spring Security?",
          answer: "A common approach is Spring Security OAuth2 Resource Server with a configured JwtDecoder. A custom filter is another option, but it must implement trusted verification, claim checks, authentication establishment, and failure handling correctly."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "A JWT should be trusted only after its signature and required claims have been validated. Successful decoding alone is not authentication, and a valid signature alone is not authorization."
      ],
      bullets: [
        "Signature verification: checks signed-content integrity and authenticity under the configured key trust model.",
        "exp: expiration time.",
        "nbf: earliest acceptable time.",
        "iss: expected issuer.",
        "aud: intended recipient.",
        "sub: token subject.",
        "iat: issue time; additional age policies must be implemented explicitly.",
        "jti: token identifier, not automatic revocation.",
        "Missing mandatory claims must be rejected explicitly.",
        "Invalid bearer token: normally 401 Unauthorized.",
        "Authenticated principal without permission: normally 403 Forbidden.",
        "Use validated claims only after parsing and validation succeed."
      ]
    }
  ]
};
