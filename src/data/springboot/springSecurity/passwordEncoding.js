
export const passwordEncoding = {
  id: 1106,
  title: "Password Encoding and PasswordEncoder",
  slug: "password-encoding",
  topicTitle: "Spring Security",
  description:
    "Learn how to store and verify passwords securely in a Spring Boot application.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "why-encoding",
      title: "Why Password Encoding Matters",
      paragraphs: [
        "Applications must never store user passwords as plain text. If the password database is exposed, plain-text passwords immediately reveal the original credentials.",
        "Password hashing algorithms designed for passwords make guessing attacks more expensive. Spring Security provides the PasswordEncoder abstraction to encode passwords and verify submitted passwords.",
        "Password hashing is a one-way process. The application normally stores a password hash rather than a reversible encrypted copy of the user's original password.",
        "During login, the application receives the submitted password and uses PasswordEncoder.matches() to determine whether it corresponds to the stored password hash."
      ],
      bullets: [
        "Never store plain-text passwords.",
        "Never log user passwords.",
        "Use a password hashing algorithm designed for password storage.",
        "Store the encoded password in the database.",
        "Use PasswordEncoder.matches() during authentication.",
        "Password hashing is different from reversible encryption."
      ]
    },

    {
      id: "hashing-vs-encryption",
      title: "Password Hashing vs Encryption",
      paragraphs: [
        "Hashing and encryption are different concepts. Encryption is designed to be reversible when the correct key is available. Password hashing is designed so that the original password is not recovered from the stored hash.",
        "For password storage, the application normally does not need to decrypt the stored password. It needs to verify whether a submitted password matches the stored password hash."
      ],
      code: {
        language: "text",
        code: `Password
   |
   v
Password Hashing
   |
   v
Stored Password Hash

Login Password
   |
   v
Password Verification
   |
   +---- Match ----> Authentication can continue
   |
   +---- No Match -> Authentication fails`
      },
      bullets: [
        "Encryption is intended to be reversible.",
        "Password hashing is intended for one-way verification.",
        "Do not store passwords using reversible encryption simply because they need to be 'secured'.",
        "Use a password-hashing mechanism designed for password storage."
      ]
    },

    {
      id: "password-encoder",
      title: "Configure BCrypt",
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`
      },
      paragraphs: [
        "BCryptPasswordEncoder uses BCrypt password hashing. Its encoded output contains information needed for verification, including salt and work-factor information.",
        "Declaring PasswordEncoder as a Spring bean allows services and authentication components to receive it through dependency injection.",
        "The application should use the PasswordEncoder abstraction rather than coupling application code directly to a specific password implementation wherever possible."
      ],
      bullets: [
        "BCrypt is designed for password hashing.",
        "PasswordEncoder is the Spring Security abstraction.",
        "PasswordEncoder can be injected into services.",
        "The encoded password is what should be persisted."
      ]
    },

    {
      id: "bcrypt-output",
      title: "Understanding a BCrypt Hash",
      paragraphs: [
        "A BCrypt encoded password is not simply the original password transformed into a fixed string.",
        "The encoded representation contains BCrypt metadata such as the algorithm identifier, cost information, salt, and derived password hash.",
        "Because a random salt is used, encoding the same password multiple times can produce different encoded values."
      ],
      code: {
        language: "text",
        code: `BCrypt encoded value

$2a$10$...............................
 |   |  |
 |   |  +---- Salt + derived hash
 |   |
 |   +------- Cost / work factor
 |
 +----------- BCrypt version identifier`
      },
      bullets: [
        "The encoded value contains BCrypt-specific information.",
        "The salt is part of the encoded representation.",
        "The work factor controls the computational cost.",
        "The stored encoded value is sufficient for PasswordEncoder.matches() to perform verification."
      ]
    },

    {
      id: "salt",
      title: "What Is a Salt?",
      paragraphs: [
        "A salt is a random value incorporated into password hashing. Its purpose is to ensure that identical passwords do not normally produce identical stored hashes.",
        "For example, if two users choose the same password, their BCrypt hashes can still be different because different salts are used.",
        "The salt does not need to be kept secret. It is stored as part of the encoded password representation."
      ],
      code: {
        language: "text",
        code: `User A
"Password123"
     |
     | Salt A
     v
BCrypt Hash A

User B
"Password123"
     |
     | Salt B
     v
BCrypt Hash B

Hash A != Hash B
even though the raw passwords are the same.`
      },
      bullets: [
        "Salt helps prevent identical passwords from having identical hashes.",
        "A unique random salt should be used for each password.",
        "The salt does not need to be secret.",
        "BCrypt manages salt generation as part of password encoding."
      ]
    },

    {
      id: "work-factor",
      title: "BCrypt Work Factor",
      paragraphs: [
        "BCrypt has a configurable computational cost, commonly called the work factor or cost factor.",
        "Increasing the cost makes password hashing and verification more computationally expensive. This is useful because password cracking involves trying many candidate passwords.",
        "The work factor should be selected according to the application's security requirements and available infrastructure. It should be strong enough to slow attackers without making normal authentication unnecessarily expensive."
      ],
      code: {
        language: "java",
        code: `PasswordEncoder passwordEncoder =
        new BCryptPasswordEncoder(12);`
      },
      bullets: [
        "Higher work factors increase computation cost.",
        "The correct value depends on the application's operational environment.",
        "Benchmark authentication operations before choosing a production setting.",
        "Do not blindly choose a cost value without considering server capacity."
      ]
    },

    {
      id: "encode",
      title: "Encode and Verify a Password",
      code: {
        language: "java",
        code: `String rawPassword = "ExamplePassword123!";

String encodedPassword =
    passwordEncoder.encode(rawPassword);

boolean matches = passwordEncoder.matches(
    rawPassword,
    encodedPassword
);`
      },
      paragraphs: [
        "Store encodedPassword, not rawPassword.",
        "To verify a login, call matches with the submitted raw password and the stored encoded password.",
        "Encoding the same password twice can produce different encoded values because password hashing uses a salt. Compare using matches() rather than comparing encoded strings directly."
      ],
      bullets: [
        "encode() creates the stored password representation.",
        "matches() verifies a submitted password against the stored representation.",
        "Do not compare two BCrypt encoded strings using equals() to authenticate a user.",
        "Do not encode the submitted password and compare the new hash directly with the stored hash."
      ]
    },

    {
      id: "same-password-different-hash",
      title: "Why the Same Password Produces Different Hashes",
      paragraphs: [
        "A common beginner mistake is expecting passwordEncoder.encode() to return exactly the same value every time for the same password.",
        "Because a random salt is used, two calls to encode() can produce different encoded values.",
        "This is expected behavior and is one reason PasswordEncoder.matches() must be used for verification."
      ],
      code: {
        language: "java",
        code: `String password = "ExamplePassword123!";

String hash1 =
    passwordEncoder.encode(password);

String hash2 =
    passwordEncoder.encode(password);

System.out.println(hash1.equals(hash2));
// Usually false

System.out.println(
    passwordEncoder.matches(password, hash1)
);
// true

System.out.println(
    passwordEncoder.matches(password, hash2)
);
// true`
      }
    },

    {
      id: "registration",
      title: "Use It During Registration",
      code: {
        language: "java",
        code: `User user = new User();

user.setUsername(request.username());

user.setPassword(
    passwordEncoder.encode(
        request.password()
    )
);

userRepository.save(user);`
      },
      paragraphs: [
        "This example assumes a request DTO, entity, repository, and injected PasswordEncoder.",
        "The raw password should exist only for the duration necessary to process the registration request and should never be persisted or logged.",
        "The application should also validate the request and enforce username or email uniqueness before creating the account."
      ],
      bullets: [
        "Validate registration input.",
        "Encode the password before persistence.",
        "Persist only the encoded password.",
        "Never log the raw password.",
        "Enforce username or email uniqueness."
      ]
    },

    {
      id: "registration-flow",
      title: "Registration Request Flow",
      paragraphs: [
        "During registration, the frontend sends the password to the backend over HTTPS. The backend validates the request, hashes the password using PasswordEncoder, and stores only the encoded representation."
      ],
      code: {
        language: "text",
        code: `React
  |
  | POST /api/auth/register
  | password = "ExamplePassword123!"
  v
Spring Boot Controller
  |
  v
Registration Service
  |
  | Validate request
  |
  | passwordEncoder.encode(...)
  v
Encoded Password
  |
  v
UserRepository
  |
  v
Database

Database stores:
    encoded password

Database does NOT store:
    raw password`
      }
    },

    {
      id: "login-verification",
      title: "Password Verification During Login",
      paragraphs: [
        "During login, the application should load the user's stored password hash and use PasswordEncoder.matches() with the password submitted by the client.",
        "The application should not decode or decrypt the stored password because password hashes are not intended to be reversible."
      ],
      code: {
        language: "java",
        code: `User user = userRepository
    .findByUsername(request.username())
    .orElseThrow(() ->
        new UsernameNotFoundException(
            "User not found"
        )
    );

boolean valid = passwordEncoder.matches(
    request.password(),
    user.getPassword()
);

if (!valid) {
    throw new BadCredentialsException(
        "Invalid credentials"
    );
}

// Continue authentication`
      },
      bullets: [
        "Load the stored encoded password.",
        "Use the submitted raw password as the first matches() argument.",
        "Use the stored encoded password as the second matches() argument.",
        "If matches() returns false, authentication should fail.",
        "Never attempt to decrypt a BCrypt password."
      ]
    },

    {
      id: "login-flow",
      title: "Complete Registration and Login Flow",
      code: {
        language: "text",
        code: `REGISTRATION

Raw Password
     |
     v
PasswordEncoder.encode()
     |
     v
Encoded Password
     |
     v
Database


LOGIN

Submitted Password
     |
     v
Load Stored Encoded Password
     |
     v
PasswordEncoder.matches()
     |
     +---- false ----> Authentication Failed
     |
     +---- true -----> Authentication Continues`
      }
    },

    {
      id: "password-encoder-injection",
      title: "Inject PasswordEncoder into a Service",
      paragraphs: [
        "PasswordEncoder can be injected into the service responsible for registration or password changes.",
        "This keeps password hashing in the application service layer instead of scattering password-handling logic across controllers."
      ],
      code: {
        language: "java",
        code: `@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(
            PasswordEncoder passwordEncoder,
            UserRepository userRepository) {

        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void register(String username,
                         String rawPassword) {

        User user = new User();

        user.setUsername(username);
        user.setPassword(
            passwordEncoder.encode(rawPassword)
        );

        userRepository.save(user);
    }
}`
      }
    },

    {
      id: "password-change",
      title: "Changing a Password",
      paragraphs: [
        "Password changes should follow the same principle as registration: never store the new raw password.",
        "The application should validate the current authentication and any required current password, apply password policy, encode the new password, and store the new encoded value."
      ],
      code: {
        language: "java",
        code: `public void changePassword(
        User user,
        String newRawPassword) {

    String encodedPassword =
        passwordEncoder.encode(newRawPassword);

    user.setPassword(encodedPassword);

    userRepository.save(user);
}`
      },
      bullets: [
        "Authorize the password-change operation.",
        "Validate the new password according to application policy.",
        "Encode the new password before persistence.",
        "Never store the new raw password.",
        "Consider invalidating existing sessions or refresh tokens after a password change."
      ]
    },

    {
      id: "delegating-password-encoder",
      title: "DelegatingPasswordEncoder",
      paragraphs: [
        "Spring Security also provides DelegatingPasswordEncoder, which supports password hashes identified by an encoding id.",
        "This is useful when an application needs to support multiple password encoding formats or gradually migrate users from an older hashing scheme to a newer one.",
        "The stored value commonly contains an identifier such as {bcrypt} so the application knows which encoder should verify the value."
      ],
      code: {
        language: "java",
        code: `import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

PasswordEncoder passwordEncoder =
    PasswordEncoderFactories
        .createDelegatingPasswordEncoder();`
      },
      bullets: [
        "DelegatingPasswordEncoder supports multiple encoding strategies.",
        "The stored value can identify the encoder used.",
        "It can help with gradual password-hash migration.",
        "The selected default encoder should be appropriate for the application's security requirements."
      ]
    },

    {
      id: "password-migration",
      title: "Password Hash Migration",
      paragraphs: [
        "A mature application may eventually need to migrate from an older password hashing algorithm to a stronger or better-supported one.",
        "One common approach is to verify the existing hash during login and, after successful authentication, re-encode the password using the newer encoder and update the stored value.",
        "This allows migration to happen gradually as users authenticate rather than requiring every password to be reset immediately."
      ],
      code: {
        language: "text",
        code: `Existing Password Hash
        |
        v
Verify submitted password
        |
        +---- Invalid --> Reject login
        |
        +---- Valid
              |
              v
      Encode using newer algorithm
              |
              v
       Update stored hash`
      }
    },

    {
      id: "password-policy",
      title: "Password Policy",
      paragraphs: [
        "Password hashing protects stored passwords, but applications should also define an appropriate password policy.",
        "The policy should balance security and usability. Length is generally more useful than arbitrary complexity rules alone, and the application can also consider breached-password screening and rate limiting depending on its threat model."
      ],
      bullets: [
        "Require an appropriate minimum password length.",
        "Consider checking passwords against known compromised-password lists.",
        "Avoid unnecessarily restrictive rules that encourage predictable passwords.",
        "Rate-limit repeated authentication failures.",
        "Consider account lockout or adaptive protections carefully to avoid denial-of-service problems."
      ]
    },

    {
      id: "credential-stuffing",
      title: "Protection Against Credential Stuffing",
      paragraphs: [
        "Strong password hashing protects the database if password hashes are stolen, but it does not stop attackers from trying previously leaked username-password combinations against the login endpoint.",
        "Credential-stuffing defenses operate at the authentication layer and can include rate limiting, anomaly detection, breached-password checks, multi-factor authentication, and other risk controls."
      ],
      bullets: [
        "Password hashing protects stored credentials.",
        "Rate limiting protects the login endpoint.",
        "MFA can reduce the impact of stolen passwords.",
        "Monitoring can identify unusual authentication behavior.",
        "Password reuse is a major risk when users reuse passwords across sites."
      ]
    },

    {
      id: "password-reset",
      title: "Password Reset Considerations",
      paragraphs: [
        "A password-reset system should not send users their existing password because the application should not be able to recover it from a secure password hash.",
        "Instead, the application should provide a secure reset flow using a short-lived, single-use reset mechanism and then hash the new password before storing it."
      ],
      code: {
        language: "text",
        code: `Forgot Password
      |
      v
Request Reset
      |
      v
Short-lived Reset Token
      |
      v
User Sets New Password
      |
      v
PasswordEncoder.encode()
      |
      v
Store New Password Hash`
      },
      bullets: [
        "Never email the existing password.",
        "Use a secure reset mechanism.",
        "Make reset tokens short-lived and single-use.",
        "Encode the new password before persistence."
      ]
    },

    {
      id: "database-design",
      title: "Database Design for Passwords",
      paragraphs: [
        "The password column should store the encoded password representation, not the raw password.",
        "The column should be large enough for the chosen password-encoding format because encoded representations can have different lengths depending on the algorithm and configuration."
      ],
      code: {
        language: "java",
        code: `@Column(name = "password", nullable = false)
private String password;`
      },
      bullets: [
        "Store the encoded representation.",
        "Do not name or document the field in a way that encourages storing plaintext.",
        "Choose sufficient database column length for the selected encoding format.",
        "Restrict direct database access to authorized personnel and services."
      ]
    },

    {
      id: "testing",
      title: "Testing Password Encoding",
      paragraphs: [
        "Password encoding should be tested at the service or authentication layer.",
        "The important behavior is that a valid password matches its encoded representation while an incorrect password does not."
      ],
      code: {
        language: "java",
        code: `@Test
void shouldEncodeAndVerifyPassword() {

    String rawPassword = "ExamplePassword123!";

    String encoded =
        passwordEncoder.encode(rawPassword);

    assertNotEquals(
        rawPassword,
        encoded
    );

    assertTrue(
        passwordEncoder.matches(
            rawPassword,
            encoded
        )
    );

    assertFalse(
        passwordEncoder.matches(
            "WrongPassword",
            encoded
        )
    );
}`
      },
      bullets: [
        "Verify the raw password is not stored as the encoded value.",
        "Verify the correct password matches.",
        "Verify an incorrect password does not match.",
        "Do not write tests that depend on a fixed BCrypt hash for a password."
      ]
    },

    {
      id: "common-mistakes",
      title: "Common Password Security Mistakes",
      bullets: [
        "Storing plain-text passwords.",
        "Logging passwords during registration or login.",
        "Using reversible encryption instead of password hashing for password storage.",
        "Comparing BCrypt encoded strings directly.",
        "Calling encode() on the login password and comparing the resulting hash with the database hash.",
        "Using an inappropriate fast general-purpose hash such as plain SHA-256 for password storage.",
        "Using an unnecessarily weak password-hashing configuration.",
        "Choosing an expensive work factor without benchmarking server capacity.",
        "Hard-coding a single salt for every user.",
        "Implementing custom password hashing instead of using a well-tested password encoder.",
        "Returning passwords or password hashes in API responses.",
        "Failing to protect the login endpoint against repeated automated attempts.",
        "Sending existing passwords through email during password recovery."
      ]
    },

    {
      id: "best-practices",
      title: "Password Security Best Practices",
      bullets: [
        "Never store or log plain-text passwords.",
        "Use a password-hashing algorithm intended for passwords.",
        "Use PasswordEncoder.matches() to verify submitted passwords.",
        "Use a unique random salt for each password.",
        "Choose an appropriate work factor based on security requirements and operational capacity.",
        "Use HTTPS for credentials in transit.",
        "Use strong password-reset flows.",
        "Consider rate limiting and credential-stuffing defenses.",
        "Consider multi-factor authentication for sensitive applications.",
        "Never return password hashes through REST APIs.",
        "Restrict database access.",
        "Keep security dependencies patched.",
        "Plan for password-hash migration when algorithms or security requirements change."
      ]
    },

    {
      id: "complete-flow",
      title: "Complete Password Security Flow",
      paragraphs: [
        "The following flow summarizes how a password should move through a typical Spring Boot application."
      ],
      code: {
        language: "text",
        code: `REGISTRATION

React
  |
  | Raw password over HTTPS
  v
Controller
  |
  v
Service
  |
  | passwordEncoder.encode()
  v
Encoded Password
  |
  v
Repository
  |
  v
Database


LOGIN

React
  |
  | Username + raw password over HTTPS
  v
Spring Security
  |
  v
Load User
  |
  v
Stored Encoded Password
  |
  v
passwordEncoder.matches()
  |
  +---- false ----> Authentication Failed
  |
  +---- true -----> Authentication Success
                         |
                         v
                   Authorization`
      }
    },

    {
      id: "interview",
      title: "Interview Questions",
      interviewQuestions: [
        {
          question: "What is PasswordEncoder?",
          answer:
            "PasswordEncoder is a Spring Security abstraction used to encode passwords and verify submitted passwords against stored encoded values."
        },
        {
          question: "Why should passwords be hashed instead of stored as plaintext?",
          answer:
            "If the database is compromised, plaintext passwords immediately expose user credentials. Password hashing makes recovering passwords from stored values significantly more difficult."
        },
        {
          question: "Why can't we compare BCrypt encoded strings directly?",
          answer:
            "BCrypt uses a random salt, so the same raw password can produce different encoded values. Use PasswordEncoder.matches() to verify the password."
        },
        {
          question: "What is the difference between encode() and matches()?",
          answer:
            "encode() creates the stored password representation from a raw password. matches() verifies whether a submitted raw password corresponds to a stored encoded password."
        },
        {
          question: "What is a salt?",
          answer:
            "A salt is a random value incorporated into password hashing so that identical passwords do not normally produce identical hashes."
        },
        {
          question: "Does the salt need to be secret?",
          answer:
            "No. The salt is normally stored as part of the encoded password representation. Its purpose is to make password hashing unique and resistant to precomputed attacks."
        },
        {
          question: "What is the BCrypt work factor?",
          answer:
            "The work factor controls the computational cost of BCrypt hashing. Increasing it makes password hashing and verification more expensive and can make large-scale password guessing more costly."
        },
        {
          question: "Why not use plain SHA-256 for password storage?",
          answer:
            "SHA-256 is a fast general-purpose hash and is not designed to make password guessing expensive. Password storage should use a password-hashing algorithm designed with an appropriate computational cost."
        },
        {
          question: "Can BCrypt passwords be decrypted?",
          answer:
            "No. BCrypt is a password-hashing mechanism, not reversible encryption. The application verifies a submitted password using the stored hash."
        },
        {
          question: "Where should PasswordEncoder be used?",
          answer:
            "It should be used when creating or changing passwords and when verifying submitted passwords during authentication."
        },
        {
          question: "Why does the same password produce different BCrypt hashes?",
          answer:
            "Because BCrypt uses a random salt. The different salt causes different encoded values even when the raw password is identical."
        },
        {
          question: "What should be stored in the database?",
          answer:
            "The encoded password representation should be stored, never the raw password."
        },
        {
          question: "How do you protect against credential stuffing?",
          answer:
            "Use controls such as rate limiting, anomaly detection, breached-password checks, multi-factor authentication, and monitoring in addition to secure password hashing."
        }
      ]
    },

    {
      id: "scenario-interview",
      title: "Scenario-Based Interview Questions",
      interviewQuestions: [
        {
          question:
            "A developer encodes the login password and compares it using equals() with the database value. Why can this fail with BCrypt?",
          answer:
            "BCrypt uses a random salt, so encoding the same password again can produce a different encoded value. The correct approach is passwordEncoder.matches(rawPassword, storedEncodedPassword)."
        },
        {
          question:
            "A database backup was leaked. Why is storing BCrypt hashes safer than storing plaintext passwords?",
          answer:
            "BCrypt hashes are not reversible like encrypted plaintext, and their computational cost makes large-scale password guessing more expensive. The application should still assume attackers may attempt offline guessing and use an appropriate password-hashing configuration."
        },
        {
          question:
            "A user forgot their password. Can the application decrypt the old BCrypt password and email it?",
          answer:
            "No. BCrypt is not designed to be decrypted. The application should use a secure password-reset flow and allow the user to set a new password, which is then encoded before storage."
        },
        {
          question:
            "Why might an application use DelegatingPasswordEncoder?",
          answer:
            "It can support multiple password encoding formats and help applications migrate from older password hashes to a newer algorithm or configuration."
        },
        {
          question:
            "The application increases the BCrypt work factor. What should the team consider?",
          answer:
            "The higher work factor increases authentication computation. The team should benchmark the new setting against expected authentication traffic and available server capacity while balancing security and performance."
        },
        {
          question:
            "The developer stores the password hash in the UserResponse DTO. Is that safe?",
          answer:
            "No. Password hashes are sensitive authentication data and should not be returned through normal API responses. The API response DTO should omit password information entirely."
        }
      ]
    },

    {
      id: "quick-reference",
      title: "Quick Revision",
      bullets: [
        "Never store plain-text passwords.",
        "PasswordEncoder is Spring Security's password encoding abstraction.",
        "BCrypt is designed for password hashing.",
        "encode() creates the stored encoded representation.",
        "matches() verifies a submitted password.",
        "Do not compare BCrypt hashes using equals().",
        "BCrypt uses a random salt.",
        "The salt causes the same password to produce different hashes.",
        "The salt does not need to be secret.",
        "BCrypt has a configurable work factor.",
        "Do not use fast general-purpose hashes such as plain SHA-256 for password storage.",
        "Use HTTPS for credentials in transit.",
        "Rate-limit authentication attempts.",
        "Protect password-reset flows.",
        "Never return password hashes from APIs.",
        "Consider DelegatingPasswordEncoder for multiple hash formats and migration.",
        "Password hashing is different from encryption.",
        "Password hashing does not replace authentication rate limiting or MFA."
      ]
    },

    {
      id: "revision-notes",
      title: "Important Notes for Interview",
      paragraphs: [
        "The most important rule is: never store the raw password. Store only a secure password-hash representation.",
        "Remember the two most important PasswordEncoder methods: encode() is used when creating or changing a password, while matches() is used when verifying a submitted password against the stored encoded password.",
        "The classic interview question is: 'Why can't we compare two BCrypt hashes directly?' The answer is that BCrypt uses a random salt, so the same password can produce different encoded values. PasswordEncoder.matches() knows how to extract the necessary information from the stored hash and perform verification.",
        "BCrypt is intentionally slower than a fast general-purpose hash because password hashing should make large-scale password guessing more expensive. The work factor should be chosen based on security requirements and the application's available computational capacity.",
        "Remember that hashing is not the same as encryption. Encryption is designed to be reversible with a key, while password hashing is intended for one-way verification.",
        "A strong interview answer is: 'In Spring Security, I define a PasswordEncoder bean, commonly using BCrypt or an appropriate delegating encoder. During registration I call encode() and store only the encoded value. During login I load the stored encoded password and call matches() with the submitted raw password. I never store or log plaintext passwords and I protect authentication endpoints with HTTPS and appropriate rate-limiting controls.'"
      ]
    }
  ]
};
