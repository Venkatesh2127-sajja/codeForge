
export const loginAndRegistrationApi = {
  id: 1209,
  title: "Login and Registration API",
  slug: "login-and-registration-api",
  topicTitle: "JWT Authentication",
  description:
    "Understand how registration, password encoding, credential verification, and JWT issuance fit together in a secure Spring Boot authentication API.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "registration",
      title: "Registration API",
      paragraphs: [
        "Registration is the process of creating a new user account. A client sends information such as an email address and password to a registration endpoint. The backend validates the request, checks whether the account identifier is already registered, encodes the password, and saves the user through a repository.",
        "Never store raw passwords in a database. Passwords should be processed using a password hashing algorithm provided by a suitable Spring Security PasswordEncoder, such as BCryptPasswordEncoder. Password hashing is intentionally one-way: the application verifies a submitted password later rather than decrypting the stored hash.",
        "Use request DTOs instead of binding incoming JSON directly to a JPA entity. This prevents clients from setting sensitive or privileged fields such as user IDs, roles, account status, and password hashes.",
        "After saving the account, return a response DTO containing only appropriate public information. Never return the encoded password, password hash, or token signing secret.",
        "Duplicate-account handling should be reliable under concurrent requests. A preliminary repository check improves the error message, but a database unique constraint on the normalized email or username is still needed to prevent race conditions."
      ],
      code: {
        language: "java",
        code: `// Registration service example

@Transactional
public UserResponse register(RegisterRequest request) {
    String email = request.email().trim().toLowerCase();

    if (userRepository.existsByEmail(email)) {
        throw new EmailAlreadyRegisteredException(
                "An account with this email already exists"
        );
    }

    User user = new User();
    user.setEmail(email);
    user.setPassword(
            passwordEncoder.encode(request.password())
    );

    User savedUser = userRepository.save(user);

    return new UserResponse(
            savedUser.getId(),
            savedUser.getEmail()
    );
}`
      },
      bullets: [
        "Validate required fields, email format, and password policy.",
        "Normalize account identifiers consistently before checking and saving them.",
        "Encode passwords with a suitable PasswordEncoder.",
        "Use a unique database constraint for the account identifier.",
        "Do not accept roles or privileged account fields directly from an untrusted registration request.",
        "Return a response DTO without the password or password hash.",
        "Consider email verification, abuse prevention, and registration rate limits."
      ]
    },
    {
      id: "registration-flow",
      title: "Registration Request Flow",
      paragraphs: [
        "A typical registration request moves through several backend layers. The controller accepts the HTTP request and validates its DTO. The service applies registration rules and encodes the password. The repository persists the entity, and the controller returns a suitable HTTP response.",
        "Keeping responsibilities separate makes the application easier to test. Controllers should handle HTTP concerns, services should implement business rules, and repositories should handle database access."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | POST /api/v1/auth/register
  v
AuthController
  |
  | Validate RegisterRequest
  v
AuthService
  |
  | Check duplicate email
  | Encode password
  v
UserRepository
  |
  | INSERT user
  v
Database
  |
  | Saved user
  v
UserResponse
  |
  v
Client receives 201 Created`
      },
      bullets: [
        "Controller: receives the request and returns the HTTP response.",
        "DTO validation: checks input before business logic runs.",
        "Service: applies registration rules and password encoding.",
        "Repository: persists the user.",
        "Database: enforces constraints such as unique email.",
        "Response DTO: exposes only safe account information."
      ]
    },
    {
      id: "registration-dto",
      title: "Registration DTO and Validation",
      paragraphs: [
        "A request DTO defines the fields that the client is allowed to submit. Bean Validation annotations can reject missing or malformed values before the service processes them.",
        "The following example uses Java records and Jakarta Bean Validation. It assumes that the corresponding validation dependency is included in the Spring Boot application."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank
    @Email
    @Size(max = 254)
    String email,

    @NotBlank
    @Size(min = 12, max = 72)
    String password
) {}

public record UserResponse(
    Long id,
    String email
) {}`
      },
      bullets: [
        "Use @Valid on the controller request body to trigger DTO validation.",
        "Choose password rules appropriate to the application and password encoder.",
        "The example uses a 12-character minimum as a sample policy, not a universal requirement.",
        "BCrypt has a 72-byte password input limit; character count and byte count are not always the same.",
        "Never trim or silently modify a password unless that behavior is an explicit, carefully designed policy."
      ]
    },
    {
      id: "login",
      title: "Login API",
      paragraphs: [
        "Login verifies that the submitted credentials belong to an existing account. The client typically submits an email or username and a password to an authentication endpoint.",
        "In a Spring Security application, the controller or authentication service can delegate credential verification to AuthenticationManager. The manager delegates to an appropriate AuthenticationProvider, commonly DaoAuthenticationProvider for username/password authentication.",
        "The provider obtains user details through a configured UserDetailsService and verifies the submitted password against the stored password hash using the configured PasswordEncoder. The application must configure these components consistently.",
        "Only after authentication succeeds should the application issue an access token. The token's subject should identify the authenticated account using a stable identifier, and the application should include only the claims needed by the API.",
        "Invalid credentials should produce an appropriate authentication failure without revealing whether the email exists. Account lockout, disabled accounts, and other authentication restrictions must also be handled according to the application's security policy."
      ],
      code: {
        language: "java",
        code: `Authentication authentication =
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.email(),
            request.password()
        )
    );

// This line is reached only if authentication succeeds.
String userId = authentication.getName();

String accessToken =
    jwtService.generateAccessToken(userId);

return new LoginResponse(
    accessToken,
    "Bearer",
    900
);`
      },
      bullets: [
        "Never generate an access token before credentials are authenticated.",
        "Do not compare a raw password directly with a stored password hash.",
        "Use AuthenticationManager rather than duplicating password verification logic.",
        "Avoid error messages that disclose whether an account exists.",
        "Apply rate limiting, monitoring, and appropriate account-abuse controls.",
        "Use HTTPS for credentials and tokens.",
        "Do not log passwords, authorization headers, or complete access tokens."
      ]
    },
    {
      id: "authentication-flow",
      title: "How Spring Security Authenticates Login",
      paragraphs: [
        "AuthenticationManager is the entry point for Spring Security authentication operations. A common implementation, ProviderManager, delegates to one or more AuthenticationProvider implementations.",
        "For username/password authentication, DaoAuthenticationProvider works with UserDetailsService to load the account and PasswordEncoder to verify the submitted password. On success, an authenticated Authentication object is returned to the caller.",
        "The JWT service then creates a signed token. This token issuance step is application logic: successful password authentication does not automatically generate a JWT unless the application has implemented that behavior."
      ],
      code: {
        language: "text",
        code: `LoginRequest
    |
    v
AuthController
    |
    v
AuthenticationManager
    |
    v
AuthenticationProvider
    |
    +----> UserDetailsService
    |          |
    |          v
    |      UserRepository
    |          |
    |          v
    |      Stored user and password hash
    |
    +----> PasswordEncoder verifies password
                  |
           +------+------+
           |             |
        Success        Failure
           |             |
           v             v
   JWT generation    Authentication error
           |
           v
   LoginResponse`
      },
      bullets: [
        "Authentication answers: Who are you, and have your credentials been verified?",
        "Authorization answers: Are you allowed to perform this operation?",
        "AuthenticationManager coordinates authentication.",
        "AuthenticationProvider performs a particular authentication method.",
        "UserDetailsService loads account details; it does not itself compare passwords.",
        "PasswordEncoder verifies a raw password against the stored encoded value."
      ]
    },
    {
      id: "password-encoder",
      title: "PasswordEncoder and Password Verification",
      paragraphs: [
        "A PasswordEncoder protects stored credentials by applying a password hashing function. BCrypt is a commonly used choice because it incorporates a salt and a configurable work factor.",
        "During registration, encode the raw password and save the resulting encoded value. During login, Spring Security invokes matches(rawPassword, encodedPassword) through the configured authentication provider.",
        "Do not call encode on the login password and compare the resulting string with the stored hash. Password hashing normally uses a salt, so encoding the same password twice can produce different encoded strings. Use PasswordEncoder.matches instead."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// Registration:
String encoded = passwordEncoder.encode(rawPassword);

// Manual verification, when needed:
boolean matches = passwordEncoder.matches(
        submittedPassword,
        encodedPasswordFromDatabase
);`
      },
      bullets: [
        "The encoded password is not intended to be decrypted.",
        "Use matches() to verify a password against a stored hash.",
        "Do not use plain SHA-256 or MD5 as a password-storage substitute.",
        "Tune hashing cost with performance and security in mind.",
        "If migrating existing hashes, plan a safe re-encoding strategy after successful login."
      ]
    },
    {
      id: "api-contract",
      title: "Example API Contract",
      paragraphs: [
        "A clear API contract documents the endpoint, request fields, success response, failure responses, and token lifetime. The following examples illustrate the shape of registration and login requests and responses.",
        "The response uses an access token with a 900-second lifetime as an example. The actual expiresIn value must match the token's configured expiration. The password shown is a placeholder and must never be used as a real credential.",
        "A production API should also decide whether refresh tokens are needed, how they are stored and rotated, and how logout or token revocation works."
      ],
      code: {
        language: "json",
        code: `// POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "<strong-password>"
}

// Example registration response: 201 Created
{
  "id": 101,
  "email": "user@example.com"
}

// POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "<strong-password>"
}

// Example login response: 200 OK
{
  "accessToken": "<signed-jwt>",
  "tokenType": "Bearer",
  "expiresIn": 900
}`
      },
      bullets: [
        "Registration commonly returns 201 Created when a new account is created.",
        "Successful login commonly returns 200 OK.",
        "Invalid credentials commonly return 401 Unauthorized.",
        "Invalid request fields can return 400 Bad Request.",
        "Duplicate-account behavior should be documented and implemented consistently.",
        "Never include a signing key or password hash in a response.",
        "Do not confuse expiresIn, which is typically expressed in seconds here, with a Unix timestamp."
      ]
    },
    {
      id: "controller-implementation",
      title: "Example Authentication Controller",
      paragraphs: [
        "The controller exposes HTTP endpoints and delegates business operations to a service. This illustrative example assumes that AuthService implements register and login, and that the request and response DTOs are defined in the application.",
        "Using @Valid triggers Bean Validation for the request DTO. A centralized exception-handling layer should translate validation failures, duplicate-account errors, and authentication failures into consistent HTTP responses."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        UserResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}`
      },
      bullets: [
        "Keep database and password-encoding logic out of the controller.",
        "Use constructor injection for required dependencies.",
        "Keep authentication business logic in a service or dedicated authentication component.",
        "Use a centralized exception handler for predictable API errors.",
        "Remember that security filter failures may occur before a controller or controller advice is reached."
      ]
    },
    {
      id: "security-configuration",
      title: "Security Configuration Considerations",
      paragraphs: [
        "The registration and login endpoints must be reachable by unauthenticated users, so they are commonly configured as permitAll endpoints. Protected endpoints should require authentication and, where appropriate, authorization rules.",
        "permitAll means that Spring Security does not require an authenticated principal for the matched request. It does not mean that validation, rate limiting, application checks, or other security controls should be disabled.",
        "For stateless JWT APIs, applications commonly configure session management with SessionCreationPolicy.STATELESS. The JWT authentication mechanism must still validate bearer tokens on protected requests.",
        "A custom JWT filter is not automatically required. Spring Security OAuth2 Resource Server support can validate bearer JWTs when configured with the appropriate decoder, trusted key material, and claim-validation rules."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/v1/auth/register",
                    "/api/v1/auth/login"
                ).permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}`
      },
      bullets: [
        "This is a simplified stateless API example, not a universal security configuration.",
        "Disabling CSRF may be appropriate for a backend that authenticates exclusively through explicitly supplied bearer tokens and does not rely on automatically attached browser credentials.",
        "If authentication uses cookies, evaluate CSRF protection rather than disabling it blindly.",
        "Configure JWT verification and claim validation for protected requests.",
        "Add role- or authority-based rules where the application requires them.",
        "Configure CORS separately for browser clients; CORS is not authentication or authorization."
      ]
    },
    {
      id: "error-handling",
      title: "Authentication Errors and HTTP Responses",
      paragraphs: [
        "Authentication endpoints should return clear, consistent errors without leaking sensitive information. For example, an incorrect password and an unknown email can share the same public error message even though the internal cause differs.",
        "Use a centralized exception-handling strategy for controller and service errors. Spring Security failures raised in the security filter chain may need an AuthenticationEntryPoint or AccessDeniedHandler because they can occur before controller advice handles a request.",
        "Do not return stack traces, SQL details, password hashes, token contents, or signing-key information to clients."
      ],
      code: {
        language: "json",
        code: `// Example invalid-credentials response
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid email or password"
}

// Example validation response
{
  "status": 400,
  "error": "Bad Request",
  "message": "Request validation failed"
}`
      },
      bullets: [
        "400 Bad Request: malformed input or validation failure.",
        "401 Unauthorized: authentication is missing or has failed.",
        "403 Forbidden: the authenticated principal lacks permission, subject to the API's error-handling policy.",
        "409 Conflict can be used for duplicate registration when that behavior is intentionally exposed.",
        "Use generic credential-failure messages to reduce account enumeration.",
        "Log security events safely without logging secrets or raw credentials."
      ]
    },
    {
      id: "testing",
      title: "Testing Registration and Login APIs",
      paragraphs: [
        "Test successful registration, invalid input, duplicate accounts, successful login, incorrect passwords, and disabled or locked accounts when those states are supported.",
        "Verify password storage by checking that the database value differs from the raw password and that PasswordEncoder.matches returns true for the correct password.",
        "For JWT login tests, verify that the returned token can be validated by the configured JWT verifier, has the expected subject and expiration, and is rejected when invalid or expired. Also test that protected endpoints reject missing or invalid tokens."
      ],
      bullets: [
        "Registration with valid data creates one account.",
        "Registration rejects missing or malformed required fields.",
        "Duplicate registration does not create a second account.",
        "The stored password is an encoded hash, not the raw password.",
        "Correct credentials return a valid access token.",
        "Incorrect credentials do not return a valid access token.",
        "Expired or tampered tokens cannot access protected resources.",
        "Protected endpoints enforce authorization rules.",
        "Rate-limiting and security-event behavior should be tested where implemented."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      paragraphs: [
        "Authentication bugs often arise from mixing responsibilities, returning sensitive entity fields, or issuing tokens before credentials have been verified. Small design mistakes can create serious security weaknesses."
      ],
      bullets: [
        "Storing raw passwords instead of password hashes.",
        "Comparing encoded passwords with string equality rather than using PasswordEncoder.matches.",
        "Generating a JWT before AuthenticationManager succeeds.",
        "Returning a JPA entity that exposes the password hash.",
        "Allowing a client to choose its own privileged role during registration.",
        "Checking for duplicate email without enforcing a database unique constraint.",
        "Returning different public errors for unknown accounts and incorrect passwords.",
        "Logging raw passwords, complete tokens, or signing keys.",
        "Trusting JWT claims without verifying the token signature and required claims.",
        "Assuming permitAll disables all other security controls.",
        "Disabling CSRF without understanding whether credentials are automatically attached by the browser.",
        "Assuming refresh-token revocation automatically invalidates already-issued access tokens."
      ]
    },
    {
      id: "best-practices",
      title: "Registration and Login Best Practices",
      paragraphs: [
        "A secure authentication API combines input validation, safe password storage, reliable account persistence, controlled token issuance, consistent error handling, and operational monitoring. No single annotation or library provides all of these guarantees automatically."
      ],
      bullets: [
        "Use DTOs with Bean Validation for incoming requests.",
        "Use a suitable adaptive password hash such as BCrypt or another supported password-hashing algorithm.",
        "Keep password hashes and privileged fields out of API responses.",
        "Enforce unique account identifiers at the database level.",
        "Authenticate credentials through Spring Security's configured authentication components.",
        "Issue short-lived access tokens only after successful authentication.",
        "Validate JWT signature, expiration, issuer, audience when applicable, and other required claims.",
        "Protect signing keys with secret-management mechanisms and never commit them to source control.",
        "Use HTTPS, rate limiting, monitoring, and abuse protection.",
        "Choose token storage and CSRF controls according to the browser or client architecture.",
        "Document endpoint contracts and test both success and failure cases."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What happens during user registration in Spring Boot?",
          answer: "The application validates the request, checks whether the account identifier is already registered, encodes the password using a PasswordEncoder, saves the user through a repository, and returns a safe response DTO."
        },
        {
          question: "How does Spring Security authenticate a login request?",
          answer: "The application passes an Authentication object containing the submitted credentials to AuthenticationManager. An AuthenticationProvider, commonly DaoAuthenticationProvider, loads user details and verifies the password using the configured PasswordEncoder."
        },
        {
          question: "Why should passwords be encoded before storing them?",
          answer: "Password hashing protects the original password from being directly exposed if the database is compromised. The application verifies future login attempts against the stored hash instead of decrypting it."
        },
        {
          question: "What is the difference between encode() and matches()?",
          answer: "encode() produces a password hash for storage. matches() checks whether a submitted raw password corresponds to an existing encoded password."
        },
        {
          question: "What is AuthenticationManager?",
          answer: "AuthenticationManager is Spring Security's abstraction for processing authentication requests. It delegates credential verification to an appropriate authentication provider."
        },
        {
          question: "What is the role of UserDetailsService?",
          answer: "UserDetailsService loads user details, commonly from a database, for username/password authentication. A configured authentication provider uses those details and a PasswordEncoder to verify the credentials."
        },
        {
          question: "Why should registration and login use DTOs?",
          answer: "DTOs control which fields clients can submit and which information the API returns. They prevent accidental exposure of password hashes, internal entity fields, and privileged properties."
        },
        {
          question: "Why should JWT generation happen after authentication?",
          answer: "A token represents an authenticated identity or set of claims. Issuing it before credential verification could allow an unauthenticated user to obtain a token."
        },
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication verifies identity. Authorization determines which resources or operations that identity is allowed to access."
        },
        {
          question: "Why is a database unique constraint important for registration?",
          answer: "Two concurrent requests can both pass an application-level existence check. A unique database constraint prevents both requests from successfully creating the same account identifier."
        },
        {
          question: "Why should login errors avoid revealing whether an email exists?",
          answer: "Different public responses can allow attackers to enumerate registered accounts. A generic invalid-credentials message reduces that information leak."
        },
        {
          question: "What is the purpose of permitAll in Spring Security?",
          answer: "permitAll allows matching requests without requiring an authenticated principal. It does not remove validation, application-level checks, rate limiting, or other security controls."
        },
        {
          question: "Why might @RestControllerAdvice not handle every authentication error?",
          answer: "Some authentication failures occur in Spring Security filters before a controller is invoked. Those failures may need to be handled through an AuthenticationEntryPoint or AccessDeniedHandler."
        },
        {
          question: "What is a refresh token, and why might an application use one?",
          answer: "A refresh token can be exchanged for a new access token without asking the user to enter credentials again. It needs a deliberate lifecycle, storage, rotation, and revocation strategy."
        },
        {
          question: "How would you test a login API?",
          answer: "Test valid and invalid credentials, verify password hashing, confirm that successful authentication returns a verifiable token, and ensure invalid or expired tokens cannot access protected endpoints."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Registration creates the account and stores an encoded password. Login authenticates the submitted credentials through Spring Security. After successful authentication, the application issues an access token and returns it through a response DTO."
      ],
      bullets: [
        "Register: validate → check account identifier → encode password → save → return safe DTO.",
        "Login: receive credentials → authenticate → generate JWT → return token response.",
        "PasswordEncoder.encode() is for storing a password hash.",
        "PasswordEncoder.matches() is for verifying a submitted password.",
        "AuthenticationManager coordinates authentication through providers.",
        "JWT issuance is application behavior and does not happen automatically after password verification.",
        "JWT validation must happen when the token is presented to protected endpoints.",
        "Keep secrets, raw passwords, and password hashes out of API responses and logs."
      ]
    }
  ]
};
