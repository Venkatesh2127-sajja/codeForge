
export const jwtStructureAndClaims = {
  id: 1202,
  title: "JWT Structure and Claims",
  slug: "jwt-structure-and-claims",
  topicTitle: "JWT Authentication",
  description:
    "Understand JWT headers, payloads, signatures, registered claims, custom claims, Base64URL encoding, and secure token validation in Spring Boot.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "three-parts",
      title: "The Three Parts of a JWT",
      paragraphs: [
        "JWT stands for JSON Web Token. It is a compact format for carrying claims between parties. A commonly used signed JWT has three Base64URL-encoded parts separated by periods: the header, payload, and signature.",
        "The header describes token metadata, including the signing algorithm. The payload contains claims about the subject and the token's intended use. The signature allows a verifier to detect modification and verify that the token was signed using an appropriate trusted key.",
        "A signed JWT commonly follows the structure header.payload.signature. The encoded header and payload are not encrypted merely because they are Base64URL-encoded. Anyone who possesses the token can generally decode and read these sections.",
        "A JWT can also be encrypted using a different JWT format called JWE. Do not confuse a signed JWT (JWS) with an encrypted JWT (JWE). Many Spring Security bearer-token implementations use signed JWT access tokens."
      ],
      code: {
        language: "text",
        code: `HEADER.PAYLOAD.SIGNATURE
   |       |        |
   |       |        +-- Verifies integrity and signature
   |       +----------- Carries claims
   +------------------- Identifies token metadata`
      },
      bullets: [
        "Header: token metadata, including the signing algorithm.",
        "Payload: subject, timestamps, and other claims.",
        "Signature: cryptographic protection against undetected modification.",
        "Periods separate the three compact JWS segments.",
        "Base64URL encoding is not encryption.",
        "Never put passwords or confidential information in readable JWT claims."
      ]
    },
    {
      id: "jwt-encoding",
      title: "Base64URL Encoding",
      paragraphs: [
        "JWT compact serialization uses Base64URL encoding for the header and payload. Base64URL is designed to be safe in URLs and uses a different character mapping from ordinary Base64. Padding characters may be omitted in the compact representation.",
        "For example, a JSON header such as {\"alg\":\"HS256\",\"typ\":\"JWT\"} is converted to UTF-8 bytes and then Base64URL-encoded. The payload JSON is encoded in the same way.",
        "Encoding changes how data is represented; it does not conceal the information. A person who receives a token can decode the header and payload without knowing the signing key. The key is required for signature verification, not for reading ordinary JWT claims."
      ],
      code: {
        language: "text",
        code: `JSON header
{"alg":"HS256","typ":"JWT"}
          |
          v
Base64URL encoding
          |
          v
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

JSON payload
{"sub":"user-123"}
          |
          v
Base64URL encoding
          |
          v
eyJzdWIiOiJ1c2VyLTEyMyJ9`
      },
      bullets: [
        "Base64URL is an encoding format, not a security mechanism.",
        "Do not manually modify an encoded JWT and expect its signature to remain valid.",
        "The encoded header and payload are inputs to the signature calculation.",
        "The signature cannot be recreated without the appropriate signing key.",
        "Use a JWT library instead of implementing compact serialization and signature verification yourself."
      ]
    },
    {
      id: "header",
      title: "Understanding the JWT Header",
      paragraphs: [
        "The header is a JSON object containing metadata about the token. The alg field identifies the signing algorithm, while typ may identify the token type, commonly as JWT.",
        "A header may also contain a kid field, which can help a verifier select a key from a trusted key set. The kid value is not itself proof that the key is trusted. The verifier must obtain the selected key from a trusted source and enforce its own algorithm policy.",
        "Applications should not allow an untrusted token to choose arbitrary verification algorithms or arbitrary key locations. The server's security configuration determines which algorithms and keys are accepted."
      ],
      code: {
        language: "json",
        code: `{
  "alg": "HS256",
  "typ": "JWT"
}`
      },
      bullets: [
        "alg: identifies the algorithm used to protect the token.",
        "typ: may indicate the token type.",
        "kid: optional key identifier used with a trusted key-selection process.",
        "The header is readable and must not be trusted before token validation.",
        "Do not accept an algorithm solely because it appears in alg.",
        "Do not fetch arbitrary keys from URLs supplied by untrusted token headers."
      ]
    },
    {
      id: "payload",
      title: "Understanding the JWT Payload",
      paragraphs: [
        "The payload contains claims. A claim is a statement about a subject, the token, or the context in which the token is intended to be used.",
        "A payload can contain standardized registered claims, application-defined custom claims, or both. For example, sub may identify the user, exp may indicate the expiration time, and role may be an application-defined claim.",
        "Because the payload of a typical signed JWT is readable, avoid including passwords, secret keys, payment details, or other sensitive data. Claims should contain only the information required by the token's intended purpose.",
        "Claims should be treated as trustworthy only after the signature and required validation rules succeed. Reading JSON from an unverified token does not authenticate the user."
      ],
      code: {
        language: "json",
        code: `{
  "sub": "user-123",
  "iss": "codeforge-api",
  "aud": "codeforge-client",
  "iat": 1791288000,
  "exp": 1791288900,
  "role": "USER"
}`
      },
      bullets: [
        "Registered claims have standardized names and meanings.",
        "Custom claims are defined by the application or token profile.",
        "Keep claims minimal and relevant.",
        "Do not assume a claim is true until the token is validated.",
        "Do not expose sensitive data simply because it is convenient to include it in a token."
      ]
    },
    {
      id: "claims",
      title: "Common JWT Claims",
      paragraphs: [
        "Registered claims are standardized claim names defined by the JWT specification. Applications can use them to express the token subject, issuer, audience, and validity period.",
        "The standard defines the meaning of these claims, but whether a particular claim is mandatory depends on the application or token profile. For example, an API commonly requires issuer and audience validation when its token contract defines those values.",
        "Custom claims such as role, department, or tenantId are application-specific. They should have clearly defined meanings and must be interpreted only after successful token validation."
      ],
      code: {
        language: "json",
        code: `{
  "iss": "https://identity.example.com",
  "sub": "user-123",
  "aud": ["codeforge-api"],
  "exp": 1791288900,
  "nbf": 1791288000,
  "iat": 1791288000,
  "jti": "token-unique-id",
  "role": "USER"
}`
      },
      bullets: [
        "iss — issuer: identifies the authority that issued the token.",
        "sub — subject: identifies the principal the token refers to.",
        "aud — audience: identifies the intended recipient or recipients.",
        "exp — expiration: identifies the time after which the token must not be accepted.",
        "nbf — not before: identifies the time before which the token must not be accepted.",
        "iat — issued at: records when the token was issued.",
        "jti — JWT ID: identifies a particular token and can support tracking or revocation designs.",
        "role — example custom claim representing an application-defined role."
      ]
    },
    {
      id: "registered-claims-details",
      title: "Registered Claims in Detail",
      paragraphs: [
        "The issuer claim, iss, helps the API determine whether a token came from the expected issuer. The verifier should compare it against the configured trusted issuer rather than trusting the value supplied in the token.",
        "The subject claim, sub, identifies the principal. Use a stable identifier where possible so a change to a display name does not unexpectedly change identity mapping.",
        "The audience claim, aud, identifies the intended recipient or recipients. A token issued for one API should not automatically be accepted by an unrelated API. Audience validation helps prevent tokens intended for one service from being used at another.",
        "The exp and nbf claims establish time boundaries. A verifier should reject expired tokens and tokens that are not yet valid, subject to an intentionally configured clock-skew allowance where appropriate.",
        "The iat claim records the issue time. It does not replace exp, and it should not be treated as proof that the token is currently valid.",
        "The jti claim provides a token identifier. It can be used in a revocation system, but including jti alone does not revoke a token; the server must maintain and check the corresponding state if immediate revocation is required."
      ],
      bullets: [
        "Use the issuer expected by your application.",
        "Validate the audience expected by the protected API.",
        "Validate exp and nbf where applicable.",
        "Do not assume iat alone makes a token valid.",
        "Use jti with a defined tracking or revocation strategy when needed.",
        "Document which claims are required by your application's token contract."
      ]
    },
    {
      id: "custom-claims",
      title: "Custom Claims",
      paragraphs: [
        "Custom claims carry application-specific information that is not represented by a registered claim. Examples include a role, tenant identifier, organization ID, or application-specific permission indicator.",
        "Custom claim names and values must have consistent meanings across the token issuer and the services that consume the token. A role named ADMIN in one system should not accidentally mean a different permission level in another.",
        "Custom claims can become stale. If a token contains a user's role and the role changes after token issuance, the old role may remain in the token until expiration unless the application uses additional checks or revocation mechanisms.",
        "Include only claims that are needed. A JWT is carried with requests, so a large payload increases request size and can expose more information if the token is leaked."
      ],
      code: {
        language: "json",
        code: `{
  "sub": "user-123",
  "role": "USER",
  "tenantId": "tenant-42",
  "scope": "profile:read orders:read"
}`
      },
      bullets: [
        "Define custom claim names and formats consistently.",
        "Validate claim types and expected values before using them.",
        "Do not treat a custom claim as authorization unless the API has validated the token and the claim is appropriate for that decision.",
        "Avoid putting confidential personal or business data in claims.",
        "Consider how role or permission changes affect already issued tokens."
      ]
    },
    {
      id: "signature",
      title: "How the JWT Signature Works",
      paragraphs: [
        "For a signed JWT using the compact JWS format, the signature protects the encoded header and encoded payload. The signed input is the header segment, a period, and the payload segment.",
        "With an HMAC algorithm such as HS256, the issuer computes a message authentication code using the encoded segments and a shared secret. A verifier with the appropriate secret recomputes the value and verifies the signature.",
        "With an asymmetric algorithm such as RS256, the issuer signs using a private key and the verifier checks the signature using the corresponding public key.",
        "If someone changes the subject or role in the payload without producing a valid new signature, signature verification should fail. However, a valid signature alone is not enough: the application must also check the claims and enforce authorization."
      ],
      code: {
        language: "text",
        code: `Signing input:
BASE64URL(header) + "." + BASE64URL(payload)
                     |
                     v
             Signing algorithm
                     |
                     v
                  Signature

Compact signed token:
header.payload.signature`
      },
      bullets: [
        "The signature detects modification to the protected header and payload.",
        "HS256 uses a shared secret.",
        "RS256 uses a private key to sign and a public key to verify.",
        "Signature verification does not encrypt the payload.",
        "A valid signature does not automatically make every claim acceptable.",
        "Use trusted keys and an explicit algorithm policy."
      ]
    },
    {
      id: "validation",
      title: "What Must Be Validated?",
      paragraphs: [
        "A backend must verify the signature with a trusted key and allow only the expected signing algorithm. It should also validate expiration and, when applicable, issuer and audience.",
        "Additional checks depend on the token contract. These may include not-before, permitted token type, required scopes, or other constraints. Authentication and authorization rules must be consistent with the API's intended security model.",
        "Do not trust a decoded payload merely because its JSON can be read. Decoding and cryptographic validation are different operations. A token can contain well-formed JSON while having an invalid signature or unacceptable claims."
      ],
      code: {
        language: "text",
        code: `Receive bearer token
        |
        v
Parse token structure
        |
        v
Verify signature with trusted key
        |
        v
Check permitted algorithm
        |
        v
Validate expiration and not-before
        |
        v
Validate issuer and audience
        |
        v
Create authenticated principal
        |
        v
Check endpoint and resource permissions`
      },
      bullets: [
        "Reject expired tokens.",
        "Validate issuer and audience when required by your token design.",
        "Reject tokens signed with unexpected algorithms or untrusted keys.",
        "Validate not-before and other required claims.",
        "Do not trust decoded claims before verification succeeds.",
        "Do not place passwords or confidential data in claims.",
        "Apply authorization checks after authentication."
      ]
    },
    {
      id: "spring-boot-example",
      title: "Read a JWT Subject in Spring Boot with JJWT",
      paragraphs: [
        "The following example demonstrates parsing a signed JWT with JJWT 0.12.x. The application must supply a trusted verification key and validate the token according to its issuer, audience, and other requirements.",
        "The example verifies the signature and uses the parser's expiration handling. It then reads the subject from the validated claims. It assumes that signing-key configuration has already been securely established.",
        "For an API already using Spring Security OAuth2 Resource Server, prefer its authentication integration when it meets the application's needs. In that architecture, application code commonly receives a validated Jwt or authenticated principal instead of manually parsing the Authorization header."
      ],
      code: {
        language: "java",
        code: `import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class JwtClaimsReader {

    private final SecretKey verificationKey;

    public JwtClaimsReader(SecretKey verificationKey) {
        this.verificationKey = verificationKey;
    }

    public Claims validateAndReadClaims(String token) {
        Jws<Claims> parsed = Jwts.parser()
            .verifyWith(verificationKey)
            .build()
            .parseSignedClaims(token);

        return parsed.getPayload();
    }

    public String readSubject(String token) {
        return validateAndReadClaims(token).getSubject();
    }
}`
      },
      bullets: [
        "Pass the raw compact JWT to the parser, not the full string 'Bearer ...'.",
        "The verification key must be trusted and must match the token's signing configuration.",
        "JJWT rejects invalid signatures and expired tokens during parsing.",
        "Add issuer and audience validation when required by your token contract.",
        "Handle malformed, expired, and invalid tokens through a controlled authentication error path.",
        "Do not expose parser exceptions, secrets, or token contents in API responses."
      ]
    },
    {
      id: "decode-vs-validate",
      title: "Decoding vs Validating a JWT",
      paragraphs: [
        "Decoding extracts the encoded header and payload so that their JSON contents can be read. It does not prove that the token was issued by a trusted party or that its contents are unchanged.",
        "Validation verifies the token's cryptographic protection and checks the relevant claims and token rules. A backend must use validated claims for authentication decisions.",
        "For example, a person can change an encoded payload from role USER to role ADMIN and re-encode the JSON. The result may still look like a valid three-part token, but its original signature will no longer match the changed signing input."
      ],
      bullets: [
        "Decoding answers: what data is represented in the token?",
        "Validation answers: can the application trust this token under its configured rules?",
        "Never use unverified role, user ID, or permission claims for access decisions.",
        "A token's readable structure does not prove its authenticity.",
        "Signature verification and claim validation must both succeed before protected access is granted."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common JWT Structure and Claims Mistakes",
      paragraphs: [
        "JWT errors often come from misunderstanding what a claim means or assuming that a signed token is automatically safe to use. Correctly interpreting the token format is only one part of securing an API."
      ],
      bullets: [
        "Assuming Base64URL encoding hides the payload.",
        "Treating a decoded JWT as an authenticated identity.",
        "Trusting a role claim before validating the signature.",
        "Ignoring the audience claim when tokens can be issued for multiple APIs.",
        "Using iat as a replacement for exp.",
        "Assuming jti automatically enables revocation without server-side state.",
        "Putting passwords, signing keys, or confidential information in the payload.",
        "Accepting an unexpected signing algorithm.",
        "Assuming a valid signature means the caller is authorized for every resource.",
        "Allowing old role claims to remain authoritative indefinitely after permissions change.",
        "Returning raw token-validation exceptions or sensitive token details to clients."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What are the three parts of a JWT?",
          answer: "A common signed JWT has a header, payload, and signature. The header contains token metadata, the payload contains claims, and the signature protects the encoded header and payload against undetected modification."
        },
        {
          question: "What is the exp claim?",
          answer: "It represents the expiration time as a NumericDate, measured in seconds since the Unix epoch. A token past its expiration must not be accepted, subject to any deliberately configured clock-skew allowance."
        },
        {
          question: "What is the difference between decoding and validating a JWT?",
          answer: "Decoding reads the token's contents. Validation verifies its cryptographic protection and checks relevant claims and token rules. Authentication decisions must use validated claims."
        },
        {
          question: "What is the difference between a JWT header and payload?",
          answer: "The header contains token metadata, such as the signing algorithm. The payload contains claims, such as the subject, issuer, audience, and expiration."
        },
        {
          question: "Is a JWT payload encrypted?",
          answer: "Not in an ordinary signed JWT. The header and payload are Base64URL-encoded and generally readable by anyone who possesses the token. Encryption requires a suitable encrypted-token design such as JWE."
        },
        {
          question: "What does the sub claim represent?",
          answer: "The sub claim identifies the subject of the token, commonly the authenticated user or another principal. Applications should use a consistent identity-mapping strategy."
        },
        {
          question: "What is the difference between iss and aud?",
          answer: "iss identifies who issued the token, while aud identifies the intended recipient or recipients. An API should validate these values according to its trusted token contract."
        },
        {
          question: "What are registered and custom claims?",
          answer: "Registered claims have standardized meanings, such as sub, iss, aud, and exp. Custom claims are application-defined values, such as role or tenantId, whose meanings must be agreed upon by the issuer and consumers."
        },
        {
          question: "What is the iat claim?",
          answer: "iat records when the token was issued. It does not replace expiration validation or independently prove that the token is currently valid."
        },
        {
          question: "What is the nbf claim?",
          answer: "nbf specifies the time before which a token must not be accepted. A verifier should reject a token that is not yet valid under its configured clock-skew policy."
        },
        {
          question: "What is the jti claim?",
          answer: "jti is a JWT identifier. It can help track individual tokens or support a revocation system, but revocation requires server-side logic that checks the identifier or associated state."
        },
        {
          question: "What happens if someone changes the role claim in a signed JWT?",
          answer: "Changing the payload changes the signing input, so the original signature should no longer verify. The API must verify the signature before trusting role claims."
        },
        {
          question: "What is the difference between HS256 and RS256?",
          answer: "HS256 uses a shared secret for signing and verification. RS256 uses an RSA private key to sign and a corresponding public key to verify."
        },
        {
          question: "Does a valid signature guarantee that a token should be accepted?",
          answer: "No. The API must also validate the token's relevant claims, such as expiration, issuer, and audience, and then apply authorization rules for the requested resource."
        },
        {
          question: "Why should JWT claims be kept small?",
          answer: "Tokens are often sent with API requests. Large claims increase request size, may expose unnecessary information, and can make token handling less efficient."
        },
        {
          question: "What happens when a user's role changes after token issuance?",
          answer: "A role embedded in a previously issued token may remain unchanged until that token expires. Systems requiring faster permission changes can use shorter token lifetimes, revocation checks, or current server-side authorization data."
        },
        {
          question: "How does Spring Boot validate JWTs?",
          answer: "In a custom JJWT implementation, application code parses the token, verifies its signature, and checks required claims. With Spring Security OAuth2 Resource Server, the framework integrates bearer-token validation and authentication into the security filter chain."
        },
        {
          question: "Why should an API validate the audience?",
          answer: "Audience validation helps ensure that a token is intended for the API receiving it. It prevents a token intended for an unrelated service from being accepted merely because it was signed by a trusted issuer."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "A JWT is a compact token format that carries claims. For a common signed JWT, the three segments are the header, payload, and signature. Secure processing requires more than decoding the token: the backend must verify its signature, validate relevant claims, and enforce authorization."
      ],
      bullets: [
        "JWT means JSON Web Token.",
        "Header: metadata such as alg and optionally kid.",
        "Payload: registered claims and custom claims.",
        "Signature: verifies integrity and authenticity using a trusted key.",
        "Base64URL encoding is not encryption.",
        "exp defines token expiration; iat records issue time.",
        "iss identifies the issuer; aud identifies intended recipients.",
        "sub identifies the subject; jti identifies a particular token.",
        "Custom claims must be validated and interpreted according to the application's rules.",
        "Never trust claims before successful token validation.",
        "Authentication and authorization are separate responsibilities."
      ]
    }
  ]
};
