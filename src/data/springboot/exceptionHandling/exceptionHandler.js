
export const exceptionHandler = {
  id: 704,

  title: "@ExceptionHandler",

  slug: "exception-handler",

  topicTitle: "Spring Boot Exception Handling",

  description:
    "Understand @ExceptionHandler and learn how to handle specific exceptions inside Spring MVC controllers, return structured error responses, choose HTTP status codes, and centralize error handling with @RestControllerAdvice.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "annotation",

      title: "What is @ExceptionHandler?",

      paragraphs: [
        "@ExceptionHandler is a Spring MVC annotation used to define a method that handles a particular exception type. Instead of allowing a known exception to produce an uncontrolled server error, the application can translate it into a meaningful HTTP response.",

        "For example, an employee API might throw EmployeeNotFoundException when a requested employee does not exist. An @ExceptionHandler method can catch that exception within Spring MVC's exception-resolution process and return HTTP 404 Not Found.",

        "@ExceptionHandler can be declared inside a controller for local exception handling or inside a controller-advice component for centralized handling. The location determines the scope in which the handler participates.",

        "An exception handler can return a ResponseEntity, a response DTO, a String, or another supported return type. ResponseEntity is useful when the handler needs explicit control over the HTTP status and response body.",

        "The annotation does not automatically handle every failure in the entire application. Exceptions raised in filters, Spring Security components, or other infrastructure layers may require their own error-handling mechanisms."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(EmployeeNotFoundException.class)
public ResponseEntity<String> handleEmployeeNotFound(
        EmployeeNotFoundException exception) {

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(exception.getMessage());
}`
      },

      bullets: [
        "@ExceptionHandler identifies a method that handles a specified exception type.",
        "Spring MVC selects an applicable handler when an exception reaches its exception-resolution mechanism.",
        "A local handler belongs to a controller.",
        "A global handler is commonly declared in a class annotated with @RestControllerAdvice.",
        "The handler can return an HTTP status and a structured response body.",
        "The exception type and response status should reflect the actual failure."
      ]
    },

    {
      id: "exception-flow",

      title: "How @ExceptionHandler Works Internally",

      paragraphs: [
        "When a controller method throws an exception that is not handled inside the method, the exception propagates through Spring MVC's request-processing flow. Spring MVC uses its exception-resolution mechanism to find an appropriate handler.",

        "The handler may be defined in the same controller or in a controller-advice component. Spring considers applicable exception handlers and their exception-type matches when resolving the failure.",

        "If an appropriate handler is found, Spring invokes it and processes its return value to create the HTTP response. If no applicable handler resolves the exception, the remaining exception resolvers and normal error-processing mechanisms determine the outcome."
      ],

      code: {
        language: "text",
        code: `HTTP request
     |
     v
DispatcherServlet
     |
     v
Controller method
     |
     | Exception is thrown
     v
Spring MVC exception resolution
     |
     +--> Local @ExceptionHandler
     |
     +--> Applicable @ControllerAdvice handler
     |
     v
HTTP response
     |
     +--> Status code
     +--> Response headers
     +--> Response body`
      },

      bullets: [
        "The client sends an HTTP request.",
        "DispatcherServlet coordinates Spring MVC request processing.",
        "The controller method executes and may throw an exception.",
        "Spring MVC attempts to resolve the exception using configured resolvers.",
        "An applicable exception handler creates the response.",
        "The client receives the resulting HTTP status and body."
      ]
    },

    {
      id: "local-handler",

      title: "Local Exception Handling",

      paragraphs: [
        "Local exception handling means defining an @ExceptionHandler method inside a controller. This is useful when an exception has meaning specific to that controller or when the handling behavior should not apply to unrelated controllers.",

        "In the example, EmployeeController exposes an endpoint for retrieving an employee. If employeeService.findById(id) throws EmployeeNotFoundException, the local handler can translate the exception into HTTP 404.",

        "The exception handler does not need to be called manually from getEmployee. Spring MVC discovers and invokes the handler when the exception propagates through the controller-processing mechanism.",

        "The example assumes EmployeeService and EmployeeResponse are existing application types and that the service throws EmployeeNotFoundException when the requested employee does not exist."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.controller;

import com.example.employee.dto.EmployeeResponse;
import com.example.employee.exception.EmployeeNotFoundException;
import com.example.employee.service.EmployeeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(
            @PathVariable Long id) {

        return employeeService.findById(id);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFound(
            EmployeeNotFoundException exception) {

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(exception.getMessage());
    }
}`
      },

      bullets: [
        "The handler is declared inside EmployeeController.",
        "It handles EmployeeNotFoundException for requests processed by that controller.",
        "ResponseEntity sets the response status and body.",
        "Constructor injection provides the service dependency.",
        "Local handlers are suitable for controller-specific behavior.",
        "Repeated handlers across many controllers may be better centralized."
      ]
    },

    {
      id: "responseentity",

      title: "Returning ResponseEntity",

      paragraphs: [
        "ResponseEntity is a Spring type that represents an HTTP response, including its status, headers, and body. It is particularly useful in exception handlers because different exception types often require different HTTP statuses.",

        "For example, EmployeeNotFoundException commonly maps to HTTP 404 Not Found, while DuplicateResourceException commonly maps to HTTP 409 Conflict.",

        "The response body can be a plain String for a simple example or a structured DTO for a production REST API. A structured DTO gives frontend clients predictable fields to process.",

        "The response status should reflect the API's documented meaning for the exception. A custom exception does not automatically determine its HTTP status."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(EmployeeNotFoundException.class)
public ResponseEntity<ErrorResponse> handleEmployeeNotFound(
        EmployeeNotFoundException exception) {

    ErrorResponse response = new ErrorResponse(
        404,
        exception.getMessage()
    );

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(response);
}`
      },

      bullets: [
        "ResponseEntity<T> allows a typed response body.",
        "status(...) explicitly chooses an HTTP status.",
        "body(...) sets the response body.",
        "headers(...) can be used when response headers need to be added.",
        "Use a shared error DTO to keep responses consistent across endpoints."
      ]
    },

    {
      id: "multiple-exceptions",

      title: "Handling Different Exceptions",

      paragraphs: [
        "A controller can declare multiple @ExceptionHandler methods. Each method can handle a different exception type and return a suitable response.",

        "For example, a missing employee can map to HTTP 404, while an invalid argument can map to HTTP 400. The correct mapping depends on the meaning of the exception and the API contract.",

        "Avoid returning a successful HTTP status for a failed operation. Known client errors should generally use appropriate 4xx statuses, while unexpected server-side failures commonly use HTTP 500."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(EmployeeNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(
        EmployeeNotFoundException exception) {

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse(
            404,
            exception.getMessage()
        ));
}

@ExceptionHandler(IllegalArgumentException.class)
public ResponseEntity<ErrorResponse> handleIllegalArgument(
        IllegalArgumentException exception) {

    return ResponseEntity
        .badRequest()
        .body(new ErrorResponse(
            400,
            exception.getMessage()
        ));
}`
      },

      bullets: [
        "Each handler should have a clear responsibility.",
        "Different exception types can produce different status codes.",
        "A handler can accept the exception object to inspect its message or other details.",
        "Avoid broad handlers that accidentally convert unrelated failures into misleading client errors.",
        "Consider a common response-building method to avoid repeated code."
      ]
    },

    {
      id: "local-vs-global",

      title: "Local vs Global Exception Handling",

      paragraphs: [
        "A local @ExceptionHandler is declared in a specific controller. It is useful when a failure is specific to that controller or requires special handling there.",

        "Global exception handling is commonly implemented with @RestControllerAdvice. The advice component can define @ExceptionHandler methods that apply across controllers within its configured scope.",

        "For example, EmployeeNotFoundException may be relevant to several endpoints. A global handler avoids duplicating the same status mapping and error response construction in every controller.",

        "Local and global handlers can coexist. Spring MVC considers applicable handlers when resolving an exception, with controller-local handling generally taking precedence over applicable advice handlers for the same exception resolution. More-specific exception matches also matter.",

        "For most REST APIs, centralized handling is a good default for common application exceptions, while local handling remains useful for genuinely controller-specific behavior."
      ],

      code: {
        language: "text",
        code: `Local handling
  |
  +--> @ExceptionHandler inside EmployeeController
  |
  +--> Intended for that controller's request handling

Global handling
  |
  +--> @RestControllerAdvice
  |
  +--> @ExceptionHandler inside the advice
  |
  +--> Shared handling across applicable controllers`
      },

      bullets: [
        "Local handling keeps controller-specific behavior close to the controller.",
        "Global handling avoids repeating common exception logic.",
        "@RestControllerAdvice combines controller-advice behavior with response-body semantics.",
        "Choose the scope based on where the exception should be handled.",
        "Avoid maintaining identical response-building logic in many controllers."
      ]
    },

    {
      id: "global-handler",

      title: "Using @ExceptionHandler with @RestControllerAdvice",

      paragraphs: [
        "For a REST API with several controllers, @RestControllerAdvice provides a centralized place to handle common exceptions. Its @ExceptionHandler methods can return a shared error response DTO.",

        "The example below assumes that EmployeeNotFoundException, DuplicateResourceException, and ErrorResponse already exist. The response record shown here contains a status and a message.",

        "Centralization makes response formatting easier to maintain. If the API later adds fields such as timestamp or path, the application can update the shared response design without duplicating the change across every controller."
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
    public ResponseEntity<ErrorResponse> handleNotFound(
            EmployeeNotFoundException exception) {

        ErrorResponse response = new ErrorResponse(
            404,
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(
            DuplicateResourceException exception) {

        ErrorResponse response = new ErrorResponse(
            409,
            exception.getMessage()
        );

        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
    }
}`
      },

      bullets: [
        "Place shared exception handlers in a dedicated advice class.",
        "Use a consistent response DTO.",
        "Map known exception types to appropriate statuses.",
        "Keep business decisions in the service layer.",
        "Use local handlers only when controller-specific handling is justified."
      ]
    },

    {
      id: "structured-response",

      title: "Returning a Structured JSON Error",

      paragraphs: [
        "A plain string can be sufficient for a demonstration, but frontend applications usually benefit from a predictable JSON response. An ErrorResponse record is a simple way to define that contract.",

        "Spring Boot can serialize the record as JSON when the application uses a compatible Java version and JSON configuration. The handler returns the DTO through ResponseEntity.",

        "In a larger API, the DTO may include timestamp, status, error category, message, path, and field-level validation details. Do not include internal stack traces or sensitive technical details in the client response."
      ],

      code: {
        language: "java",
        code: `package com.example.employee.exception;

public record ErrorResponse(
    int status,
    String message
) {
}`
      },

      code: {
        language: "json",
        code: `{
  "status": 404,
  "message": "Employee not found with id: 10"
}`
      },

      bullets: [
        "The DTO defines the JSON response structure.",
        "The HTTP status should match the status field in the body.",
        "A shared response model helps frontend applications process errors consistently.",
        "A production API can add more context when required.",
        "Messages should be safe to expose to API clients."
      ]
    },

    {
      id: "exception-specificity",

      title: "Exception Type Matching and Handler Selection",

      paragraphs: [
        "An exception handler can declare one or more exception types. Spring MVC looks for an applicable handler based on the exception that occurred and the exception types declared by available handlers.",

        "More-specific exception handlers are generally preferred over handlers for broader parent types when both are applicable in the same handler scope. For example, a handler for EmployeeNotFoundException is more specific than a handler for RuntimeException when the thrown exception is EmployeeNotFoundException.",

        "Be careful when adding broad handlers. A handler for RuntimeException can also match many unrelated application exceptions. If it returns HTTP 400 for everything, genuine server-side failures may be incorrectly reported as client errors.",

        "When handling wrapped exceptions, consider which exception type Spring MVC sees during resolution and whether a handler for the outer or nested cause is appropriate. Avoid creating overlapping handlers without understanding their selection behavior."
      ],

      code: {
        language: "java",
        code: `@ExceptionHandler(EmployeeNotFoundException.class)
public ResponseEntity<String> handleNotFound(
        EmployeeNotFoundException exception) {

    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(exception.getMessage());
}

@ExceptionHandler(RuntimeException.class)
public ResponseEntity<String> handleRuntimeException(
        RuntimeException exception) {

    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("An unexpected server error occurred");
}`
      },

      bullets: [
        "Prefer specific handlers for known application failures.",
        "Use broad handlers cautiously.",
        "Do not classify every RuntimeException as a client error.",
        "Keep the client message generic for unexpected failures.",
        "Log unexpected failures on the server using appropriate logging practices."
      ]
    },

    {
      id: "common-mistakes",

      title: "Common Mistakes When Using @ExceptionHandler",

      bullets: [
        "Forgetting to annotate the handler method with @ExceptionHandler.",
        "Declaring a handler for an exception that does not represent the intended failure.",
        "Returning HTTP 200 for an operation that failed.",
        "Using HTTP 500 for every known validation or business failure.",
        "Returning raw stack traces, SQL details, or sensitive information.",
        "Duplicating identical exception-handling code across many controllers.",
        "Using an overly broad RuntimeException handler that hides the real failure category.",
        "Assuming @RestControllerAdvice handles failures raised before Spring MVC controller processing.",
        "Catching exceptions in the service and ignoring them.",
        "Returning a different error JSON format from each endpoint without an intentional API contract."
      ]
    },

    {
      id: "testing",

      title: "Testing an @ExceptionHandler",

      paragraphs: [
        "Testing should verify that the exception is translated into the expected HTTP status and response body. A service unit test can check that the service throws the expected exception, while a Spring MVC test can check that the handler produces the correct response.",

        "The following MockMvc example assumes EmployeeController is configured in the test context, its service dependency is mocked to throw EmployeeNotFoundException for ID 10, and the controller contains the local handler shown earlier.",

        "The exact test annotations and mock configuration can vary with the Spring Boot version. The important part is asserting the observable HTTP behavior."
      ],

      code: {
        language: "java",
        code: `import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    void missingEmployeeReturns404() throws Exception {

        when(employeeService.findById(10L))
            .thenThrow(
                new EmployeeNotFoundException(
                    "Employee not found with id: 10"
                )
            );

        mockMvc.perform(get("/api/employees/10"))
            .andExpect(status().isNotFound())
            .andExpect(content().string(
                "Employee not found with id: 10"
            ));
    }
}`
      },

      bullets: [
        "Mock the service so the test reliably triggers the exception.",
        "Use MockMvc to execute the controller request.",
        "Assert the HTTP status code.",
        "Assert the response body or relevant JSON fields.",
        "For a global handler, ensure the advice is included in the test context.",
        "Use the mock-bean annotation supported by the Spring Boot version in your project; newer versions may provide alternatives to @MockBean.",
        "Also test successful requests and other exception types."
      ]
    },

    {
      id: "best-practices",

      title: "Best Practices for @ExceptionHandler",

      bullets: [
        "Use @ExceptionHandler for known exception types that need deliberate response mapping.",
        "Use @RestControllerAdvice to centralize common REST API exception handling.",
        "Return appropriate HTTP status codes.",
        "Use a consistent error response DTO.",
        "Keep exception messages concise and safe for clients.",
        "Avoid exposing stack traces or database implementation details.",
        "Prefer specific handlers over broad exception matching where possible.",
        "Do not mix business rules with HTTP response construction in the service layer.",
        "Test the HTTP contract with MockMvc or integration tests.",
        "Use dedicated security error handling for failures raised by Spring Security filters when needed."
      ]
    },

    {
      id: "interview",

      title: "@ExceptionHandler Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "1. What is @ExceptionHandler?",

          answer:
            "@ExceptionHandler is a Spring MVC annotation that identifies a method for handling one or more exception types and producing an appropriate response."
        },

        {
          question: "2. Where can @ExceptionHandler be used?",

          answer:
            "It can be declared inside a controller for local exception handling or inside a controller-advice component for centralized handling."
        },

        {
          question: "3. Why use ResponseEntity in an exception handler?",

          answer:
            "ResponseEntity allows the application to control the HTTP status, headers, and response body explicitly."
        },

        {
          question: "4. What is local exception handling?",

          answer:
            "Local exception handling means declaring an @ExceptionHandler method inside a specific controller so that it can handle applicable exceptions for that controller's request processing."
        },

        {
          question: "5. What is global exception handling?",

          answer:
            "Global exception handling uses a controller-advice component, commonly annotated with @RestControllerAdvice, to handle exceptions across applicable controllers."
        },

        {
          question: "6. What is the difference between @ControllerAdvice and @RestControllerAdvice?",

          answer:
            "@ControllerAdvice provides shared controller-related behavior. @RestControllerAdvice also applies response-body semantics, making it convenient for REST APIs that return JSON."
        },

        {
          question: "7. Can one controller contain multiple @ExceptionHandler methods?",

          answer:
            "Yes. A controller can declare multiple handlers for different exception types, allowing each failure to produce an appropriate response."
        },

        {
          question: "8. Can one @ExceptionHandler method handle multiple exception types?",

          answer:
            "Yes. The annotation can declare multiple exception classes when they share suitable handling behavior and a common response strategy."
        },

        {
          question: "9. Does @ExceptionHandler automatically return HTTP 404?",

          answer:
            "No. The handler must return or configure the appropriate status, for example by using ResponseEntity.status(HttpStatus.NOT_FOUND)."
        },

        {
          question: "10. What happens when a controller method throws an exception?",

          answer:
            "If the exception is not handled inside the method, it propagates through Spring MVC request processing. Spring MVC attempts to resolve it using available exception handlers and other configured resolvers."
        },

        {
          question: "11. What is the difference between @ExceptionHandler and try-catch?",

          answer:
            "A try-catch block handles an exception directly in the code where it is written. @ExceptionHandler lets Spring MVC resolve an exception and invoke a designated handler method, separating response handling from the main controller logic."
        },

        {
          question: "12. What happens if no matching exception handler exists?",

          answer:
            "Spring MVC continues with its configured exception-resolution mechanisms. If the failure remains unresolved, the normal error-processing mechanisms commonly produce an HTTP 500 response for an unexpected server exception."
        },

        {
          question: "13. Can @ExceptionHandler return a DTO?",

          answer:
            "Yes. It can return a supported response DTO, and Spring MVC can serialize that object into the response body when the application has the appropriate message converters."
        },

        {
          question: "14. Why is @RestControllerAdvice useful for REST APIs?",

          answer:
            "It allows common exceptions to be handled in one place and helps maintain consistent JSON error responses and HTTP status mappings across controllers."
        },

        {
          question: "15. What is the difference between HTTP 400 and HTTP 500?",

          answer:
            "HTTP 400 commonly indicates a malformed or invalid client request. HTTP 500 indicates an unexpected server-side failure."
        },

        {
          question: "16. How should EmployeeNotFoundException be handled?",

          answer:
            "A handler commonly maps it to HTTP 404 Not Found and returns a client-safe message explaining that the requested employee could not be found."
        },

        {
          question: "17. How should DuplicateResourceException be handled?",

          answer:
            "It commonly maps to HTTP 409 Conflict when the request conflicts with a uniqueness rule or the existing state of a resource."
        },

        {
          question: "18. Which handler is more specific: EmployeeNotFoundException or RuntimeException?",

          answer:
            "EmployeeNotFoundException is more specific when it extends RuntimeException. Spring MVC generally prefers the more-specific applicable exception match within the relevant handler scope."
        },

        {
          question: "19. Should every RuntimeException return HTTP 400?",

          answer:
            "No. RuntimeException includes many different failures, including programming errors. A broad handler should not classify every such failure as a client error."
        },

        {
          question: "20. Can local and global exception handlers coexist?",

          answer:
            "Yes. A controller can define local handlers while @RestControllerAdvice provides shared handling. Spring MVC considers applicable handler scope and exception-type matches when resolving the exception."
        },

        {
          question: "21. Does @ExceptionHandler catch errors thrown by Spring Security filters?",

          answer:
            "Not necessarily. Security filters can run before controller processing. Authentication and authorization failures commonly require mechanisms such as AuthenticationEntryPoint or AccessDeniedHandler."
        },

        {
          question: "22. How do you test an @ExceptionHandler method?",

          answer:
            "Use a Spring MVC test such as MockMvc to trigger the exception and assert the HTTP status and response body. A service unit test can separately verify that the service throws the expected exception."
        },

        {
          question: "23. Should exception messages be returned directly to clients?",

          answer:
            "Only when they are safe and intended for client consumption. Do not expose stack traces, SQL details, secrets, or sensitive internal information."
        },

        {
          question: "24. What are common mistakes when using @ExceptionHandler?",

          answer:
            "Common mistakes include using incorrect status codes, returning HTTP 200 for failures, duplicating handlers unnecessarily, exposing internal details, and using overly broad handlers that misclassify exceptions."
        },

        {
          question: "25. Explain @ExceptionHandler in a Spring Boot interview.",

          answer:
            "@ExceptionHandler is used to define methods that process specific exceptions in Spring MVC. I can declare it inside a controller for local handling or use @RestControllerAdvice for centralized handling. The handler can return ResponseEntity with an appropriate HTTP status and a consistent error response DTO. This keeps error handling organized and makes REST APIs easier to maintain and test."
        }
      ]
    },

    {
      id: "summary",

      title: "Lesson Summary",

      paragraphs: [
        "@ExceptionHandler lets Spring MVC invoke a designated method when an applicable exception occurs during request processing. It can be declared locally inside a controller or centrally in an advice component.",

        "ResponseEntity provides explicit control over the HTTP status and response body. For applications with multiple controllers, @RestControllerAdvice is commonly used to centralize error handling and maintain a consistent API response contract."
      ],

      bullets: [
        "Use @ExceptionHandler to handle specific exception types.",
        "Use local handling for controller-specific behavior.",
        "Use @RestControllerAdvice for shared REST API error handling.",
        "Return appropriate HTTP status codes and structured response bodies.",
        "Prefer specific exception mappings over overly broad handlers.",
        "Keep client messages safe and predictable.",
        "Test exception handling through service tests and MockMvc."
      ]
    }
  ]
};
