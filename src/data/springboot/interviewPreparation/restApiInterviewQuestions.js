
export const restApiInterviewQuestions = {
  id: 1603,
  title: "REST API Interview Questions",
  slug: "rest-api-interview-questions",
  topicTitle: "Spring Boot Interview Preparation",
  description:
    "Prepare for REST API interviews with detailed explanations of REST principles, HTTP methods, status codes, Spring MVC annotations, validation, exception handling, pagination, security, and API design.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "http-rest",
      title: "REST and HTTP Fundamentals",
      paragraphs: [
        "REST stands for Representational State Transfer. It is an architectural style for designing network-based applications. REST APIs commonly use HTTP to allow a client, such as a React frontend or mobile application, to communicate with a backend service.",
        "A REST API organizes application data around resources. For example, a product resource can be accessed through /api/v1/products, while an individual product can be accessed through /api/v1/products/101. HTTP methods describe the operation the client wants to perform on those resources.",
        "REST is not a specific Java framework or protocol. Spring Boot provides tools for implementing HTTP APIs, but REST is an architectural style with constraints such as a uniform interface, stateless communication, and a client-server separation."
      ],
      bullets: [
        "Resource: An entity or concept exposed through the API, such as a product, employee, or order.",
        "URI: Identifies a resource, such as /api/v1/products/101.",
        "HTTP method: Describes the intended operation, such as GET, POST, PUT, PATCH, or DELETE.",
        "Representation: The data exchanged for a resource, commonly JSON.",
        "Statelessness: Each request contains the information needed to process it; the server does not depend on stored conversational session state between requests.",
        "Uniform interface: Clients interact with resources through consistent identifiers, methods, representations, and HTTP semantics."
      ],
      code: {
        language: "http",
        code: `GET    /api/v1/products
GET    /api/v1/products/101
POST   /api/v1/products
PUT    /api/v1/products/101
PATCH  /api/v1/products/101
DELETE /api/v1/products/101`
      },
      interviewQuestions: [
        {
          question: "What is REST?",
          answer: "REST is an architectural style for networked systems that emphasizes resources, a uniform interface, stateless communication, and other constraints. REST APIs commonly expose resources through HTTP endpoints."
        },
        {
          question: "What is a REST API?",
          answer: "A REST API is an interface that allows clients to interact with application resources over a network using HTTP methods, resource identifiers, representations, and HTTP status codes."
        },
        {
          question: "What is a resource in REST?",
          answer: "A resource is a business entity or concept exposed through an API, such as a product, customer, employee, or order. A URI identifies the resource."
        },
        {
          question: "What is the difference between REST and HTTP?",
          answer: "HTTP is a network protocol with defined methods, headers, status codes, and message semantics. REST is an architectural style that often uses HTTP to implement resource-oriented APIs."
        },
        {
          question: "What does statelessness mean in REST?",
          answer: "Each request must contain the information needed to process it. The server should not rely on conversational session state retained from a previous request. Statelessness does not mean the server cannot store business data in a database."
        },
        {
          question: "What is the difference between REST and SOAP?",
          answer: "REST is an architectural style commonly implemented with HTTP and JSON. SOAP is a messaging protocol with a defined XML-based envelope and formal processing rules. SOAP is often associated with WSDL contracts and enterprise integrations."
        },
        {
          question: "What is JSON?",
          answer: "JSON stands for JavaScript Object Notation. It is a text-based data format commonly used to exchange structured data between frontend applications and backend APIs."
        },
        {
          question: "Is every HTTP API a REST API?",
          answer: "No. An API can use HTTP without following REST constraints. For example, an HTTP endpoint that exposes only remote procedure calls may be an HTTP API without being resource-oriented REST."
        }
      ]
    },
    {
      id: "http-methods",
      title: "HTTP Methods: GET, POST, PUT, PATCH, and DELETE",
      paragraphs: [
        "HTTP methods communicate the intent of a request. Choosing the correct method helps clients, servers, caches, proxies, and API developers understand the operation being performed.",
        "GET retrieves a representation. POST submits data for processing and is commonly used to create resources. PUT generally replaces the state of a resource with the supplied representation. PATCH applies a partial modification. DELETE requests removal of a resource.",
        "Two important HTTP concepts are safety and idempotency. A safe method is intended to be read-only. An idempotent method has the same intended effect on server state when the same request is repeated. Idempotency does not require every response to be identical."
      ],
      bullets: [
        "GET: Safe and idempotent by HTTP semantics.",
        "POST: Not inherently safe or idempotent; often used to create a resource or initiate processing.",
        "PUT: Idempotent by HTTP semantics; generally replaces the target resource representation.",
        "PATCH: Applies partial modifications; idempotency depends on the patch operation's defined behavior.",
        "DELETE: Idempotent by HTTP semantics, even if repeated requests produce different status codes.",
        "HEAD: Similar to GET but returns no response content.",
        "OPTIONS: Describes communication options supported by a resource or server."
      ],
      code: {
        language: "http",
        code: `GET /api/v1/products/101

POST /api/v1/products
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 1499.00
}

PUT /api/v1/products/101
Content-Type: application/json

{
  "name": "Mechanical Keyboard",
  "price": 2499.00
}

PATCH /api/v1/products/101
Content-Type: application/json

{
  "price": 2299.00
}

DELETE /api/v1/products/101`
      },
      interviewQuestions: [
        {
          question: "What is the difference between GET and POST?",
          answer: "GET retrieves a representation and is defined as a safe method. POST submits data for processing or resource creation and is not inherently idempotent. Request bodies can exist for GET in some implementations, but their semantics are not generally defined for retrieving resources."
        },
        {
          question: "What is the difference between PUT and PATCH?",
          answer: "PUT generally replaces the target resource representation, while PATCH applies partial modifications. PUT is idempotent by HTTP semantics. PATCH may or may not be idempotent depending on how the patch operation is defined."
        },
        {
          question: "What is idempotency?",
          answer: "An operation is idempotent when repeating the same request has the same intended effect on server state as performing it once. The responses do not have to be identical."
        },
        {
          question: "Which HTTP methods are idempotent?",
          answer: "GET, HEAD, OPTIONS, PUT, and DELETE are defined as idempotent. Safe methods are also idempotent. PATCH and POST are not guaranteed to be idempotent."
        },
        {
          question: "Is DELETE idempotent?",
          answer: "Yes, by HTTP semantics. Deleting a resource once and repeating the same deletion should have the same intended final state. The first response might be 204, while a repeated request might return 404."
        },
        {
          question: "Can POST be idempotent?",
          answer: "POST is not inherently idempotent, but an API can implement idempotency keys or another deduplication mechanism to prevent duplicate processing of repeated requests."
        },
        {
          question: "When should PUT be used?",
          answer: "Use PUT when the client is supplying the intended complete representation of a resource at a known URI. The API must define how omitted fields are handled."
        },
        {
          question: "Can GET modify database records?",
          answer: "A GET endpoint should not perform business operations that modify application state. GET is a safe method, so clients and intermediaries may assume that retrieving data does not initiate such changes."
        }
      ]
    },
    {
      id: "http-status-codes",
      title: "HTTP Status Codes",
      paragraphs: [
        "An HTTP status code tells the client the general outcome of its request. Returning the correct status code makes an API easier to integrate with and helps clients decide whether to retry, authenticate, correct their input, or display a result.",
        "Status codes are grouped into five categories: 1xx informational, 2xx successful, 3xx redirection, 4xx client errors, and 5xx server errors. REST APIs most frequently use 2xx, 4xx, and 5xx responses."
      ],
      bullets: [
        "200 OK: The request succeeded. Common for successful GET requests and updates that return a representation.",
        "201 Created: A resource was created successfully. A Location header can identify the new resource.",
        "202 Accepted: The request was accepted for processing, but processing has not necessarily completed.",
        "204 No Content: The request succeeded and no response content is returned.",
        "400 Bad Request: The request is malformed or otherwise cannot be processed as submitted.",
        "401 Unauthorized: Valid authentication credentials are missing or unacceptable.",
        "403 Forbidden: The server refuses the request, commonly because the caller lacks permission.",
        "404 Not Found: The target resource was not found, or the API intentionally does not disclose its existence.",
        "409 Conflict: The request conflicts with the current state of the resource, such as a duplicate unique value.",
        "422 Unprocessable Content: The content type and syntax are understood, but the submitted instructions or data cannot be processed semantically.",
        "429 Too Many Requests: The client exceeded a rate limit.",
        "500 Internal Server Error: An unexpected server-side failure occurred.",
        "502 Bad Gateway: A gateway or proxy received an invalid response from an upstream server.",
        "503 Service Unavailable: The service is temporarily unable to handle the request.",
        "504 Gateway Timeout: A gateway or proxy did not receive a timely response from an upstream server."
      ],
      code: {
        language: "http",
        code: `HTTP/1.1 201 Created
Location: /api/v1/products/101
Content-Type: application/json

{
  "id": 101,
  "name": "Keyboard",
  "price": 1499.00
}`
      },
      interviewQuestions: [
        {
          question: "What is the difference between 200 and 201?",
          answer: "200 means the request succeeded. 201 means the request successfully created a resource. A 201 response can include a Location header pointing to the new resource."
        },
        {
          question: "When should an API return 204?",
          answer: "Return 204 when the request succeeds and there is no response content to send, for example after a successful deletion. Do not include a response body with a 204 status."
        },
        {
          question: "What is the difference between 400 and 422?",
          answer: "400 commonly indicates malformed or invalid request input. 422 is often used when the request is syntactically valid but fails semantic validation. APIs should apply a consistent convention."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer: "401 indicates that valid authentication credentials are missing or unacceptable. 403 means the server refuses the request, commonly because the authenticated caller lacks permission."
        },
        {
          question: "When should an API return 404?",
          answer: "Return 404 when the requested resource cannot be found. Security-sensitive APIs may also use it to avoid revealing whether a protected resource exists."
        },
        {
          question: "When should an API return 409?",
          answer: "Return 409 when the request conflicts with the current resource state, such as trying to create a user with an already registered unique email address."
        },
        {
          question: "What is the difference between 500 and 503?",
          answer: "500 represents an unexpected internal server error. 503 indicates temporary unavailability, such as maintenance or exhausted capacity, and may include a Retry-After header."
        },
        {
          question: "When should an API return 202 Accepted?",
          answer: "Use 202 when the request has been accepted for asynchronous processing but the operation has not necessarily finished. The response should explain how the client can track the operation when appropriate."
        }
      ]
    },
    {
      id: "spring-mvc",
      title: "Spring MVC Annotations",
      paragraphs: [
        "Spring MVC provides annotations that map HTTP requests to Java handler methods. In a Spring Boot application, a controller commonly receives a request, validates input, delegates business operations to a service, and returns a response DTO.",
        "@RestController combines @Controller and @ResponseBody. Return values are written to the HTTP response body through configured HttpMessageConverter implementations. For JSON, Spring commonly uses Jackson when it is available on the classpath.",
        "Keep controllers focused on HTTP concerns. Put business rules in the service layer and persistence operations in repositories. This separation improves testability and prevents controllers from becoming difficult to maintain."
      ],
      bullets: [
        "@RestController: Declares a REST-style controller.",
        "@RequestMapping: Defines a base path and optional request conditions.",
        "@GetMapping: Maps GET requests.",
        "@PostMapping: Maps POST requests.",
        "@PutMapping: Maps PUT requests.",
        "@PatchMapping: Maps PATCH requests.",
        "@DeleteMapping: Maps DELETE requests.",
        "@PathVariable: Extracts values from the URI path.",
        "@RequestParam: Reads query parameters.",
        "@RequestBody: Deserializes the request body into a Java object.",
        "@ResponseStatus: Declares a status code for a handler or exception.",
        "@Valid: Triggers supported Bean Validation constraints."
      ],
      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping
    public List<ProductDto> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return productService.getProducts(page, size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto createProduct(
            @RequestBody CreateProductRequest request) {
        return productService.create(request);
    }
}`
      },
      interviewQuestions: [
        {
          question: "What is @RestController?",
          answer: "@RestController combines @Controller and @ResponseBody, so handler return values are written as response bodies through configured message converters."
        },
        {
          question: "What is the difference between @Controller and @RestController?",
          answer: "@Controller is commonly used for MVC handlers that return view names. @RestController automatically applies response-body behavior to handler methods, which is convenient for REST APIs."
        },
        {
          question: "What is the difference between @PathVariable and @RequestParam?",
          answer: "@PathVariable extracts a value from the URL path, such as /products/101. @RequestParam reads a query parameter, such as /products?page=0."
        },
        {
          question: "What does @RequestBody do?",
          answer: "@RequestBody uses an HTTP message converter to deserialize the request body into a Java object, such as a request DTO."
        },
        {
          question: "What is the purpose of @RequestMapping?",
          answer: "@RequestMapping maps requests based on conditions such as URL path, HTTP method, headers, and media types. Specialized annotations like @GetMapping are commonly used for individual HTTP methods."
        },
        {
          question: "What is the difference between @ResponseBody and @ResponseStatus?",
          answer: "@ResponseBody indicates that a method's return value should be written to the response body. @ResponseStatus specifies an HTTP status code for a handler or exception."
        },
        {
          question: "Why use constructor injection in controllers?",
          answer: "Constructor injection makes dependencies explicit, supports immutable fields, helps detect missing dependencies at startup, and simplifies unit testing."
        },
        {
          question: "What is the role of DispatcherServlet?",
          answer: "DispatcherServlet is Spring MVC's front controller. It coordinates request mapping, handler execution, argument resolution, exception handling, and response processing."
        }
      ]
    },
    {
      id: "request-response-dtos",
      title: "Request Bodies, Response DTOs, and JSON",
      paragraphs: [
        "A DTO, or Data Transfer Object, defines the data exchanged between a client and the API. A request DTO describes accepted input, while a response DTO describes the information the API returns.",
        "Avoid exposing JPA entities directly as public API responses. Entities can contain internal fields, relationships that trigger unexpected queries, or persistence details that should not become part of the public contract. Separate DTOs also allow the API to evolve without exposing every database change.",
        "Spring's HTTP message converters handle conversion between Java objects and representations such as JSON. With a typical Spring Boot web dependency setup, Jackson handles JSON serialization and deserialization."
      ],
      code: {
        language: "java",
        code: `import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CreateProductRequest(
        @NotBlank String name,
        @Positive BigDecimal price
) {
}

public record ProductDto(
        Long id,
        String name,
        BigDecimal price
) {
}`
      },
      bullets: [
        "Use request DTOs to define and validate accepted input.",
        "Use response DTOs to control the fields returned to clients.",
        "Avoid returning passwords, internal tokens, or sensitive entity fields.",
        "Use BigDecimal for many monetary values rather than floating-point types.",
        "Treat JSON property names and response shapes as part of the API contract.",
        "For a mutable Java class, provide suitable constructors or accessors for the configured JSON mapper."
      ],
      interviewQuestions: [
        {
          question: "Why should we use DTOs instead of returning entities?",
          answer: "DTOs separate the public API contract from the database model, prevent accidental exposure of internal fields, reduce serialization problems, and make versioning and validation easier."
        },
        {
          question: "What is the difference between a request DTO and a response DTO?",
          answer: "A request DTO represents input accepted from the client. A response DTO represents output returned by the server. They often contain different fields and validation rules."
        },
        {
          question: "How does Spring convert a Java object into JSON?",
          answer: "Spring MVC selects a suitable HttpMessageConverter based on the return value and negotiated media type. In a typical Spring Boot application, Jackson's JSON converter serializes Java objects into JSON."
        },
        {
          question: "What is Content-Type?",
          answer: "Content-Type describes the media type of the message body being sent, such as application/json."
        },
        {
          question: "What is Accept?",
          answer: "Accept tells the server which response media types the client can accept, such as application/json. Spring MVC can use this information during content negotiation."
        }
      ]
    },
    {
      id: "validation",
      title: "Request Validation",
      paragraphs: [
        "Validation ensures that incoming requests satisfy basic constraints before business processing begins. Examples include requiring a product name, rejecting a negative price, and checking that an email address has a valid format.",
        "Use Bean Validation annotations on request DTO fields and add @Valid to the controller parameter. In Spring Boot, include the validation starter when validation support is needed. For cross-field or business-specific rules, add custom validation or validate in the service layer."
      ],
      code: {
        language: "java",
        code: `import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

record CreateProductRequest(
        @NotBlank(message = "Name is required")
        String name,

        @Positive(message = "Price must be greater than zero")
        BigDecimal price
) {
}

@RestController
@RequestMapping("/api/v1/products")
class ProductController {

    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ProductDto create(
            @Valid @RequestBody CreateProductRequest request) {
        return productService.create(request);
    }
}`
      },
      bullets: [
        "@NotNull: Rejects null values.",
        "@NotBlank: Rejects null, empty, or whitespace-only character sequences.",
        "@Size: Restricts the size of strings or supported collections.",
        "@Positive: Requires a numeric value greater than zero.",
        "@Email: Checks a value against the validator's email format rules.",
        "@Valid: Triggers validation of the request object and its nested validated properties."
      ],
      interviewQuestions: [
        {
          question: "How do you validate a REST API request in Spring Boot?",
          answer: "Define constraints on a request DTO and annotate the controller parameter with @Valid. Spring triggers Bean Validation and raises a validation exception when constraints fail."
        },
        {
          question: "What happens when validation fails?",
          answer: "Spring MVC raises a validation-related exception. A centralized exception handler can convert it into a consistent 400 response with field-level error details."
        },
        {
          question: "What is the difference between @NotNull and @NotBlank?",
          answer: "@NotNull only rejects null. @NotBlank rejects null, empty, and whitespace-only character sequences."
        },
        {
          question: "Should all validation be performed in the controller?",
          answer: "No. Controllers commonly handle input-shape validation. Business invariants, such as whether an order can be cancelled, belong in the service or domain layer."
        }
      ]
    },
    {
      id: "exception-handling",
      title: "Centralized Exception Handling",
      paragraphs: [
        "Without centralized exception handling, different controller methods may return inconsistent error structures. Spring's @RestControllerAdvice and @ExceptionHandler allow applications to translate known exceptions into consistent HTTP responses.",
        "A good error response should help clients understand what went wrong without revealing stack traces, database credentials, SQL statements, or internal implementation details. Use appropriate status codes and stable error identifiers when clients need to handle particular failure types."
      ],
      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ProblemDetail handleNotFound(
            ProductNotFoundException exception) {

        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND,
                exception.getMessage()
        );

        problem.setTitle("Product not found");
        problem.setProperty("errorCode", "PRODUCT_NOT_FOUND");
        return problem;
    }
}`
      },
      bullets: [
        "@RestControllerAdvice provides centralized advice for REST controllers.",
        "@ExceptionHandler maps selected exception types to handler methods.",
        "Use 404 for a missing resource, 400 for invalid request input, and 409 for a state conflict when appropriate.",
        "Use a consistent error schema or Spring ProblemDetail for structured error responses.",
        "Log unexpected exceptions internally with a correlation or trace identifier.",
        "Do not return stack traces or sensitive implementation details to clients."
      ],
      interviewQuestions: [
        {
          question: "How do you handle exceptions globally in Spring Boot?",
          answer: "Use @RestControllerAdvice with @ExceptionHandler methods to map exceptions to suitable HTTP status codes and consistent response bodies."
        },
        {
          question: "What is the difference between @ControllerAdvice and @RestControllerAdvice?",
          answer: "@RestControllerAdvice combines @ControllerAdvice with response-body behavior. It is convenient for REST error responses, while @ControllerAdvice is also used in MVC applications that return views."
        },
        {
          question: "What is ProblemDetail?",
          answer: "ProblemDetail is a Spring-supported representation for HTTP API errors based on the Problem Details for HTTP APIs specification. It can include a status, title, detail, instance, and extension properties."
        },
        {
          question: "Should every exception return 500?",
          answer: "No. Known failures should map to appropriate status codes. For example, invalid input commonly maps to 400, a missing resource to 404, and unexpected failures to 500."
        },
        {
          question: "Why should stack traces not be returned to clients?",
          answer: "Stack traces can expose internal class names, database details, infrastructure information, and other sensitive implementation details. Keep detailed diagnostics in protected server-side logs."
        }
      ]
    },
    {
      id: "pagination-filtering",
      title: "Pagination, Sorting, and Filtering",
      paragraphs: [
        "Returning every record from a large database table can increase query time, memory use, response size, and network latency. Pagination allows clients to request a manageable subset of results.",
        "Spring Data supports Pageable and PageRequest for paginated repository queries. Sorting and filtering can be combined with pagination, but the API should validate client-supplied sort fields and set reasonable limits on page size.",
        "Page and offset pagination are straightforward but can become inefficient for very large offsets. Cursor-based pagination is often useful for large, frequently changing datasets."
      ],
      code: {
        language: "java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
class ProductController {

    private final ProductRepository productRepository;

    ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);

        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by("name").ascending()
        );

        return productRepository.findAll(pageable);
    }
}`
      },
      bullets: [
        "Page: Includes content and pagination metadata, including total counts when available.",
        "Slice: Provides whether another slice exists without requiring a total count in the same way as Page.",
        "PageRequest: Creates a Pageable request.",
        "Sorting: Allows results to be ordered by an approved field and direction.",
        "Filtering: Uses query parameters such as ?category=electronics.",
        "Cursor pagination: Uses a continuation token or last-seen key rather than a large numeric offset.",
        "Validate page size and allowed sort fields to prevent excessive queries and unexpected behavior."
      ],
      interviewQuestions: [
        {
          question: "Why is pagination important?",
          answer: "Pagination limits the amount of data returned in one request, reducing memory use, network transfer, and query workload while improving response times."
        },
        {
          question: "What is the difference between Page and Slice in Spring Data?",
          answer: "Page provides total-element and total-page metadata when supported, which may require a count query. Slice focuses on whether more data exists and can avoid calculating the total."
        },
        {
          question: "What is cursor-based pagination?",
          answer: "Cursor-based pagination returns results relative to a stable continuation key, such as an ID or timestamp. It can be more efficient than large offsets and can behave better as data changes."
        },
        {
          question: "How should an API handle invalid page sizes?",
          answer: "Validate or clamp the requested size to an approved range and reject invalid values consistently. Always define a reasonable maximum."
        }
      ]
    },
    {
      id: "api-versioning",
      title: "REST API Versioning and Design",
      paragraphs: [
        "API versioning helps teams evolve an API without unexpectedly breaking existing clients. A common strategy is URI versioning, such as /api/v1/products. Other strategies include query parameters, custom headers, and media-type versioning.",
        "Good REST design uses resource-oriented, consistent URLs, suitable HTTP methods, clear status codes, and stable request and response contracts. Avoid exposing database implementation details or placing every business operation under a generic action endpoint.",
        "Versioning is not a replacement for compatibility. Prefer additive changes when possible, document deprecated fields and endpoints, and give consumers a migration period before removing a version."
      ],
      code: {
        language: "http",
        code: `GET /api/v1/products/101
GET /api/v1/orders/5001

GET /api/v1/products?category=electronics&page=0&size=20

POST /api/v1/orders
Content-Type: application/json

{
  "customerId": 25,
  "productId": 101,
  "quantity": 2
}`
      },
      bullets: [
        "Use nouns for resource paths: /products, /orders, and /customers.",
        "Use HTTP methods to express the intended operation.",
        "Use plural resource names consistently where that is your API convention.",
        "Use query parameters for filtering, sorting, and pagination.",
        "Keep request and response schemas stable where possible.",
        "Document breaking changes, deprecation dates, and migration steps.",
        "Choose a versioning strategy and apply it consistently."
      ],
      interviewQuestions: [
        {
          question: "Why is API versioning required?",
          answer: "Versioning allows an API to introduce breaking changes while existing clients continue using a compatible contract during migration."
        },
        {
          question: "What are common API versioning strategies?",
          answer: "Common approaches include URI versioning, query-parameter versioning, custom-header versioning, and media-type versioning."
        },
        {
          question: "Which API versioning approach is easiest to understand?",
          answer: "URI versioning, such as /api/v1/products, is easy for developers to see, test, document, and route. Other strategies can also work depending on organizational needs."
        },
        {
          question: "Should REST endpoints use verbs in their URLs?",
          answer: "Resource-oriented endpoints generally use nouns, while HTTP methods express CRUD operations. Some domain actions do not map cleanly to CRUD, so explicit action endpoints can still be appropriate when designed consistently."
        },
        {
          question: "How can an API evolve without breaking clients?",
          answer: "Prefer backward-compatible additions, avoid changing existing field meanings, document deprecations, monitor usage, and provide a clear migration plan for breaking changes."
        }
      ]
    },
    {
      id: "security-cors",
      title: "REST API Security and CORS",
      paragraphs: [
        "REST APIs should authenticate callers when required, authorize each protected operation, validate input, use HTTPS in production, and avoid exposing sensitive information. Authentication establishes who the caller is; authorization determines what the caller may do.",
        "CORS stands for Cross-Origin Resource Sharing. Browsers enforce same-origin restrictions and use CORS response headers to determine whether frontend JavaScript may access a response from another origin. CORS is not an authentication or authorization mechanism.",
        "When cookies or other credentials are used cross-origin, configure allowed origins and credential behavior carefully. Do not combine credentialed CORS with an unrestricted wildcard origin."
      ],
      bullets: [
        "Authentication: Verifies a caller's identity.",
        "Authorization: Checks whether the caller can perform an operation on a resource.",
        "HTTPS: Protects data in transit.",
        "Input validation: Rejects malformed or unacceptable input.",
        "Least privilege: Grant only the permissions required.",
        "Rate limiting: Helps protect against abuse and excessive request volume.",
        "CORS: Controls browser cross-origin access; it does not replace server-side authorization.",
        "Never store passwords in plain text or log access tokens and secrets."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods(
                                "GET", "POST", "PUT", "PATCH", "DELETE"
                        )
                        .allowedHeaders("Content-Type", "Authorization");
            }
        };
    }
}`
      },
      interviewQuestions: [
        {
          question: "What is the difference between authentication and authorization?",
          answer: "Authentication verifies identity. Authorization determines whether the authenticated caller has permission to access a resource or perform an operation."
        },
        {
          question: "What is CORS?",
          answer: "CORS is a browser-enforced mechanism that uses server response headers to control whether frontend code from another origin can access a response."
        },
        {
          question: "Does CORS secure an API against unauthorized requests?",
          answer: "No. CORS is not authentication or authorization. Non-browser clients can call APIs regardless of browser CORS enforcement, so APIs still need appropriate server-side security."
        },
        {
          question: "Why should REST APIs use HTTPS?",
          answer: "HTTPS encrypts traffic in transit and helps protect credentials, tokens, and application data from interception or tampering."
        },
        {
          question: "Why is input validation important for API security?",
          answer: "Validation rejects malformed or unacceptable input early. It complements authorization, parameterized database access, output encoding, and other security controls."
        }
      ]
    },
    {
      id: "testing-and-debugging",
      title: "REST API Testing and Debugging",
      paragraphs: [
        "REST endpoints can be tested using Postman, curl, automated integration tests, and browser-based frontend requests. Test successful operations as well as invalid input, missing resources, authorization failures, and unexpected conditions.",
        "Spring Boot provides MockMvc for testing Spring MVC request handling without starting a real HTTP server. Use @WebMvcTest for focused controller tests and @SpringBootTest with an appropriate web environment for broader integration tests.",
        "For debugging, inspect the request URL, HTTP method, headers, body, response status, response body, server logs, and correlation identifiers. Avoid logging credentials or sensitive personal data."
      ],
      code: {
        language: "java",
        code: `import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    @Test
    void returnsProductWhenFound() throws Exception {
        when(productService.getById(101L))
                .thenReturn(new ProductDto(
                        101L, "Keyboard",
                        new java.math.BigDecimal("1499.00")
                ));

        mockMvc.perform(get("/api/v1/products/101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(101))
                .andExpect(jsonPath("$.name").value("Keyboard"));
    }
}`
      },
      bullets: [
        "Test the expected status code and response body.",
        "Test invalid request payloads and validation messages.",
        "Test missing resources and conflict scenarios.",
        "Test authorization rules for protected endpoints.",
        "Test pagination boundaries and maximum page sizes.",
        "Use stable DTO contracts and avoid tests that depend on unrelated implementation details.",
        "The @MockitoBean annotation is available in newer Spring Framework versions. In older Spring Boot 3 projects, @MockBean may be used instead."
      ],
      interviewQuestions: [
        {
          question: "How do you test REST APIs in Spring Boot?",
          answer: "Use MockMvc for MVC-layer tests, WebTestClient where appropriate, and integration tests with a running application for broader HTTP and infrastructure behavior. Postman and curl are useful for manual testing."
        },
        {
          question: "What is MockMvc?",
          answer: "MockMvc exercises Spring MVC request handling without starting a real HTTP server. It supports assertions on status codes, headers, response bodies, and JSON fields."
        },
        {
          question: "What is the difference between unit and integration testing for a controller?",
          answer: "A focused controller test commonly mocks collaborators and verifies request handling. An integration test exercises more of the application, potentially including the service layer, database, and HTTP server."
        },
        {
          question: "How would you debug a 400 response?",
          answer: "Inspect the request payload, content type, required parameters, path variables, JSON deserialization errors, and Bean Validation failures. Check server logs for the precise exception."
        },
        {
          question: "How would you debug a 500 response?",
          answer: "Inspect protected server logs and the exception stack trace, identify the failing layer, verify dependencies and database behavior, and return a safe error response to the client."
        }
      ]
    },
    {
      id: "common-mistakes",
      title: "Common REST API Interview Mistakes",
      paragraphs: [
        "Interviewers look for more than annotation definitions. Strong answers explain why a method or status code is appropriate, how Spring processes the request, and how the design behaves in production.",
        "When answering, start with a precise definition, explain the practical distinction, and give a small Spring Boot example. If the question involves a design choice, mention trade-offs and relevant HTTP semantics."
      ],
      bullets: [
        "Do not say that PUT and PATCH are identical; explain full replacement versus partial modification.",
        "Do not describe 401 as an authorization failure; distinguish authentication from authorization.",
        "Do not use 200 for every successful operation; consider 201 and 204 where appropriate.",
        "Do not return JPA entities automatically from every endpoint; explain when DTOs are useful.",
        "Do not put all business logic in controllers.",
        "Do not expose internal exception messages, stack traces, or secrets in API responses.",
        "Do not assume CORS protects an endpoint from direct API calls.",
        "Do not retry non-idempotent operations blindly; duplicate processing can create duplicate resources or payments.",
        "Do not fetch unlimited database records for list endpoints.",
        "Do not confuse an HTTP API with an API that fully follows REST constraints."
      ],
      interviewQuestions: [
        {
          question: "How would you explain the flow of a Spring Boot REST API request?",
          answer: "The client sends an HTTP request to the embedded server, which passes it into Spring MVC. DispatcherServlet identifies the handler, Spring resolves and converts request data, and the controller delegates to the service. The service applies business logic and may call a repository. Spring then converts the return value into an HTTP response with suitable headers and status."
        },
        {
          question: "How would you design a create-product endpoint?",
          answer: "Use POST /api/v1/products with a validated request DTO. The service applies business rules and persists the product. Return 201 Created with the created representation and, when appropriate, a Location header pointing to the new resource."
        },
        {
          question: "How would you design an endpoint to retrieve one product?",
          answer: "Use GET /api/v1/products/{id}. Bind the path value with @PathVariable, delegate retrieval to the service, return a response DTO, and map a missing product to 404."
        },
        {
          question: "How do you prevent duplicate resource creation when clients retry requests?",
          answer: "For operations that need retry safety, define an idempotency strategy, such as an idempotency key stored and checked transactionally. Enforce database uniqueness where relevant and ensure repeated requests return a consistent result."
        },
        {
          question: "What makes a REST API production-ready?",
          answer: "A production-ready API has consistent contracts and status codes, validation, centralized error handling, authentication and authorization where required, pagination, observability, timeouts, appropriate rate limits, automated tests, and documented versioning."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "Quick Revision Notes",
      paragraphs: [
        "REST APIs expose resources through consistent HTTP interfaces. HTTP methods communicate intent, status codes communicate outcomes, and DTOs define the public data contract. In Spring Boot, controllers handle HTTP concerns, services implement business logic, repositories handle persistence, and centralized advice provides consistent error responses."
      ],
      bullets: [
        "REST: Resource-oriented architectural style.",
        "GET: Retrieve a representation; safe and idempotent.",
        "POST: Submit data or create a resource; not inherently idempotent.",
        "PUT: Generally replace a resource representation; idempotent.",
        "PATCH: Partially modify a resource; idempotency depends on the operation.",
        "DELETE: Remove a resource; idempotent by HTTP semantics.",
        "200: Success.",
        "201: Created.",
        "204: Success with no response content.",
        "400: Bad request.",
        "401: Authentication credentials are missing or unacceptable.",
        "403: Request is forbidden.",
        "404: Resource not found.",
        "409: Conflict.",
        "429: Too many requests.",
        "500: Unexpected server error.",
        "@RestController: Controller with response-body behavior.",
        "@PathVariable: Value from the URI path.",
        "@RequestParam: Query or supported request parameter.",
        "@RequestBody: Deserialize request content.",
        "@Valid: Trigger supported validation.",
        "@RestControllerAdvice: Centralized REST exception handling.",
        "DTO: Defines request or response data separately from persistence entities.",
        "CORS: Browser cross-origin access control, not API authentication."
      ],
      interviewQuestions: [
        {
          question: "Give a short interview answer: What is a REST API?",
          answer: "A REST API exposes resources over a network through a consistent interface, commonly using HTTP methods and JSON representations. It uses HTTP status codes to communicate outcomes and typically follows stateless communication."
        },
        {
          question: "Give a short interview answer: How do you build a REST API in Spring Boot?",
          answer: "I define a @RestController with request mappings, use request and response DTOs, validate inputs, delegate business logic to a service, use a repository for persistence, and handle errors centrally with @RestControllerAdvice."
        },
        {
          question: "Give a short interview answer: How do you handle errors in a REST API?",
          answer: "I map known exceptions to meaningful HTTP status codes using @RestControllerAdvice and @ExceptionHandler, return a consistent error structure, and keep stack traces and sensitive implementation details in server-side logs."
        }
      ]
    }
  ]
};
