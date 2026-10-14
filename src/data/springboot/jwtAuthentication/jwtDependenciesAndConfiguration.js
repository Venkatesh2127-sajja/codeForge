
export const jwtDependenciesAndConfiguration = {
  id: 1204,
  title: "JWT Dependencies and Configuration",
  slug: "jwt-dependencies-and-configuration",
  topicTitle: "JWT Authentication",
  description:
    "Understand JWT library selection, configure Maven dependencies, securely manage signing secrets, and prepare a Spring Boot application for JWT authentication.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "library",
      title: "Choosing a JWT Library",
      paragraphs: [
        "A JWT library provides APIs to create, sign, parse, and validate JSON Web Tokens. In Spring Boot, JJWT is a common option when the application needs to generate tokens itself or implement a custom token-validation flow.",
        "JJWT separates its API from its implementation and JSON integration. The API module provides the classes used by application code, the implementation module supplies runtime functionality, and the Jackson module provides JSON serialization and deserialization support.",
        "Keep all JJWT modules on the same version. Mixing versions can cause compilation errors, missing methods, or runtime failures.",
        "Spring Security OAuth2 Resource Server is another strong choice when the application primarily needs to authenticate requests using bearer JWTs. It integrates token validation with Spring Security and supports issuer-based configuration and public-key verification.",
        "Choose the approach based on responsibility. JJWT is a JWT library; Resource Server is a Spring Security integration. They are not mutually exclusive, but many applications do not need to implement a custom JWT authentication filter when Resource Server already satisfies their requirements."
      ],
      code: {
        language: "xml",
        code: `<dependencies>
    <!-- JWT API used by application code -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>

    <!-- JWT implementation loaded at runtime -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>

    <!-- JSON integration using Jackson -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>`
      },
      bullets: [
        "Use a compatible JJWT API, implementation, and JSON integration module.",
        "Keep dependency versions aligned.",
        "Use Spring Security Resource Server when its standard bearer-token support fits your application.",
        "Do not write your own cryptographic signature-verification algorithm.",
        "Check library compatibility and supported versions before upgrading."
      ]
    },
    {
      id: "dependency-explanation",
      title: "Understanding Each Maven Dependency",
      paragraphs: [
        "The jjwt-api dependency contains the public classes and interfaces that application code compiles against. For example, token-building and parsing APIs are referenced from this module.",
        "The jjwt-impl dependency contains the implementation behind the public API. It is normally declared with runtime scope because the application compiles against the API rather than directly against implementation classes.",
        "The jjwt-jackson dependency connects JJWT to Jackson for JSON processing. JWT headers and claims are represented as JSON structures, so the library needs a JSON integration.",
        "The runtime scope does not mean a dependency is unimportant. The implementation and JSON modules still need to be present when the application starts and processes tokens."
      ],
      bullets: [
        "Compile-time API: jjwt-api.",
        "Runtime implementation: jjwt-impl.",
        "Runtime JSON integration: jjwt-jackson.",
        "A missing runtime module may lead to errors when a token is created or parsed.",
        "Run a Maven dependency refresh after changing the pom.xml."
      ]
    },
    {
      id: "resource-server-dependency",
      title: "Alternative: Spring Security Resource Server",
      paragraphs: [
        "For applications that validate JWT access tokens, Spring Security Resource Server is often a simpler and safer integration than writing a custom authentication filter. It connects bearer-token processing to Spring Security's authentication and authorization infrastructure.",
        "For a typical Spring Boot application using Maven, the starter brings in the relevant Spring Security integration. JWT decoding support is commonly provided by the OAuth2 JOSE module, which can be added explicitly when needed.",
        "This example is an alternative dependency setup. Do not add it automatically if your application intentionally uses a different security architecture."
      ],
      code: {
        language: "xml",
        code: `<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
    </dependency>

    <!-- Add explicitly if not already supplied by your dependency setup -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-oauth2-jose</artifactId>
    </dependency>
</dependencies>`
      },
      bullets: [
        "Use the Spring Boot dependency-management parent or BOM to manage compatible Spring versions.",
        "Avoid hardcoding unrelated Spring Security versions in a Spring Boot application.",
        "Resource Server can validate signed JWTs and populate the Spring Security authentication context.",
        "If your application issues its own tokens, token issuance still needs an appropriate implementation or identity provider.",
        "Avoid maintaining both a custom JWT filter and Resource Server for the same bearer-token flow unless there is a clear requirement."
      ]
    },
    {
      id: "secret",
      title: "Configure the Signing Secret",
      paragraphs: [
        "A signing key protects the integrity of a JWT. With the HS256 algorithm, the same secret key is used to sign a token and verify its signature. Every service that verifies tokens using that shared key must protect it.",
        "For HS256, use a cryptographically random key containing at least 256 bits of entropy. A 32-byte random key is a suitable minimum. Do not use a human-readable password, username, or short phrase as the signing key.",
        "Base64 is an encoding format, not encryption. Base64 makes arbitrary key bytes easier to transport through configuration, but anyone who obtains the encoded value can decode it. The secret must still be protected.",
        "Store the encoded secret in an environment variable or a dedicated secret-management system. Never commit a real production secret to source control or expose it in browser-side JavaScript."
      ],
      code: {
        language: "yaml",
        code: `app:
  jwt:
    secret-base64: \${JWT_SECRET_BASE64}
    access-token-minutes: 15`
      },
      bullets: [
        "Set JWT_SECRET_BASE64 in the application environment before starting Spring Boot.",
        "Use a randomly generated key with at least 256 bits of entropy for HS256.",
        "Decode the Base64 value into bytes before creating an HMAC signing key.",
        "Do not log the secret or include it in API responses.",
        "Plan how keys will be rotated and how all application instances will receive the correct key."
      ]
    },
    {
      id: "generate-secret",
      title: "Generate a Strong JWT Secret",
      paragraphs: [
        "Generate a secret using a cryptographically secure random-number generator. Avoid manually inventing a secret or using a short password.",
        "On systems with OpenSSL installed, the following command generates 32 random bytes and prints them in Base64 form. Store the output securely as a secret rather than copying it into application source code."
      ],
      code: {
        language: "bash",
        code: `openssl rand -base64 32`
      },
      bullets: [
        "Generate a different secret for each independent environment where appropriate.",
        "Do not reuse an example or tutorial secret in production.",
        "Restrict access to production secrets to the services and operators that need them.",
        "If a secret is exposed, treat it as compromised and rotate it."
      ]
    },
    {
      id: "environment-variables",
      title: "Set the Environment Variable",
      paragraphs: [
        "Spring Boot can resolve environment variables through placeholders in application.yml. The placeholder lets the application obtain the secret from its runtime environment without storing the actual value in the configuration file.",
        "For local development on Windows PowerShell, set the variable in the terminal before launching the application. The value shown below is only a placeholder: replace it with the generated Base64 secret.",
        "For Linux or macOS shells, export the environment variable before running the application. In deployment environments, prefer the platform's secret-management mechanism rather than embedding secrets in container images or checked-in scripts."
      ],
      code: {
        language: "bash",
        code: `# Linux or macOS
export JWT_SECRET_BASE64='REPLACE_WITH_GENERATED_BASE64_SECRET'
./mvnw spring-boot:run`
      },
      bullets: [
        "PowerShell: $env:JWT_SECRET_BASE64 = 'REPLACE_WITH_GENERATED_BASE64_SECRET'.",
        "Set environment variables in the same environment that launches Spring Boot.",
        "A variable set in one terminal may not exist in another terminal or IDE process.",
        "Do not commit .env files containing real secrets.",
        "Use the deployment platform's secret store for production credentials."
      ]
    },
    {
      id: "configuration-properties",
      title: "Understand JWT Configuration Properties",
      paragraphs: [
        "The app.jwt prefix groups settings related to JWT behavior. Keeping related configuration together makes the application easier to understand and maintain.",
        "The secret-base64 property stores the Base64-encoded key. The application must decode it before passing the bytes to the JWT library. The access-token-minutes property defines the intended access-token lifetime and should be used consistently when creating token expiration timestamps.",
        "Configuration values are not secure merely because they are in application.yml. The file should contain property references or non-sensitive defaults, while the actual production secret comes from a protected external source."
      ],
      code: {
        language: "yaml",
        code: `app:
  jwt:
    secret-base64: \${JWT_SECRET_BASE64}
    access-token-minutes: 15`
      },
      bullets: [
        "Use a short access-token lifetime appropriate to your application's risk.",
        "Validate configuration during application startup.",
        "Do not confuse token expiration with key expiration or key rotation.",
        "Ensure every instance that issues or verifies HS256 tokens uses the intended key.",
        "Avoid adding secret values to configuration diagnostics or startup logs."
      ]
    },
    {
      id: "key-validation",
      title: "Decode and Validate the Signing Key",
      paragraphs: [
        "Before signing or verifying tokens, decode the configured Base64 string into its original bytes. With JJWT 0.12.x, Decoders.BASE64.decode can perform the decoding, and Keys.hmacShaKeyFor can create a suitable HMAC key from those bytes.",
        "Reject missing, malformed, or undersized key material during startup rather than discovering the problem when the first login request arrives. A startup failure is easier to diagnose and avoids running the application with an unsafe configuration.",
        "The following example creates an HS256-compatible key. It assumes the configured value is valid standard Base64 and demonstrates a minimum-length check before the key is returned."
      ],
      code: {
        language: "java",
        code: `import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;

public final class JwtKeyFactory {

    private JwtKeyFactory() {
    }

    public static SecretKey createHs256Key(String secretBase64) {
        if (secretBase64 == null || secretBase64.isBlank()) {
            throw new IllegalStateException(
                "JWT_SECRET_BASE64 must be configured"
            );
        }

        final byte[] keyBytes;

        try {
            keyBytes = Decoders.BASE64.decode(secretBase64);
        } catch (RuntimeException ex) {
            throw new IllegalStateException(
                "JWT_SECRET_BASE64 must contain valid Base64",
                ex
            );
        }

        if (keyBytes.length < 32) {
            throw new IllegalStateException(
                "HS256 requires at least 32 bytes of key material"
            );
        }

        return Keys.hmacShaKeyFor(keyBytes);
    }
}`
      },
      bullets: [
        "The length check verifies byte length, not the length of the Base64 text.",
        "A long human-readable password is not a substitute for randomly generated key material.",
        "Do not silently replace an invalid production secret with a hardcoded default.",
        "Do not catch a configuration error and continue with an insecure key.",
        "Keep key creation and configuration validation in a reusable component rather than duplicating it across services."
      ]
    },
    {
      id: "configuration-class",
      title: "Bind JWT Settings in Spring Boot",
      paragraphs: [
        "For a larger application, bind related settings into a configuration object instead of scattering string-based property lookups throughout the codebase. Spring Boot configuration properties make the relationship between YAML and Java code explicit.",
        "This example uses constructor binding through a Java record, supported by Spring Boot 3. The configuration object contains the encoded secret and access-token lifetime. A separate bean can create the signing key using the validation utility from the previous section.",
        "The example intentionally fails if the secret is absent. For production applications, add suitable configuration validation and ensure errors never reveal the secret itself."
      ],
      code: {
        language: "java",
        code: `import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String secretBase64,
    long accessTokenMinutes
) {
    public JwtProperties {
        if (secretBase64 == null || secretBase64.isBlank()) {
            throw new IllegalStateException(
                "JWT signing secret is not configured"
            );
        }

        if (accessTokenMinutes <= 0) {
            throw new IllegalStateException(
                "JWT access-token lifetime must be positive"
            );
        }
    }
}`
      },
      bullets: [
        "Register the configuration class with @ConfigurationPropertiesScan on the Spring Boot application, or enable it explicitly with @EnableConfigurationProperties(JwtProperties.class).",
        "Use a SecretKey bean created from the validated Base64 value.",
        "Keep the configured lifetime and the actual token expiration calculation consistent.",
        "For projects using older Spring Boot versions, check the supported configuration-binding approach for that version.",
        "Do not print the configuration object if it contains sensitive values."
      ]
    },
    {
      id: "signing-example",
      title: "Use the Key to Sign a JWT",
      paragraphs: [
        "Once the signing key has been loaded and validated, the application can use JJWT to create a signed token. A typical access token contains an issuer, a subject identifying the user, an issued-at timestamp, and an expiration timestamp.",
        "The signing algorithm should be selected deliberately and used consistently by the token issuer and verifier. The example uses HS256 with a SecretKey generated from the external configuration.",
        "A signed JWT is not automatically encrypted. Its payload is generally readable by anyone who possesses the token, so do not put passwords, API secrets, or other confidential information in its claims."
      ],
      code: {
        language: "java",
        code: `import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class JwtTokenService {

    private final SecretKey signingKey;
    private final long accessTokenMinutes;

    public JwtTokenService(
            SecretKey signingKey,
            long accessTokenMinutes) {
        this.signingKey = signingKey;
        this.accessTokenMinutes = accessTokenMinutes;
    }

    public String generateAccessToken(String username) {
        Instant now = Instant.now();
        Instant expiry = now.plus(
            accessTokenMinutes,
            ChronoUnit.MINUTES
        );

        return Jwts.builder()
            .subject(username)
            .issuedAt(Date.from(now))
            .expiration(Date.from(expiry))
            .signWith(signingKey, Jwts.SIG.HS256)
            .compact();
    }
}`
      },
      bullets: [
        "The subject should identify the authenticated principal consistently across the application.",
        "Set an expiration timestamp and validate it when the token is received.",
        "Use trusted server-side identity data when creating claims.",
        "Do not trust a username or role supplied directly by an unauthenticated client.",
        "Token generation alone does not authenticate an incoming HTTP request; validation and Spring Security integration are also required."
      ]
    },
    {
      id: "configuration-flow",
      title: "JWT Configuration Flow",
      paragraphs: [
        "The configuration flow begins outside the application and ends with a validated key available to the JWT service. Keeping this flow explicit helps diagnose missing environment variables and invalid key formats."
      ],
      code: {
        language: "text",
        code: `Generate random signing key
          |
          v
Store Base64 value securely
          |
          v
Set JWT_SECRET_BASE64
          |
          v
Spring Boot resolves application.yml
          |
          v
Validate and Base64-decode key
          |
          v
Create SecretKey
          |
          v
JWT service signs or verifies tokens`
      },
      bullets: [
        "If configuration is missing, fail during startup.",
        "If Base64 decoding fails, fix the configured value instead of bypassing validation.",
        "If instances use different HS256 secrets, tokens generated by one instance may fail verification on another.",
        "If using an external identity provider, configure the correct issuer and verification-key source instead of copying its private signing key into your application."
      ]
    },
    {
      id: "key-rotation",
      title: "Signing Secret Rotation",
      paragraphs: [
        "Key rotation means replacing an old signing key with a new one according to a planned process. A rotation strategy matters because tokens issued with the old key may still be valid when the new key is introduced.",
        "With a shared HMAC key, every service that validates tokens must have access to the appropriate verification key. Replacing the key everywhere at once can invalidate all outstanding tokens signed with the previous key.",
        "For more advanced deployments, tokens can include a key identifier in their protected header, allowing the verifier to select the appropriate trusted key from a controlled key set. A key identifier is a lookup hint, not proof that a key is trusted.",
        "Asymmetric signing can simplify trust distribution in multi-service systems: an issuer holds the private signing key while resource servers verify tokens with the corresponding public key. Public keys do not need to be kept secret, but they must still be obtained from a trusted source."
      ],
      bullets: [
        "Define who can create, access, rotate, and revoke signing keys.",
        "Document how long old verification keys remain available during a transition.",
        "Never accept arbitrary verification keys supplied by a token or request.",
        "Use a trusted identity provider or managed key infrastructure when it fits the architecture.",
        "Test rotation behavior before changing production keys."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common JWT Configuration Mistakes",
      paragraphs: [
        "Many JWT problems are configuration errors rather than token-generation errors. Check the environment, Base64 encoding, key length, algorithm choice, and dependency versions before debugging the entire authentication flow."
      ],
      bullets: [
        "Hardcoding a signing secret in Java source code or committing it to Git.",
        "Using a short password as an HS256 key.",
        "Base64-encoding a weak password and assuming the result is a strong key.",
        "Passing the Base64 characters directly to the HMAC key constructor instead of decoding the original key bytes.",
        "Using a different signing secret across application instances without a deliberate key-distribution strategy.",
        "Mixing versions of jjwt-api, jjwt-impl, and jjwt-jackson.",
        "Using JJWT APIs copied from an older version without checking compatibility.",
        "Assuming that a valid signature means the token is authorized for every endpoint.",
        "Putting confidential data in readable JWT claims.",
        "Logging bearer tokens or signing keys during debugging.",
        "Assuming Base64 provides confidentiality.",
        "Using an untrusted issuer or accepting unexpected signing algorithms."
      ]
    },
    {
      id: "testing-configuration",
      title: "Test the JWT Configuration",
      paragraphs: [
        "Test configuration before relying on JWT authentication in a running application. Verify that a valid generated secret can be decoded, that an undersized secret is rejected, and that token generation and parsing use compatible key material.",
        "A unit test should not contain a real production secret. Generate test-only key material and keep it isolated from deployed configuration."
      ],
      code: {
        language: "java",
        code: `import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtConfigurationExample {

    public static void main(String[] args) {
        SecretKey key = Keys.secretKeyFor(
            io.jsonwebtoken.SignatureAlgorithm.HS256
        );

        String encoded = Encoders.BASE64.encode(
            key.getEncoded()
        );

        SecretKey decodedKey =
            JwtKeyFactory.createHs256Key(encoded);

        String token = Jwts.builder()
            .subject("test-user")
            .expiration(new Date(
                System.currentTimeMillis() + 60_000
            ))
            .signWith(decodedKey, Jwts.SIG.HS256)
            .compact();

        String subject = Jwts.parser()
            .verifyWith(decodedKey)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();

        if (!"test-user".equals(subject)) {
            throw new IllegalStateException(
                "JWT configuration test failed"
            );
        }

        System.out.println("JWT configuration test passed");
    }
}`
      },
      bullets: [
        "This is a standalone demonstration; production code should use dependency injection and automated tests.",
        "The generated test key is temporary and should never be reused as a production secret.",
        "Test invalid signatures, expired tokens, malformed tokens, and missing configuration.",
        "Avoid printing the generated key or the token in test logs.",
        "For JJWT 0.12.x, use the current builder and parser APIs rather than older tutorial methods."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "Why externalize the JWT secret?",
          answer: "Externalizing the secret prevents it from being embedded in source code and allows deployment-specific configuration, access control, and key rotation. The secret must still be stored securely in the environment or a secret manager."
        },
        {
          question: "What is the difference between JJWT and Spring Security Resource Server?",
          answer: "JJWT is a library for creating, signing, parsing, and validating JWTs. Spring Security Resource Server integrates bearer-token authentication into Spring Security and can validate JWTs using configured trusted keys or issuer metadata."
        },
        {
          question: "Why are three JJWT dependencies commonly used?",
          answer: "jjwt-api supplies the public API, jjwt-impl supplies runtime implementation classes, and jjwt-jackson supplies Jackson-based JSON integration. They should use compatible versions."
        },
        {
          question: "Why should all JJWT modules use the same version?",
          answer: "The modules are designed to work together. Version mismatches can cause missing methods, incompatible behavior, or runtime linkage errors."
        },
        {
          question: "What is the difference between Base64 encoding and encryption?",
          answer: "Base64 converts bytes into a text representation. It does not hide the original value. Encryption uses a cryptographic key to protect confidentiality."
        },
        {
          question: "How long should an HS256 secret be?",
          answer: "Use at least 256 bits of cryptographically random key material, equivalent to 32 bytes, for HS256. The secret should be generated securely rather than chosen as a human-readable password."
        },
        {
          question: "Why should a JWT secret not be hardcoded?",
          answer: "A hardcoded secret can leak through source control, shared repositories, or application artifacts. External configuration makes it easier to restrict access and rotate keys without changing application source code."
        },
        {
          question: "Why do we decode a Base64 JWT secret before using it?",
          answer: "The Base64 string is a textual representation of the original random key bytes. Decoding restores those bytes so the cryptographic library can use the intended key material."
        },
        {
          question: "What happens if the JWT secret is missing?",
          answer: "The application should fail configuration validation during startup instead of silently using a default secret or waiting until a login request fails."
        },
        {
          question: "Can a JWT payload contain passwords?",
          answer: "No. A signed JWT is not necessarily encrypted, and its claims can generally be decoded by anyone who has the token. Do not place passwords, API secrets, or other confidential values in its payload."
        },
        {
          question: "Does a valid JWT signature guarantee authorization?",
          answer: "No. A valid signature helps establish that the token was signed by a trusted key and has not been modified. The application must also validate relevant claims and enforce endpoint permissions."
        },
        {
          question: "What is key rotation?",
          answer: "Key rotation is the controlled replacement of an old signing key with a new one. The strategy must account for outstanding tokens, trusted verification keys, and coordination between application instances."
        },
        {
          question: "When is asymmetric JWT signing useful?",
          answer: "Asymmetric signing is useful when one issuer signs tokens with a private key and multiple services verify them using a public key. Resource servers can verify tokens without receiving the issuer's private signing key."
        },
        {
          question: "Should every Spring Boot application implement its own JWT filter?",
          answer: "No. Spring Security OAuth2 Resource Server already supports bearer-token authentication and JWT validation. A custom filter may be appropriate for specific requirements, but it adds implementation and maintenance responsibility."
        },
        {
          question: "What should be checked when JWT authentication fails after deployment?",
          answer: "Check environment-variable availability, Base64 decoding, key length, dependency compatibility, signing algorithm, issuer and expiration validation, and whether all instances use the expected trusted key."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "JWT configuration connects external secret management, Spring Boot configuration, cryptographic key creation, and token processing. A secure implementation must protect key material and validate incoming tokens; adding a JWT dependency alone does not create a secure authentication system."
      ],
      bullets: [
        "JJWT provides APIs for working with JWTs.",
        "Spring Security Resource Server integrates bearer-token validation with Spring Security.",
        "Keep the JJWT API, implementation, and JSON integration versions aligned.",
        "Generate a random 32-byte or stronger HS256 secret.",
        "Base64 is encoding, not encryption.",
        "Read production secrets from protected external configuration.",
        "Validate the secret during startup and fail safely when configuration is invalid.",
        "Keep token signing, token validation, and endpoint authorization conceptually separate.",
        "Plan key rotation and never expose signing keys or bearer tokens in logs."
      ]
    }
  ]
};
