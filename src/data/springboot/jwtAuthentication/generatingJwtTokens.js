
export const generatingJwtTokens = {
  id: 1205,
  title: "Generating JWT Tokens",
  slug: "generating-jwt-tokens",
  topicTitle: "JWT Authentication",
  description:
    "Learn how to generate signed JWT access tokens in Spring Boot after successful authentication, configure signing keys, define claims and expiration, integrate token generation into login, and test the implementation securely.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "service",
      title: "1. Create a JWT Service",
      paragraphs: [
        "A JWT service is responsible for creating signed JSON Web Tokens. In a Spring Boot application, it commonly generates an access token after the user's credentials have been verified successfully.",
        "The JWT service should receive an already authenticated subject. It must not treat an arbitrary user ID, role, or other identity claim supplied by the client as trusted information. The authentication layer establishes the identity, and the token service creates a token for that verified identity.",
        "A signed JWT normally contains three parts separated by dots: a header, a payload, and a signature. The header identifies information such as the token type and signing algorithm. The payload contains claims, and the signature helps the recipient verify that the token has not been modified and was signed with an appropriate key.",
        "This example uses JJWT 0.12.x and the HS256 signing algorithm. HS256 uses HMAC-SHA-256, which relies on a shared secret key. The issuer and resource server must have access to the appropriate trusted key material to sign and verify tokens.",
        "The subject claim identifies the principal represented by the token. Use a stable user identifier, such as a database user ID or a stable username, according to the application's identity design. Avoid using a value that can change unexpectedly.",
        "The expiration claim defines when the token stops being valid. This example defaults to a 15-minute access-token lifetime, but the actual lifetime should be selected according to the application's security requirements."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long accessTokenMinutes;

    public JwtService(
            SecretKey signingKey,
            @Value("\${app.jwt.access-token-minutes:15}")
            long accessTokenMinutes) {

        if (accessTokenMinutes <= 0) {
            throw new IllegalArgumentException(
                "Access token lifetime must be positive"
            );
        }

        this.signingKey = signingKey;
        this.accessTokenMinutes = accessTokenMinutes;
    }

    public String generateAccessToken(String userId) {
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException(
                "Authenticated user ID is required"
            );
        }

        Instant now = Instant.now();
        Instant expiry = now.plus(
            accessTokenMinutes,
            ChronoUnit.MINUTES
        );

        return Jwts.builder()
                .subject(userId)
                .issuer("codeforge-api")
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }
}`
      },
      bullets: [
        "@Service registers JwtService as a Spring-managed component.",
        "Constructor injection supplies the signing key and token lifetime.",
        "sub identifies the authenticated subject.",
        "iss identifies the token issuer.",
        "iat records when the token was issued.",
        "exp defines when the token expires.",
        "signWith signs the token using HS256.",
        "compact() produces the serialized JWT string.",
        "The key must be strong enough for HS256, and token generation should occur only after successful authentication."
      ],
      output: "The method returns a signed JWT string. The token can then be returned to an authenticated client and sent to protected APIs as a bearer token."
    },
    {
      id: "jwt-structure",
      title: "2. Understand the JWT Structure",
      paragraphs: [
        "A compact JWT has three parts: header, payload, and signature. The serialized form joins these parts with a dot character.",
        "The header describes the token's cryptographic algorithm and token type. The payload contains claims, such as the subject, issuer, issue time, and expiration. The signature is generated using the encoded header and payload together with the signing key.",
        "Base64URL encoding is used to represent the header and payload. Encoding is not encryption, so anyone who obtains a typical signed JWT can decode and read its claims. Never include passwords, private keys, or confidential personal information in an ordinary JWT payload.",
        "A signature protects token integrity, but it does not make every claim automatically trustworthy. The receiver must validate the signature with trusted key material and check the claims required by its security policy."
      ],
      code: {
        language: "text",
        code: "header.payload.signature\n\nHeader example:\n{\n  \"alg\": \"HS256\",\n  \"typ\": \"JWT\"\n}\n\nPayload example:\n{\n  \"sub\": \"user-123\",\n  \"iss\": \"codeforge-api\",\n  \"iat\": 1791374400,\n  \"exp\": 1791375300\n}\n\nSignature:\nCreated from the encoded header and payload using the\nconfigured signing algorithm and secret key."
      },
      bullets: [
        "Header: identifies the signing algorithm and token type.",
        "Payload: contains registered and application-specific claims.",
        "Signature: helps detect tampering and verify the signer.",
        "A signed JWT is not automatically encrypted.",
        "Never trust decoded claims until the token has been validated."
      ]
    },
    {
      id: "key-bean",
      title: "3. Create the Signing Key Bean",
      paragraphs: [
        "Spring needs a SecretKey bean so that JwtService can receive its signing key through constructor injection. The configuration below reads a Base64-encoded secret, decodes it into the original key bytes, and creates an HMAC key.",
        "Base64 is only an encoding format. It does not make a weak secret strong. Generate a cryptographically random key with sufficient entropy, encode its bytes as Base64, and store the encoded value in a protected configuration source.",
        "HS256 requires a key of at least 256 bits, or 32 bytes. Keys.hmacShaKeyFor validates the key size for supported HMAC algorithms and rejects keys that are too short. The explicit HS256 selection in JwtService also means the key must meet the HS256 requirements.",
        "The application should fail to start if the required key is absent, malformed, or too weak. Do not use a predictable string such as password123, a username, or a key copied from a tutorial."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtKeyConfiguration {

    @Bean
    SecretKey jwtSigningKey(
            @Value("\${app.jwt.secret-base64}")
            String secretBase64) {

        byte[] keyBytes = Decoders.BASE64.decode(secretBase64);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}`
      },
      paragraphs: [
        "This bean is created once by Spring and injected into the JWT service. Because the key is shared cryptographic material, anyone who can access it may be able to generate tokens that pass verification by systems trusting that key.",
        "For production, supply the Base64 secret through an environment variable, secrets manager, or another protected configuration mechanism. Keep it out of source control and rotate it through a planned key-management process."
      ],
      bullets: [
        "Generate at least 32 bytes of cryptographically random key material for HS256.",
        "Store the Base64 representation securely.",
        "Do not commit real signing keys to Git.",
        "Do not generate a new signing key on every application startup unless invalidating all existing tokens is intended.",
        "Use a separate key for each security environment.",
        "If multiple independent services verify tokens, evaluate whether asymmetric signing is more appropriate than sharing one HMAC secret."
      ]
    },
    {
      id: "application-configuration",
      title: "4. Configure application.yml",
      paragraphs: [
        "The JWT service needs configuration for the signing key and access-token lifetime. The following YAML declares the property names used in the Java examples.",
        "The secret value should be injected from the environment rather than written directly into a committed configuration file. The placeholder below deliberately has no default for the signing key, so the application cannot silently fall back to an insecure key.",
        "The lifetime property has a default of 15 minutes in the service constructor. You can override it through configuration for a particular environment, provided the selected value is positive and complies with your session policy."
      ],
      code: {
        language: "yaml",
        code: "app:\n  jwt:\n    secret-base64: ${JWT_SECRET_BASE64}\n    access-token-minutes: 15"
      },
      bullets: [
        "JWT_SECRET_BASE64 should contain a Base64-encoded, randomly generated key.",
        "Do not use a sample or tutorial secret in production.",
        "Use different keys for development, testing, and production.",
        "Ensure the deployment environment supplies the required variable.",
        "A configuration placeholder does not generate or strengthen the secret automatically."
      ]
    },
    {
      id: "maven-dependencies",
      title: "5. Add the JJWT Dependencies",
      paragraphs: [
        "The JJWT library provides APIs for building, signing, parsing, and validating JSON Web Tokens. In JJWT 0.12.x, use the API, implementation, and JSON integration modules together.",
        "The API module provides the types used by application code. The implementation module provides the runtime implementation, while the Jackson integration supports JSON serialization and deserialization.",
        "Keep the JJWT module versions aligned. The following example uses version 0.12.6; use a compatible, maintained version approved for your project rather than mixing different JJWT versions."
      ],
      code: {
        language: "xml",
        code: "<dependencies>\n    <dependency>\n        <groupId>io.jsonwebtoken</groupId>\n        <artifactId>jjwt-api</artifactId>\n        <version>0.12.6</version>\n    </dependency>\n\n    <dependency>\n        <groupId>io.jsonwebtoken</groupId>\n        <artifactId>jjwt-impl</artifactId>\n        <version>0.12.6</version>\n        <scope>runtime</scope>\n    </dependency>\n\n    <dependency>\n        <groupId>io.jsonwebtoken</groupId>\n        <artifactId>jjwt-jackson</artifactId>\n        <version>0.12.6</version>\n        <scope>runtime</scope>\n    </dependency>\n</dependencies>"
      },
      bullets: [
        "Use the same version for all JJWT modules.",
        "The API dependency is available at compile time.",
        "The implementation and Jackson modules are normally runtime dependencies.",
        "After updating pom.xml, reload Maven dependencies in your IDE.",
        "Use a compatible version and review dependency security updates as part of maintenance."
      ]
    },
    {
      id: "claims",
      title: "6. Add Claims to the JWT",
      paragraphs: [
        "Claims are statements about the subject or token. JWT defines registered claims such as sub, iss, aud, exp, nbf, iat, and jti. Applications may also define custom claims when needed.",
        "The subject should identify the authenticated user. The issuer identifies the trusted authority that created the token. The audience identifies the intended recipient or recipients. Expiration limits the token's validity period.",
        "Custom claims can represent application-specific information, such as a tenant identifier or a small set of authorities. Only include claims the receiver needs. Claims in a signed JWT are generally readable, so do not place secrets or sensitive data in them.",
        "Claims must be derived from trusted server-side identity and authorization data. Never allow a login request to choose its own role by sending a value such as ADMIN in the request body."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.security;

import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
public class JwtClaimsExample {

    private final SecretKey signingKey;

    public JwtClaimsExample(SecretKey signingKey) {
        this.signingKey = signingKey;
    }

    public String generateToken(
            String userId,
            List<String> trustedAuthorities) {

        Instant now = Instant.now();
        Instant expiry = now.plus(15, ChronoUnit.MINUTES);

        return Jwts.builder()
                .subject(userId)
                .issuer("codeforge-api")
                .audience()
                    .add("codeforge-api")
                    .and()
                .claim("authorities", trustedAuthorities)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }
}`
      },
      bullets: [
        "sub: subject identifier.",
        "iss: issuer identifier.",
        "aud: intended audience.",
        "iat: token issuance time.",
        "exp: expiration time.",
        "jti: optional unique token identifier.",
        "authorities: an application-specific claim in this example, not a universal JWT claim.",
        "The authorities passed to the example must come from trusted server-side authentication data."
      ],
      output: "The generated token contains the subject, issuer, audience, issue time, expiration, and the supplied authorities claim. The receiver must validate the token and interpret its authorities according to the application's security configuration."
    },
    {
      id: "login-integration",
      title: "7. Generate the JWT After Login",
      paragraphs: [
        "Token generation should happen only after the authentication process succeeds. In Spring Security, AuthenticationManager can validate submitted credentials using the configured authentication providers.",
        "A login controller receives the credentials and passes them to AuthenticationManager. If authentication fails, the framework throws an authentication exception and the application must not issue an access token. If authentication succeeds, the returned Authentication represents the authenticated principal.",
        "The example below shows the main flow using constructor injection. It uses the authenticated principal's name as the subject; in a real application, use the stable identifier required by your identity design.",
        "This is a simplified login example. A complete implementation should use validated request DTOs, a suitable authentication configuration, rate limiting where appropriate, secure transport, and a deliberate response and error contract."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.auth;

import com.codeforge.security.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginController(
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        Authentication authentication =
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.username(),
                    request.password()
                )
            );

        String userId = authentication.getName();
        String accessToken =
            jwtService.generateAccessToken(userId);

        return ResponseEntity.ok(
            new LoginResponse(accessToken, "Bearer")
        );
    }

    public record LoginRequest(
        String username,
        String password
    ) {}

    public record LoginResponse(
        String accessToken,
        String tokenType
    ) {}
}`
      },
      bullets: [
        "AuthenticationManager validates the supplied credentials.",
        "The JWT service is called only after authentication succeeds.",
        "Authentication failure must not result in token issuance.",
        "In a real application, ensure the subject is the stable user identifier required by the API.",
        "If roles or authorities are included in the JWT, obtain them from the authenticated principal or another trusted server-side source.",
        "Configure the authentication provider and password encoder appropriately for your application."
      ]
    },
    {
      id: "token-response",
      title: "8. Return the Access Token to the Client",
      paragraphs: [
        "After successful authentication, the server can return the access token in a documented response format. A client commonly includes the token in the Authorization header when calling a protected API.",
        "Returning a token in JSON is one possible design. Browser applications may instead use a carefully designed cookie-based approach, especially for refresh credentials. The right choice depends on the client type and its security requirements.",
        "Avoid including unnecessary sensitive information in the response. If the client needs the token lifetime, the API can return an expiresIn field expressed in seconds, calculated from the same configuration used by the token service.",
        "The client must not assume that receiving a token means it can access every endpoint. The API still validates the token and applies authorization rules."
      ],
      code: {
        language: "http",
        code: "POST /auth/login HTTP/1.1\nContent-Type: application/json\n\n{\n  \"username\": \"venkatesh\",\n  \"password\": \"<password>\"\n}"
      },
      output: "Example success response:",
      code: {
        language: "json",
        code: "{\n  \"accessToken\": \"<signed-jwt>\",\n  \"tokenType\": \"Bearer\"\n}"
      },
      bullets: [
        "The token is a bearer credential: anyone who obtains it may be able to use it until it is rejected.",
        "Use HTTPS for login and all subsequent token-bearing requests.",
        "Do not log the response body when it contains credentials.",
        "Document how clients handle token expiration and failed authentication."
      ]
    },
    {
      id: "using-token",
      title: "9. Use the JWT in a Protected API Request",
      paragraphs: [
        "Once the client receives the access token, it can present it to a protected endpoint using the Authorization header with the Bearer scheme.",
        "The protected API must validate the token before trusting its subject or claims. Merely decoding the JWT or checking whether the token string is present is not authentication.",
        "For Spring Boot, Spring Security's OAuth2 Resource Server support is a common way to validate signed JWT access tokens. Configure a trusted decoder, issuer and audience validation as appropriate, and authorization rules that match the application's authorities."
      ],
      code: {
        language: "http",
        code: "GET /api/profile HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer <signed-jwt>"
      },
      bullets: [
        "The client sends the access token in the Authorization header.",
        "The resource server validates the signature and required claims.",
        "The application applies authorization rules before returning protected data.",
        "An expired, malformed, or otherwise invalid token should be rejected.",
        "Do not send access tokens in URL query parameters."
      ]
    },
    {
      id: "key-management",
      title: "10. Signing Key Management and HS256",
      paragraphs: [
        "HS256 uses a shared secret. The service that creates a token and each service that verifies it must protect and trust the relevant key material. A service holding the same HMAC key can generally both verify tokens and create new valid signatures.",
        "This shared-key property matters in distributed systems. If many independently managed services only need to verify tokens, sharing the signing secret with all of them increases the number of systems capable of minting tokens.",
        "With asymmetric signing, such as RS256 or ES256, the issuer signs using a private key and resource servers can verify using the corresponding public key. Resource servers that only have the public key cannot create signatures with the private key.",
        "Key rotation should be planned. Systems may need to verify tokens signed by a previous key until those tokens expire, while newly issued tokens use the new key. A key identifier can help the verifier select the correct trusted key, but the verifier must still select keys from a trusted source."
      ],
      bullets: [
        "HS256: shared secret used for signing and verification.",
        "RS256: private-key signing and public-key verification.",
        "Never expose signing keys to frontend code.",
        "Do not accept arbitrary algorithm choices from an untrusted token header.",
        "Plan key rotation, deployment, and retirement of old keys.",
        "Use an established key-management system when the application requires stronger operational controls."
      ]
    },
    {
      id: "common-mistakes",
      title: "11. Common Mistakes When Generating JWTs",
      paragraphs: [
        "One common mistake is issuing a token before checking the credentials. A token should represent an authenticated identity, not merely a username supplied in a request.",
        "Another mistake is using a weak or hard-coded signing secret. If an attacker discovers a shared HMAC secret, they may be able to create tokens that pass signature validation. Use a sufficiently strong random key and protect it operationally.",
        "Developers may also omit expiration or choose an excessively long lifetime. Access tokens should normally have an explicit expiration, and the system should define how users obtain replacements after expiration.",
        "A signed JWT is not encrypted by default. Storing confidential data in the payload can expose that data to anyone who obtains the token, even if they cannot modify its signature.",
        "Finally, token creation and token validation are different operations. A successful call to compact() only serializes the generated token; the receiving API must still validate its signature, issuer, audience, expiration, and other required claims."
      ],
      bullets: [
        "Never issue a JWT before successful authentication.",
        "Never trust client-supplied roles or permissions.",
        "Never use a predictable or publicly known signing key.",
        "Never commit a production secret to source control.",
        "Do not put passwords or secret data in JWT claims.",
        "Do not assume that decoding a token verifies its signature.",
        "Do not omit expiration and issuer policy without a deliberate design.",
        "Do not expose tokens through logs, browser telemetry, or URL parameters.",
        "Do not confuse a valid signature with permission to access every resource."
      ]
    },
    {
      id: "testing-jwt-generation",
      title: "12. Test JWT Generation",
      paragraphs: [
        "JWT generation tests should verify that the service produces a non-empty token with the expected subject, issuer, issue time, and expiration. The test should also verify the signature using the same trusted key configuration.",
        "Use a dedicated test key with sufficient entropy rather than a production secret. Tests should cover invalid input and configuration errors as well as successful token creation.",
        "The following example demonstrates the main assertions using JJWT. It parses the token with a trusted verification key, verifies its signature, and checks selected claims. This is a unit-test example and assumes a JwtService instance is created with the test key and configured lifetime."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;

import javax.crypto.SecretKey;

import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private final SecretKey testKey = createTestKey();

    private final JwtService jwtService =
        new JwtService(testKey, 15);

    @Test
    void generatesSignedAccessTokenWithExpectedClaims() {
        String token =
            jwtService.generateAccessToken("user-123");

        assertNotNull(token);
        assertEquals(3, token.split("\\\\.").length);

        JwtParser parser = Jwts.parser()
            .verifyWith(testKey)
            .requireIssuer("codeforge-api")
            .build();

        Claims claims = parser
            .parseSignedClaims(token)
            .getPayload();

        assertEquals("user-123", claims.getSubject());
        assertEquals("codeforge-api", claims.getIssuer());
        assertNotNull(claims.getIssuedAt());
        assertNotNull(claims.getExpiration());
    }

    private static SecretKey createTestKey() {
        return io.jsonwebtoken.security.Keys
            .secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
    }
}`
      },
      bullets: [
        "Use a test-only key that meets the signing algorithm's requirements.",
        "Verify the signature rather than checking only the token's text.",
        "Check subject, issuer, and expiration claims.",
        "Test missing or blank subjects and invalid lifetime configuration.",
        "Add tests for expired tokens and incorrect verification keys in the validation lesson.",
        "Keep test fixtures separate from production credentials."
      ]
    },
    {
      id: "interview",
      title: "13. Interview Questions and Answers",
      paragraphs: [
        "Interviewers often ask how a JWT is generated, what claims are included, how the signing key is configured, and when token creation should occur in the login flow. Be ready to explain both the code and the security reasoning behind it."
      ],
      interviewQuestions: [
        {
          question: "1. What is JWT?",
          answer: "JWT stands for JSON Web Token. It is a compact format for representing claims that can be signed and optionally encrypted. In common Spring Boot authentication systems, signed JWTs are used to carry information about an authenticated subject."
        },
        {
          question: "2. When should a JWT be generated?",
          answer: "A JWT access token should be generated after the user's credentials have been successfully authenticated. The application should not issue a token merely because a username was supplied."
        },
        {
          question: "3. What are the three parts of a compact signed JWT?",
          answer: "The header, payload, and signature. They are serialized and separated by dots."
        },
        {
          question: "4. What is the subject claim?",
          answer: "The sub claim identifies the principal represented by the token. It should normally contain a stable user identifier selected by the application."
        },
        {
          question: "5. What is the exp claim?",
          answer: "The exp claim represents the token's expiration time. A verifier should reject the token after it expires, allowing only any explicitly configured clock-skew tolerance."
        },
        {
          question: "6. What is the iss claim?",
          answer: "The iss claim identifies the issuer that created the token. A verifier can check it to ensure the token came from the expected trusted issuer."
        },
        {
          question: "7. What is the aud claim?",
          answer: "The aud claim identifies the intended recipient or recipients of the token. Audience validation helps prevent a token issued for one API from being accepted by another API that was not its intended audience."
        },
        {
          question: "8. What does the signWith method do?",
          answer: "In JJWT, signWith signs the JWT using the supplied key and signing algorithm. The resulting signature lets a verifier detect changes to the signed content and verify that the token was signed with an appropriate trusted key."
        },
        {
          question: "9. What is HS256?",
          answer: "HS256 is HMAC using SHA-256. It uses shared secret key material for signing and verification, so the secret must be sufficiently strong and protected."
        },
        {
          question: "10. Why use a SecretKey bean?",
          answer: "A SecretKey bean allows Spring to manage the signing key as a dependency and inject it into the JWT service. It centralizes key construction and avoids scattering key-decoding logic throughout the application."
        },
        {
          question: "11. Why should the signing secret be Base64-encoded?",
          answer: "Base64 provides a convenient text representation of the original key bytes for configuration. It does not add security or entropy; the underlying key must still be randomly generated and strong enough for the selected algorithm."
        },
        {
          question: "12. How long should an access token live?",
          answer: "There is no single lifetime suitable for every application. A short lifetime, such as 15 minutes in this example, can reduce exposure if a token is stolen. The actual duration should reflect application risk, user experience, and the available refresh and revocation mechanisms."
        },
        {
          question: "13. Is a signed JWT encrypted?",
          answer: "No. A typical signed JWT is readable by anyone who obtains it. The signature protects integrity and authenticity; it does not hide the payload."
        },
        {
          question: "14. Can a client choose its own role when requesting a token?",
          answer: "No. Roles and authorities must come from trusted server-side identity and authorization data. Accepting a client-supplied ADMIN role would allow privilege escalation."
        },
        {
          question: "15. What is the difference between generating and validating a JWT?",
          answer: "Generating a JWT creates and signs a token using trusted claims and key material. Validating a JWT checks its signature and required claims, such as issuer, audience, and expiration, before the token is trusted."
        },
        {
          question: "16. Why use constructor injection in JwtService?",
          answer: "Constructor injection makes required dependencies explicit, helps ensure the service is properly configured at creation time, and makes unit testing easier."
        },
        {
          question: "17. What happens if the signing key is too short?",
          answer: "JJWT's HMAC key utilities reject keys that do not meet the algorithm's minimum key-length requirements. For HS256, use at least 256 bits of cryptographically random key material."
        },
        {
          question: "18. What is the difference between HS256 and RS256?",
          answer: "HS256 uses a shared secret for signing and verification. RS256 uses an asymmetric key pair: the private key signs tokens, while the corresponding public key verifies them. Asymmetric signing can reduce the number of services that need access to signing capability."
        },
        {
          question: "19. Where should a signing key be stored?",
          answer: "Store it in protected deployment configuration, a secrets manager, or an appropriate key-management system. Do not expose it to frontend applications or commit it to source control."
        },
        {
          question: "20. How do you explain JWT generation in an interview?",
          answer: "After successful authentication, the application passes the authenticated user's stable identifier to a JWT service. The service builds claims such as subject, issuer, issue time, and expiration, signs the token using a configured key, and returns the serialized JWT to the client. Protected APIs then validate the token before trusting it."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "14. Short Notes for Revision",
      paragraphs: [
        "A JWT service generates a signed token for an already authenticated subject. JJWT can build the token, set claims such as sub, iss, iat, and exp, sign it with a trusted key, and serialize it using compact().",
        "The signing key must be sufficiently strong and securely configured. The application should never trust arbitrary client-supplied identity or role claims, and it should never place passwords or other secrets in a normal signed JWT payload.",
        "Token generation is only one part of JWT authentication. A protected API must separately validate the signature, issuer, audience, expiration, and any other required claims, then apply authorization rules."
      ],
      bullets: [
        "JWT generation happens after successful authentication.",
        "sub = subject identifier.",
        "iss = issuer.",
        "iat = issued-at time.",
        "exp = expiration time.",
        "HS256 = HMAC-SHA-256 with a shared secret.",
        "Base64 is encoding, not encryption.",
        "A signed JWT is not automatically confidential.",
        "Never trust client-supplied roles.",
        "Token generation and token validation are separate responsibilities."
      ]
    }
  ]
};
