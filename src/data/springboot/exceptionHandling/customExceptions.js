
export const customExceptions = {
  id: 706,

  title: "Custom Exceptions",

  slug: "custom-exceptions",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Learn how to create meaningful application-specific exceptions such as resource-not-found, duplicate-resource, and business-rule exceptions. Understand how to throw custom exceptions from service classes, handle them centrally with @RestControllerAdvice, map them to HTTP status codes, and test error scenarios.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "custom-exception",

      title: "What is a Custom Exception?",

      paragraphs: [
        "A custom exception is an application-specific exception class created to represent a meaningful failure condition in an application. It allows developers to describe a problem using terminology that belongs to the application's business domain.",

        "For example, an employee management application might need to report that an employee does not exist, an email address is already registered, or a requested business operation violates a rule. Instead of throwing a generic RuntimeException for every failure, we can create EmployeeNotFoundException, DuplicateResourceException, and BusinessRuleViolationException.",

        "A custom exception separates the meaning of a failure from the code that decides how to respond to it. The service layer can throw an EmployeeNotFoundException, while a centralized exception handler can translate that exception into an HTTP 404 response.",

        "Custom exceptions do not automatically produce a particular HTTP status code. The exception must be handled by Spring MVC, usually through @ExceptionHandler or @RestControllerAdvice, or through another appropriate error-handling mechanism.",

        "In Spring Boot applications, custom exceptions commonly extend RuntimeException because unchecked exceptions can propagate without requiring every calling method to declare them. Checked exceptions are also possible when the application has a specific reason to require explicit handling."
      ],

      code: {
        language: "java",
        code: `// Generic exception
throw new RuntimeException("Something went wrong");

// More meaningful application-specific exception
throw new EmployeeNotFoundException(
    "Employee not found with id: " + id
);`
      },

      bullets: [
        "A custom exception represents a meaningful application failure.",
        "It improves readability and communicates the reason for a failure.",
        "It can be handled differently from other exception types.",
        "It can be mapped to an appropriate HTTP status code.",
        "It should represent an actual failure condition, not ordinary application control flow.",
        "It does not replace input validation, database constraints, or centralized exception handling."
      ]
    },

    {
      id: "exception-hierarchy",

      title: "Java Exception Hierarchy and Custom Exceptions",

      paragraphs: [
        "Java organizes exceptions and errors under the Throwable class. Exception represents conditions that applications may handle, while Error generally represents serious problems that applications should not normally attempt to recover from.",

        "RuntimeException is a subclass of Exception. Exceptions that extend RuntimeException are unchecked, meaning the compiler does not require a method to declare them in a throws clause or require callers to catch them.",

        "When a custom exception extends RuntimeException, it participates in Java's normal exception propagation mechanism. Spring MVC can identify the exception type and use a matching exception handler if the exception reaches the MVC exception-resolution process."
      ],

      code: {
        language: "text",
        code: `Throwable
├── Error
└── Exception
    ├── IOException
    ├── SQLException
    └── RuntimeException
        ├── IllegalArgumentException
        ├── NullPointerException
        └── EmployeeNotFoundException
            (custom example)`
      },

      bullets: [
        "Use RuntimeException for application failures that do not need mandatory compile-time handling.",
        "Use a checked exception when explicitly requiring callers to handle or declare a failure is valuable.",
        "Choose the exception type based on its meaning and the application's error-handling design.",
        "Avoid catching Throwable or Error for ordinary business error handling."
      ]
    },

    {
      id: "not-found",

      title: "EmployeeNotFoundException",

      paragraphs: [
        "EmployeeNotFoundException represents a situation in which the application cannot find the requested employee. For example, a client might request GET /api/employees/500 when no employee with ID 500 exists.",

        "The exception class can extend RuntimeException and accept a message through its constructor. Calling super(message) passes the message to the parent exception class so it can be retrieved using getMessage().",

        "This exception describes the application failure. A separate exception handler can decide that this failure should produce HTTP 404 Not Found."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public class EmployeeNotFoundException
        extends RuntimeException {

    public EmployeeNotFoundException(String message) {
        super(message);
    }
}`
      },

      bullets: [
        "Use a clear name that communicates the missing resource.",
        "Accept useful context, such as the employee ID.",
        "Keep the exception class focused on representing the failure.",
        "Do not place controller response logic inside the exception class.",
        "Avoid including confidential information in exception messages that might reach API clients."
      ]
    },

    {
      id: "duplicate",

      title: "DuplicateResourceException",

      paragraphs: [
        "DuplicateResourceException represents an attempt to create or register a resource that conflicts with an application uniqueness rule. In an employee application, this might mean that an email address is already registered.",

        "A duplicate-resource exception is different from a not-found exception. A missing employee commonly maps to HTTP 404, whereas a conflicting resource commonly maps to HTTP 409 Conflict.",

        "The exception itself does not guarantee uniqueness. The service can check whether an email exists before saving, but concurrent requests may still race. A database unique constraint should enforce uniqueness when the rule must hold under concurrent access."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public class DuplicateResourceException
        extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}`
      },

      bullets: [
        "Use it when an operation conflicts with a uniqueness rule.",
        "Do not use it for every database error.",
        "Translate known unique-constraint violations into a suitable application error when necessary.",
        "Keep database constraints as the final protection against concurrent duplicates."
      ]
    },

    {
      id: "business-rule-exception",

      title: "BusinessRuleViolationException",

      paragraphs: [
        "A business-rule exception represents an operation that is not allowed by the application's domain rules. For example, an application might prevent an employee record from being deactivated while the employee has an unresolved administrative obligation.",

        "The exact rules depend on the application. A business-rule exception makes the failed rule explicit and allows the API to return a consistent response.",

        "Do not use a custom business exception merely to wrap every technical failure. Database connectivity problems and unexpected programming errors should remain distinguishable from business-rule violations."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public class BusinessRuleViolationException
        extends RuntimeException {

    public BusinessRuleViolationException(String message) {
        super(message);
    }
}`
      }
    },

    {
      id: "service",

      title: "Using Custom Exceptions in the Service",

      paragraphs: [
        "The service layer is a natural place to throw custom exceptions because it implements application and business logic. A repository retrieves or persists data, while the service interprets the result and decides whether the requested operation can proceed.",

        "In this example, findById asks the repository to retrieve an employee. The repository returns an Optional<Employee>. If the Optional is empty, orElseThrow creates and throws EmployeeNotFoundException. If the employee exists, the service maps it to an EmployeeResponse.",

        "The example assumes that Employee, EmployeeRepository, and EmployeeResponse already exist in the application. It also assumes that mapToResponse performs the entity-to-response mapping."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse findById(Long id) {

    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() ->
            new EmployeeNotFoundException(
                "Employee not found with id: " + id
            )
        );

    return mapToResponse(employee);
}`
      },

      bullets: [
        "Keep business decisions in the service layer.",
        "Use orElseThrow to handle an absent Optional.",
        "Avoid returning null when a missing resource should be reported as an error.",
        "Let the exception propagate to the configured handler when the service cannot complete the operation.",
        "Avoid catching the exception only to throw the same exception again without adding useful information."
      ]
    },

    {
      id: "duplicate-example",

      title: "Duplicate Employee Example",

      paragraphs: [
        "When creating an employee, the application may need to reject an email address that already exists. The service can perform an existence check and throw DuplicateResourceException if a matching employee is found.",

        "The example below shows the business check, but the employee creation logic must still construct the entity, save it, and return the response. The email existence check alone is not a guarantee against concurrent duplicate requests."
      ],

      code: {
        language: "java",
        code: `public EmployeeResponse create(
        EmployeeCreateRequest request) {

    if (employeeRepository.existsByEmail(
            request.email())) {

        throw new DuplicateResourceException(
            "Employee already exists with email: "
                + request.email()
        );
    }

    Employee employee = new Employee();
    employee.setName(request.name());
    employee.setEmail(request.email());

    Employee savedEmployee =
        employeeRepository.save(employee);

    return mapToResponse(savedEmployee);
}`
      },

      bullets: [
        "The repository needs a matching existsByEmail method.",
        "The request object in this example uses Java record-style accessors such as request.email(). Adapt these to getters if the DTO is a conventional Java class.",
        "Define a database unique constraint on email when uniqueness must be enforced.",
        "Handle a known unique-constraint violation separately if concurrent requests can attempt the same email.",
        "Avoid returning raw SQL or database exception details to the client."
      ]
    },

    {
      id: "exception-flow",

      title: "How a Custom Exception Flows Through Spring Boot",

      paragraphs: [
        "A custom exception normally moves from the service layer toward the web layer when it is not caught. Spring MVC can resolve the exception and select an applicable @ExceptionHandler method, including one declared in a @RestControllerAdvice class.",

        "The controller does not need to catch EmployeeNotFoundException and manually build an HTTP response in every endpoint. Centralized handling keeps response formatting and status-code mapping in one place.",

        "This flow applies when the exception reaches Spring MVC's exception-resolution mechanism. Exceptions raised earlier in the request pipeline, such as some security-filter failures, may need dedicated handling in the relevant filter or security configuration."
      ],

      code: {
        language: "text",
        code: `Client
  |
  | GET /api/employees/500
  v
Controller
  |
  v
EmployeeService
  |
  | EmployeeNotFoundException
  v
Spring MVC exception resolution
  |
  v
@RestControllerAdvice
  |
  | HTTP 404 + error response body
  v
Client`
      },

      bullets: [
        "The controller delegates work to the service.",
        "The service detects a missing resource and throws a custom exception.",
        "The exception propagates unless application code catches it.",
        "Spring MVC looks for an applicable exception handler.",
        "The handler returns an HTTP status and a response body.",
        "The client receives a meaningful error response instead of an unhandled server failure."
      ]
    },

    {
      id: "exception-handler",

      title: "Handling Custom Exceptions with @RestControllerAdvice",

      paragraphs: [
        "@RestControllerAdvice provides centralized exception handling for controller requests. It combines controller-advice behavior with response-body semantics, making it suitable for REST APIs.",

        "@ExceptionHandler identifies the exception type that a method handles. In this example, EmployeeNotFoundException maps to HTTP 404, while DuplicateResourceException maps to HTTP 409.",

        "The status codes shown here are deliberate application design choices. Spring does not automatically map every custom exception to these statuses simply because of the exception class name."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFound(
            EmployeeNotFoundException ex) {

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<String> handleDuplicateResource(
            DuplicateResourceException ex) {

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ex.getMessage());
    }

    @ExceptionHandler(BusinessRuleViolationException.class)
    public ResponseEntity<String> handleBusinessRuleViolation(
            BusinessRuleViolationException ex) {

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ex.getMessage());
    }
}`
      },

      bullets: [
        "Use @RestControllerAdvice for shared REST API exception handling.",
        "Use @ExceptionHandler to select the exception type handled by a method.",
        "Return a meaningful HTTP status code.",
        "Use a consistent response structure across endpoints.",
        "Keep exception handling separate from business logic.",
        "For production APIs, prefer a structured error DTO instead of a plain string response."
      ]
    },

    {
      id: "error-response",

      title: "Creating a Consistent Error Response DTO",

      paragraphs: [
        "Returning a plain string is sufficient for a small demonstration, but a structured error response is often more useful for real APIs. Clients can reliably read fields such as status, message, and path without parsing a sentence.",

        "A simple DTO can use Java's record feature when the project uses a compatible Java version. The following record is a response model, not an exception class.",

        "Avoid exposing stack traces, SQL statements, internal class names, secrets, or sensitive personal data in responses. Log appropriate diagnostic details on the server instead."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public record ApiErrorResponse(
    int status,
    String error,
    String message
) {
}`
      },

      bullets: [
        "status contains the HTTP status code.",
        "error contains a short status description.",
        "message contains a safe, client-facing explanation.",
        "A larger application can add a timestamp, request path, or validation details.",
        "Keep the response schema stable so frontend clients can depend on it."
      ]
    },

    {
      id: "complete-handler",

      title: "Returning Structured Error Responses",

      paragraphs: [
        "The global handler can return ApiErrorResponse instead of a plain string. ResponseEntity allows the handler to choose the HTTP status and response body explicitly.",

        "This example shows the two most common custom exceptions. The same approach can be extended to other known application failures."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(
            EmployeeNotFoundException ex) {

        ApiErrorResponse body = new ApiErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(body);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicate(
            DuplicateResourceException ex) {

        ApiErrorResponse body = new ApiErrorResponse(
            HttpStatus.CONFLICT.value(),
            "Conflict",
            ex.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(body);
    }
}`
      },

      code: {
        language: "json",
        code: `{
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found with id: 500"
}`
      },

      bullets: [
        "The response body is structured JSON.",
        "The HTTP status and body status should agree.",
        "The frontend can display the message or use the status to choose an action.",
        "Use a safe message rather than returning the complete exception or stack trace.",
        "For larger applications, consider a shared error response format across all APIs."
      ]
    },

    {
      id: "http-status-mapping",

      title: "Choosing the Correct HTTP Status Code",

      paragraphs: [
        "An exception describes a failure inside the application. An HTTP status code describes the outcome of an HTTP request. The exception handler connects these two concepts by translating a known application failure into an HTTP response.",

        "Choose status codes according to the API contract. The mappings below are common choices, but the appropriate status can depend on the operation and the API's documented behavior."
      ],

      bullets: [
        "EmployeeNotFoundException: commonly HTTP 404 Not Found.",
        "DuplicateResourceException: commonly HTTP 409 Conflict.",
        "BusinessRuleViolationException: often HTTP 400 Bad Request or HTTP 409 Conflict, depending on the rule and API semantics.",
        "Invalid request data: commonly HTTP 400 Bad Request.",
        "Unauthenticated request: commonly HTTP 401 Unauthorized.",
        "Authenticated caller lacking permission: commonly HTTP 403 Forbidden.",
        "Unexpected server failure: HTTP 500 Internal Server Error."
      ],

      code: {
        language: "text",
        code: `Known application exception
          |
          v
Global exception handler
          |
          +-- EmployeeNotFoundException
          |       -> 404 Not Found
          |
          +-- DuplicateResourceException
          |       -> 409 Conflict
          |
          +-- BusinessRuleViolationException
          |       -> 400 or 409, based on API design
          |
          +-- Unexpected exception
                  -> 500 Internal Server Error`
      }
    },

    {
      id: "repository-boundary",

      title: "Custom Exceptions and the Repository Layer",

      paragraphs: [
        "Repositories interact with the persistence layer. They may return an Optional, report an integrity violation, or throw a persistence-related exception. The service layer interprets these outcomes in the context of application requirements.",

        "For a simple missing-record lookup, findById(...).orElseThrow(...) is often the clearest approach. It turns an absent record into a meaningful application exception.",

        "Duplicate detection requires additional care. A pre-check such as existsByEmail can improve the error message, but two requests can both pass the check before either inserts its row. A database unique constraint is necessary when the uniqueness rule must be enforced reliably.",

        "When translating database exceptions, distinguish known constraint violations from unexpected database failures. Do not turn every DataIntegrityViolationException into DuplicateResourceException because integrity violations can also involve foreign keys and other constraints."
      ],

      bullets: [
        "Use Optional handling for straightforward not-found cases.",
        "Enforce important data-integrity rules in the database.",
        "Translate persistence failures only when their meaning is known.",
        "Avoid leaking SQL or database implementation details through the API.",
        "Keep database error translation narrow and test it against the database behavior used by the application."
      ]
    },

    {
      id: "scope",

      title: "Where Should Custom Exceptions Be Created and Handled?",

      paragraphs: [
        "Custom exceptions should be declared in a package that reflects their role in the application. For example, a small Spring Boot application might use an exception package for EmployeeNotFoundException, DuplicateResourceException, ApiErrorResponse, and GlobalExceptionHandler.",

        "The service layer generally throws application-specific exceptions when it detects a meaningful failure. The controller-advice layer translates those exceptions into HTTP responses. Repositories remain focused on persistence operations.",

        "This separation avoids coupling business services directly to HTTP response construction. It also makes service methods easier to test without starting an HTTP server."
      ],

      code: {
        language: "text",
        code: `com.example.employee
├── controller
│   └── EmployeeController.java
├── service
│   └── EmployeeService.java
├── repository
│   └── EmployeeRepository.java
├── entity
│   └── Employee.java
├── dto
│   ├── EmployeeCreateRequest.java
│   └── EmployeeResponse.java
└── exception
    ├── EmployeeNotFoundException.java
    ├── DuplicateResourceException.java
    ├── BusinessRuleViolationException.java
    ├── ApiErrorResponse.java
    └── GlobalExceptionHandler.java`
      }
    },

    {
      id: "testing",

      title: "Testing Custom Exceptions",

      paragraphs: [
        "Custom exceptions should be tested to verify that the application detects failure conditions correctly. A service unit test can check that a missing employee causes EmployeeNotFoundException to be thrown.",

        "A controller or integration test can verify that the exception handler translates the exception into the expected HTTP status and response body. This checks both the application behavior and the REST API contract.",

        "The examples below use JUnit 5 and assume that the service and repository have been set up for the test."
      ],

      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;

class EmployeeServiceTest {

    private EmployeeRepository employeeRepository;
    private EmployeeService employeeService;

    @Test
    void shouldThrowWhenEmployeeDoesNotExist() {
        Long id = 500L;

        when(employeeRepository.findById(id))
            .thenReturn(Optional.empty());

        assertThrows(
            EmployeeNotFoundException.class,
            () -> employeeService.findById(id)
        );
    }
}`
      },

      bullets: [
        "The test should arrange the repository response.",
        "The test should execute the service method.",
        "The test should assert the expected exception type.",
        "For a complete runnable unit test, initialize employeeRepository as a Mockito mock and construct employeeService with that mock, or use @Mock and @InjectMocks with an appropriate Mockito extension.",
        "Use MockMvc or an integration test to verify HTTP status codes and error response JSON.",
        "Also test successful requests so the error-handling changes do not break normal behavior."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes When Using Custom Exceptions",

      paragraphs: [
        "Custom exceptions make applications clearer when they represent specific failures. Poorly designed exceptions can have the opposite effect if they hide the original cause, expose sensitive data, or convert unrelated errors into misleading responses."
      ],

      bullets: [
        "Throwing RuntimeException for every application failure instead of describing the actual problem.",
        "Assuming a custom exception automatically maps to HTTP 404 or HTTP 409.",
        "Catching an exception and ignoring it, which can make a failed operation appear successful.",
        "Returning a success response after the requested operation failed.",
        "Exposing stack traces, SQL queries, credentials, or internal implementation details to clients.",
        "Mapping every database integrity violation to a duplicate-resource response.",
        "Depending only on existsByEmail without a database unique constraint.",
        "Using HTTP 500 for every known business failure when a more appropriate status is defined by the API.",
        "Creating many exception classes that have no distinct meaning or handling behavior.",
        "Adding HTTP-specific ResponseEntity logic to service methods when centralized handling would keep responsibilities clearer."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices for Custom Exceptions",

      bullets: [
        "Choose descriptive names such as EmployeeNotFoundException and DuplicateResourceException.",
        "Extend RuntimeException for application failures that are intended to be unchecked.",
        "Include useful diagnostic context in messages, while keeping client-visible information safe.",
        "Throw exceptions from the layer that understands the failure condition.",
        "Handle known application exceptions centrally with @RestControllerAdvice.",
        "Use a consistent error response DTO for REST APIs.",
        "Choose HTTP statuses according to the documented API contract.",
        "Preserve the original cause when wrapping a lower-level exception that needs translation.",
        "Enforce critical data-integrity rules with database constraints.",
        "Test both exception types and their HTTP mappings.",
        "Log unexpected failures appropriately on the server without exposing stack traces to clients.",
        "Do not use exceptions for normal branching when an ordinary return value is clearer."
      ]
    },

    {
      id: "interview",

      title: "Custom Exceptions Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is a custom exception in Java?",

          answer:
            "A custom exception is a user-defined exception class that represents an application-specific failure condition. For example, EmployeeNotFoundException can represent a request for an employee that does not exist."
        },

        {
          question: "2. Why do we create custom exceptions in Spring Boot?",

          answer:
            "We create custom exceptions to express business failures clearly, improve code readability, distinguish failure types, and handle them consistently through mechanisms such as @RestControllerAdvice."
        },

        {
          question: "3. Should custom application exceptions usually extend RuntimeException?",

          answer:
            "They commonly extend RuntimeException when unchecked exception behavior is appropriate. This avoids requiring every calling method to catch or declare the exception. Checked exceptions are also valid when explicit handling is useful."
        },

        {
          question: "4. What is EmployeeNotFoundException?",

          answer:
            "It is a custom exception used when the requested employee does not exist. A global exception handler commonly translates it into HTTP 404 Not Found."
        },

        {
          question: "5. What is DuplicateResourceException?",

          answer:
            "It represents an attempt to create a resource that conflicts with a uniqueness rule, such as registering an email that is already in use. A REST API commonly maps it to HTTP 409 Conflict."
        },

        {
          question: "6. What does super(message) do in a custom exception constructor?",

          answer:
            "It calls the parent exception constructor and stores the supplied message. The message can later be retrieved using getMessage()."
        },

        {
          question: "7. How do you throw a custom exception?",

          answer:
            "Use the throw keyword followed by an exception object. For example: throw new EmployeeNotFoundException(\"Employee not found\");"
        },

        {
          question: "8. How do you handle custom exceptions globally in Spring Boot?",

          answer:
            "Create a class annotated with @RestControllerAdvice and define methods annotated with @ExceptionHandler for the exception types that need centralized handling."
        },

        {
          question: "9. What is the purpose of @ExceptionHandler?",

          answer:
            "@ExceptionHandler identifies a controller or advice method that handles a particular exception type and creates the corresponding response."
        },

        {
          question: "10. What is the difference between @ControllerAdvice and @RestControllerAdvice?",

          answer:
            "@ControllerAdvice provides shared controller-related behavior. @RestControllerAdvice also applies response-body semantics, making it convenient for REST APIs that return JSON."
        },

        {
          question: "11. Does creating a custom exception automatically return HTTP 404?",

          answer:
            "No. A custom exception does not automatically determine the HTTP status. Configure an appropriate exception handler or another explicit mapping to return HTTP 404."
        },

        {
          question: "12. Why is HTTP 404 commonly used for EmployeeNotFoundException?",

          answer:
            "HTTP 404 means the requested resource was not found. It is a natural mapping when an API looks up an employee by ID and no matching employee exists."
        },

        {
          question: "13. Why is HTTP 409 commonly used for DuplicateResourceException?",

          answer:
            "HTTP 409 Conflict indicates that the request conflicts with the current state of a resource. It is commonly appropriate when a uniqueness rule prevents a duplicate creation."
        },

        {
          question: "14. Where should custom exceptions be thrown: controller, service, or repository?",

          answer:
            "For business and application failures, the service layer is often the best place because it understands the operation's meaning. The repository should focus on persistence, and controller advice should translate exceptions into HTTP responses."
        },

        {
          question: "15. What is the difference between throwing and handling an exception?",

          answer:
            "Throwing an exception signals that an operation failed. Handling it means responding to that failure, such as translating it into an HTTP status and error response."
        },

        {
          question: "16. Can one @RestControllerAdvice handle multiple custom exceptions?",

          answer:
            "Yes. It can define multiple @ExceptionHandler methods, each handling one or more relevant exception types."
        },

        {
          question: "17. What happens if a custom exception is not handled?",

          answer:
            "If it propagates through the Spring MVC request-processing path without a matching handler, Spring's normal exception-resolution and error-response mechanisms determine the result. An unhandled application exception commonly results in an HTTP 500 response."
        },

        {
          question: "18. What is the difference between a checked and an unchecked custom exception?",

          answer:
            "A checked custom exception extends Exception but not RuntimeException and must be caught or declared. An unchecked custom exception extends RuntimeException and does not have that compile-time requirement."
        },

        {
          question: "19. Should exception messages be returned directly to API clients?",

          answer:
            "Only when the message is safe and intended for clients. Avoid exposing stack traces, SQL details, internal paths, secrets, or sensitive data. A structured, client-safe error response is usually preferable."
        },

        {
          question: "20. Why use an error response DTO?",

          answer:
            "An error response DTO provides a consistent structure, such as status, error, and message. It allows frontend applications to process errors without parsing plain text."
        },

        {
          question: "21. What is the difference between a custom exception and a validation error?",

          answer:
            "A custom exception represents an application-defined failure. A validation error reports that supplied input violates validation constraints. Both can be handled centrally, but they may need different response details."
        },

        {
          question: "22. Should every database exception become DuplicateResourceException?",

          answer:
            "No. Database integrity failures can result from unique constraints, foreign-key constraints, or other data rules. Translate only failures whose actual meaning is known."
        },

        {
          question: "23. Is existsByEmail enough to guarantee unique employee emails?",

          answer:
            "No. Two concurrent requests can both pass the existence check. A database unique constraint is needed to enforce uniqueness reliably, and the application can translate the resulting known constraint violation into a suitable response."
        },

        {
          question: "24. How do you test a custom exception in the service layer?",

          answer:
            "Arrange the repository or dependency to produce the failure condition, invoke the service method, and use JUnit's assertThrows to verify that the expected exception is thrown."
        },

        {
          question: "25. How do you test the HTTP response for a custom exception?",

          answer:
            "Use MockMvc or an integration test to invoke the endpoint and assert the expected status code and response body. For example, verify that a missing employee returns HTTP 404."
        },

        {
          question: "26. What is the difference between EmployeeNotFoundException and NoSuchElementException?",

          answer:
            "EmployeeNotFoundException describes a specific application failure and provides clearer intent. NoSuchElementException is a general Java exception that may not communicate the API's domain meaning as clearly."
        },

        {
          question: "27. Can a custom exception contain a cause?",

          answer:
            "Yes. A custom exception can provide constructors that accept both a message and a Throwable cause. Passing the cause to super(message, cause) preserves the original exception for diagnostics."
        },

        {
          question: "28. How can a custom exception preserve the original cause?",

          answer:
            "Define a constructor such as public DataOperationException(String message, Throwable cause) { super(message, cause); }. Use it when translating a lower-level failure while retaining its diagnostic context."
        },

        {
          question: "29. Should service classes return ResponseEntity when throwing custom exceptions?",

          answer:
            "Usually not. Services commonly return application data or throw application exceptions. Controllers and centralized exception handlers manage HTTP-specific response details."
        },

        {
          question: "30. Explain custom exception handling in a Spring Boot interview.",

          answer:
            "I create custom exceptions such as EmployeeNotFoundException and DuplicateResourceException to represent application-specific failures. I throw them from the service layer when a business operation cannot continue. Then I use @RestControllerAdvice and @ExceptionHandler to translate them into appropriate HTTP statuses and a consistent error response. This separates business logic from HTTP error handling and makes the API easier to maintain and test."
        }
      ]
    },

    {
      id: "summary",

      title: "Lesson Summary",

      paragraphs: [
        "Custom exceptions make Spring Boot applications easier to understand by representing meaningful application failures with clear names. They are commonly thrown from the service layer and handled centrally with @RestControllerAdvice.",

        "A typical REST API maps a missing resource to HTTP 404 and a duplicate-resource conflict to HTTP 409. These mappings should be explicit and consistent with the API contract. Use structured, client-safe error responses and test both service behavior and HTTP responses."
      ],

      bullets: [
        "Create descriptive exception classes for meaningful application failures.",
        "Use RuntimeException when unchecked exception behavior is appropriate.",
        "Throw custom exceptions from the layer that understands the failure.",
        "Handle known exceptions with @ExceptionHandler.",
        "Use @RestControllerAdvice for centralized REST API error handling.",
        "Choose appropriate HTTP statuses and return consistent error bodies.",
        "Enforce uniqueness and other critical integrity rules at the database level.",
        "Test exceptions, error responses, and successful operations."
      ]
    }
  ]
};
