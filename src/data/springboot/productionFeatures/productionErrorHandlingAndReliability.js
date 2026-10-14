
export const productionErrorHandlingAndReliability = {
  id: 1408,
  title: "Production Error Handling and API Reliability",
  slug: "production-error-handling-and-api-reliability",
  topicTitle: "Spring Boot Production Features",
  description:
    "Learn reliable REST error responses, timeouts, retry strategies, idempotency, and safe failure handling.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "errors",
      title: "Why Production Error Handling Matters",
      paragraphs: [
        "Production APIs must handle invalid requests, missing resources, business-rule violations, authentication failures, dependency outages, and unexpected exceptions consistently. Without a defined error-handling strategy, clients may receive confusing responses, internal details may leak, and failures may become difficult to investigate.",
        "Spring Boot applications commonly use @RestControllerAdvice and @ExceptionHandler to translate application exceptions into HTTP responses. This separates exception-handling logic from individual controller methods and provides a consistent API contract.",
        "Error handling should distinguish expected client errors from unexpected server failures. An invalid request is generally a client error, while an unexpected database failure is generally a server-side problem. Returning HTTP 200 for a failed operation hides the failure from clients, monitoring systems, and automated integrations.",
        "Reliable error handling also includes operational behavior. An application should log enough diagnostic information for engineers, avoid exposing stack traces to clients, apply timeouts to external calls, and prevent temporary dependency failures from exhausting application resources.",
        "Not every exception belongs in the same handler. Validation failures, missing resources, authentication failures, authorization failures, and unexpected exceptions have different meanings and often require different HTTP statuses."
      ],
      bullets: [
        "Use suitable HTTP status codes.",
        "Return a consistent error response structure.",
        "Separate client errors from unexpected server failures.",
        "Do not expose stack traces, SQL statements, credentials, or internal infrastructure details.",
        "Log operational failures securely with useful context.",
        "Configure timeouts for remote calls and database operations.",
        "Use bounded retries only when repeating an operation is safe.",
        "Test error behavior as carefully as successful behavior."
      ]
    },
    {
      id: "http-status-codes",
      title: "Choose the Correct HTTP Status Code",
      paragraphs: [
        "HTTP status codes tell clients how to interpret a response. A consistent status-code strategy allows frontend applications, API consumers, monitoring systems, and gateways to distinguish different failure categories.",
        "The exact response depends on the API contract. For example, a missing resource commonly returns 404 Not Found, invalid request data commonly returns 400 Bad Request, and a request that requires authentication may return 401 Unauthorized.",
        "A 403 Forbidden response indicates that the server understood the request but refuses to authorize it. A 409 Conflict can represent a duplicate resource or another conflict with the current resource state. A 429 Too Many Requests indicates rate limiting.",
        "A 500 Internal Server Error represents an unexpected server-side failure. A 502 Bad Gateway, 503 Service Unavailable, or 504 Gateway Timeout may be appropriate in gateway or service-availability situations, depending on which component is producing the response.",
        "Do not choose a status code merely because it is convenient. Define the API contract, use the same behavior consistently, and document which errors clients can correct or retry."
      ],
      bullets: [
        "200 OK: the request succeeded.",
        "201 Created: a resource was successfully created.",
        "400 Bad Request: the request is malformed or invalid.",
        "401 Unauthorized: valid authentication is required or authentication failed.",
        "403 Forbidden: the caller is not permitted to perform the operation.",
        "404 Not Found: the requested resource does not exist or is intentionally undisclosed.",
        "409 Conflict: the request conflicts with the current resource state.",
        "422 Unprocessable Content: the request content is understood but cannot be processed under the API's validation rules, if this is the chosen contract.",
        "429 Too Many Requests: the caller exceeded a rate limit.",
        "500 Internal Server Error: an unexpected server failure occurred.",
        "503 Service Unavailable: the service is temporarily unable to handle the request.",
        "504 Gateway Timeout: a gateway did not receive a timely response from an upstream service."
      ]
    },
    {
      id: "error-response",
      title: "Create a Consistent Error Response",
      paragraphs: [
        "A production error response should communicate what went wrong without exposing internal implementation details. A useful response can include a timestamp, HTTP status, stable machine-readable error code, safe message, request path, and correlation identifier when available.",
        "A machine-readable error code allows clients to handle specific situations without depending on the exact wording of a message. The public message should explain the problem in a way the client can understand, while detailed diagnostic information remains in protected logs.",
        "The following example uses a Java record for an immutable response model and @RestControllerAdvice for centralized exception handling. In a real project, place the record and handler in appropriately named Java files, or ensure their visibility and package structure are valid.",
        "The example maps IllegalArgumentException to 400 only when the application's contract uses that exception for invalid client input. Do not map every IllegalArgumentException to a client error if it can also represent a programming defect."
      ],
      code: {
        language: "java",
        code: `import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

public record ApiError(
        Instant timestamp,
        int status,
        String code,
        String message
) {
}

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<ApiError> handleBadRequest(
            IllegalArgumentException exception) {

        ApiError error = new ApiError(
                Instant.now(),
                HttpStatus.BAD_REQUEST.value(),
                "INVALID_REQUEST",
                "The request is invalid"
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }
}`
      },
      output:
        "Example response for an invalid request: {\"timestamp\":\"2026-10-07T08:00:00Z\",\"status\":400,\"code\":\"INVALID_REQUEST\",\"message\":\"The request is invalid\"}. The timestamp is illustrative; the actual response uses the server's current time.",
      bullets: [
        "Use a stable machine-readable error code.",
        "Keep public messages safe and understandable.",
        "Do not return exception.getMessage() blindly because it may contain internal details.",
        "Map domain-specific exceptions to suitable status codes.",
        "Add dedicated handling for validation failures and missing resources.",
        "Consider Spring's ProblemDetail support when using a compatible Spring Framework version and an API based on RFC 9457.",
        "Keep the response contract consistent across endpoints."
      ]
    },
    {
      id: "exception-mapping",
      title: "Map Different Exceptions to Appropriate Responses",
      paragraphs: [
        "Centralized exception handling should distinguish errors that clients can correct from failures that require server-side investigation. A resource-not-found exception should not produce the same response as a database outage.",
        "Create domain-specific exceptions for meaningful application situations, such as an order that does not exist or a requested state transition that is not permitted. These exceptions make the service layer easier to understand and allow the API layer to map them deliberately.",
        "Authentication and authorization errors may occur in Spring Security filters before a controller is invoked. @RestControllerAdvice does not automatically handle every failure produced by those earlier filters. Configure an AuthenticationEntryPoint and AccessDeniedHandler where appropriate.",
        "Unexpected exceptions should normally result in a generic 500 response. The server should record enough diagnostic context to investigate the incident, but the client should not receive stack traces, SQL errors, or internal class names."
      ],
      code: {
        language: "java",
        code: `import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity<ApiError> handleNotFound(
            ResourceNotFoundException exception) {

        ApiError error = new ApiError(
                java.time.Instant.now(),
                404,
                "RESOURCE_NOT_FOUND",
                "The requested resource was not found"
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> handleUnexpected(
            Exception exception) {

        // Log the exception using a configured logger.
        // Do not return exception.getMessage() to the client.

        ApiError error = new ApiError(
                java.time.Instant.now(),
                500,
                "INTERNAL_ERROR",
                "An unexpected error occurred"
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }
}`
      },
      bullets: [
        "Define ResourceNotFoundException as a project-specific exception.",
        "Handle known business failures before the general exception handler.",
        "Log unexpected failures with a logger and useful diagnostic context.",
        "Avoid logging sensitive request bodies or credentials.",
        "Do not accidentally convert authentication and authorization failures into generic 500 responses.",
        "Use a final fallback handler for unexpected exceptions without hiding programming defects from monitoring."
      ]
    },
    {
      id: "validation-errors",
      title: "Handle Request Validation Errors",
      paragraphs: [
        "Request validation prevents invalid data from reaching the business and persistence layers. In Spring Boot, Jakarta Bean Validation annotations such as @NotBlank, @Email, @Positive, and @Size can describe common constraints on request DTOs.",
        "When a controller uses @Valid with a request body, validation errors can raise MethodArgumentNotValidException. A dedicated exception handler can translate those failures into a consistent 400 response containing safe field-level details.",
        "Do not assume that every failure is a validation error. A syntactically valid request may still violate a business rule, such as attempting to cancel an order that has already shipped. Keep input validation and business-rule validation conceptually separate."
      ],
      code: {
        language: "java",
        code: `import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

record RegisterRequest(
        @NotBlank String name,
        @Email @NotBlank String email
) {
}

record FieldErrorResponse(
        String field,
        String message
) {
}

@RestController
class RegistrationController {

    @PostMapping("/api/users")
    ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registration accepted");
    }
}

@RestControllerAdvice
class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<List<FieldErrorResponse>> handleValidation(
            MethodArgumentNotValidException exception) {

        List<FieldErrorResponse> errors =
                exception.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(error -> new FieldErrorResponse(
                                error.getField(),
                                error.getDefaultMessage() == null
                                        ? "Invalid value"
                                        : error.getDefaultMessage()
                        ))
                        .toList();

        return ResponseEntity
                .badRequest()
                .body(errors);
    }
}`
      },
      bullets: [
        "Use @Valid to trigger DTO validation where required.",
        "Include only safe and useful field-level messages.",
        "Use a consistent error structure if the rest of the API uses a common envelope.",
        "Do not expose rejected passwords, tokens, or entire submitted request bodies.",
        "Test missing fields, malformed values, and boundary conditions.",
        "Use service-layer validation for rules that depend on application state."
      ]
    },
    {
      id: "timeouts",
      title: "Use Timeouts for External Calls",
      paragraphs: [
        "An application that calls another service can become stuck waiting if the remote system is slow or unresponsive. If threads remain occupied waiting for remote responses, the application may eventually run out of request-processing capacity even if its own business logic is healthy.",
        "A connection timeout limits how long a client waits to establish a connection. A response or read timeout limits how long it waits for response data, depending on the client implementation. Some HTTP clients distinguish additional phases, so verify the semantics of the chosen library.",
        "Timeouts should be selected according to the operation's latency expectations, the overall request deadline, and the behavior of downstream services. A chain of calls must fit within the caller's total time budget.",
        "Timeouts do not guarantee that the remote operation stopped. For example, a payment provider may complete a charge even after the caller stops waiting. The caller must therefore account for uncertain outcomes before retrying non-idempotent operations.",
        "Use bounded connection pools and queues as well as timeouts. Together, these controls help prevent a slow dependency from consuming unlimited local resources."
      ],
      code: {
        language: "java",
        code: `import java.time.Duration;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
class HttpClientConfiguration {

    @Bean
    RestTemplate paymentRestTemplate(
            RestTemplateBuilder builder) {

        return builder
                .connectTimeout(Duration.ofSeconds(2))
                .readTimeout(Duration.ofSeconds(3))
                .build();
    }
}`
      },
      bullets: [
        "Set connection and response timeouts explicitly.",
        "Choose timeout values according to measured latency and service requirements.",
        "Use bounded connection pools and worker queues.",
        "Keep downstream timeouts within the overall request deadline.",
        "Understand how the chosen client library handles cancellation and timeouts.",
        "Do not assume a timed-out remote operation failed to execute.",
        "Configure database query and connection timeouts where appropriate."
      ]
    },
    {
      id: "timeout-budget",
      title: "Understand Request Deadlines and Timeout Budgets",
      paragraphs: [
        "A request deadline represents the maximum time available to complete an operation. A timeout budget allocates part of that time to each stage, including database access, remote calls, processing, and response delivery.",
        "Suppose an API has an overall target of two seconds. If a downstream call is allowed to wait for five seconds, the API cannot reliably meet that target. The downstream timeout should be shorter than the remaining request budget, leaving time for local processing and error handling.",
        "For a chain of multiple remote calls, consider whether the calls are sequential or parallel. Sequential calls can consume the sum of their individual durations, while parallel calls have different timing behavior but may still compete for resources.",
        "Propagate deadlines or cancellation signals where the transport and client libraries support them. A timeout in one layer does not necessarily cancel work already running in another service."
      ],
      code: {
        language: "text",
        code: `Illustrative request budget

Overall request deadline: 2,000 ms

Local validation and processing:   100 ms
Database operation budget:          400 ms
Payment provider call budget:     1,000 ms
Response and remaining overhead:   500 ms

Important:
  These are example values, not universal settings.
  Measure real latency and reserve time for failure handling.`
      },
      bullets: [
        "Define an overall deadline for the user-facing operation.",
        "Allocate smaller timeout budgets to individual dependencies.",
        "Avoid nested retries that multiply total waiting time.",
        "Reserve time for local cleanup and returning an error response.",
        "Track timeout frequency and latency in production metrics."
      ]
    },
    {
      id: "retry",
      title: "Retries, Idempotency, and Circuit Breakers",
      paragraphs: [
        "Retries can help with temporary failures, such as selected connection errors, rate limits, or transient service-unavailable responses. However, retrying every failure can increase load during an outage and make a recovering dependency fail again.",
        "Use a limited attempt count and a backoff strategy. Exponential backoff increases the delay between successive attempts, while jitter introduces randomness to reduce synchronized retry traffic from many clients.",
        "An operation is idempotent when repeating it produces the same intended effect as performing it once. Idempotency is important when clients retry after a timeout because the original request may have succeeded even though its response was lost.",
        "A circuit breaker can temporarily stop calls to an unhealthy dependency when configured failure conditions are reached. After an open period, it may allow limited trial requests to determine whether the dependency has recovered. It complements, rather than replaces, timeouts, retries, bulkheads, and appropriate fallback behavior.",
        "Retries and circuit breakers should be designed together. If many application layers each retry independently, a single user request can trigger a large number of downstream attempts. Prefer a clear retry policy with a known total attempt and time budget."
      ],
      bullets: [
        "Retry only failures that may be transient.",
        "Do not retry every 4xx response or every exception indiscriminately.",
        "Bound the number of attempts and total elapsed time.",
        "Use exponential backoff and jitter where appropriate.",
        "Avoid retrying non-idempotent operations without a safe design.",
        "Use idempotency keys for operations that need duplicate-request protection.",
        "Use circuit breakers to reduce repeated calls to an unhealthy dependency.",
        "Consider bulkheads to isolate resource consumption between dependencies.",
        "Avoid uncontrolled retries at multiple layers."
      ]
    },
    {
      id: "retry-example",
      title: "Understand Exponential Backoff",
      paragraphs: [
        "Exponential backoff increases the delay after each failed attempt. Instead of retrying immediately, the client waits before trying again. Jitter adds a random component to the delay so that clients do not all retry at the same moment.",
        "The exact delay schedule and maximum attempts depend on the service, operation, and reliability requirements. Respect Retry-After when applicable, particularly for responses such as 429 Too Many Requests or 503 Service Unavailable.",
        "Retries are appropriate only when the failure is potentially temporary and repeating the operation is safe. For a payment operation, first use a provider-supported idempotency mechanism or another reliable way to determine the original operation's outcome."
      ],
      code: {
        language: "java",
        code: `import java.time.Duration;

public class RetryDelay {

    public static Duration delayForAttempt(
            int attempt,
            Duration initialDelay,
            Duration maximumDelay) {

        if (attempt < 1) {
            throw new IllegalArgumentException(
                    "Attempt must be at least 1");
        }

        long initialMillis = initialDelay.toMillis();
        long maximumMillis = maximumDelay.toMillis();

        if (initialMillis < 0 || maximumMillis < 0) {
            throw new IllegalArgumentException(
                    "Delays cannot be negative");
        }

        long delay = initialMillis;

        for (int i = 1; i < attempt && delay < maximumMillis; i++) {
            if (delay > maximumMillis / 2) {
                delay = maximumMillis;
            } else {
                delay *= 2;
            }
        }

        return Duration.ofMillis(
                Math.min(delay, maximumMillis));
    }
}`
      },
      output:
        "With an initial delay of 200 ms and a maximum of 2,000 ms, the illustrative delays are 200 ms, 400 ms, 800 ms, 1,600 ms, and 2,000 ms. This helper demonstrates capped exponential growth only; a production retry policy should also use an attempt limit, appropriate failure classification, and jitter where useful."
    },
    {
      id: "idempotency",
      title: "Implement Idempotency for Duplicate Requests",
      paragraphs: [
        "Idempotency protects an operation from being applied multiple times when the same logical request is repeated. It is especially important for payments, order creation, booking systems, and other operations where duplicates can cause financial or business problems.",
        "A common API design accepts an Idempotency-Key header. The client generates a unique key for one logical operation and reuses that key if it must retry the same request. The server records the key and the outcome associated with it.",
        "The server should scope keys to the appropriate caller or account, define an expiration and retention policy, and reject reuse of the same key with a materially different request payload. Concurrent requests using the same key must not both perform the operation.",
        "A database uniqueness constraint can help enforce key uniqueness. The idempotency record and the business operation must be coordinated carefully, typically within a database transaction when they share the same database. External side effects may require additional techniques, such as provider-side idempotency or a transactional outbox.",
        "Returning the stored result for a repeated key can give clients consistent behavior. If an operation is still in progress, the API should define whether it waits, returns an in-progress response, or provides another documented outcome."
      ],
      code: {
        language: "text",
        code: `Example request

POST /api/payments
Idempotency-Key: pay-order-1042-attempt-1
Content-Type: application/json

{
  "orderId": 1042,
  "amount": 2500
}

Server-side flow:
1. Scope the key to the authenticated caller.
2. Check whether the key already exists.
3. If completed, return the stored outcome.
4. If in progress, apply the documented concurrency policy.
5. If new, reserve the key and execute the operation safely.
6. Persist the result and make future retries consistent.`
      },
      bullets: [
        "Reuse the same key when retrying the same logical operation.",
        "Generate a new key for a genuinely new operation.",
        "Enforce uniqueness in persistent storage, not only in application memory.",
        "Handle concurrent requests using the same key.",
        "Verify that a repeated key is associated with the same logical request.",
        "Define what happens when an earlier attempt is still processing.",
        "Protect idempotency records from cross-user access.",
        "Use provider-side idempotency for external operations when supported."
      ]
    },
    {
      id: "circuit-breaker",
      title: "Use a Circuit Breaker for Unhealthy Dependencies",
      paragraphs: [
        "A circuit breaker protects an application from repeatedly calling a dependency that is failing or responding too slowly. Repeated failures can consume threads and connections, increase latency, and spread an outage to otherwise healthy services.",
        "A circuit breaker commonly has three states. In the closed state, calls are allowed and outcomes are recorded. In the open state, calls are rejected or handled through a configured fallback. In the half-open state, a limited number of trial calls determine whether the dependency has recovered.",
        "A circuit breaker is not the same as a retry policy. A retry policy decides whether and when to repeat an individual operation. A circuit breaker decides whether calls should be attempted at all based on recent dependency behavior.",
        "Resilience4j is one option for Spring Boot applications. The following example illustrates the annotation style and assumes compatible Resilience4j dependencies, Spring integration, and AOP support have been configured.",
        "Fallbacks must remain truthful. Returning a fabricated successful payment result or silently discarding an order is not a safe fallback. If the operation cannot be completed, return a documented failure or a clearly defined degraded response."
      ],
      code: {
        language: "java",
        code: `import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

@Service
public class InventoryClientService {

    @CircuitBreaker(
            name = "inventoryService",
            fallbackMethod = "inventoryFallback"
    )
    public String checkInventory(String productId) {
        // Call the inventory service using a configured HTTP client.
        // That client must also have appropriate timeouts.
        throw new UnsupportedOperationException(
                "Replace with the actual inventory client call");
    }

    public String inventoryFallback(
            String productId,
            Throwable exception) {

        // Example degraded response.
        // Do not claim inventory is available when its state is unknown.
        return "Inventory service temporarily unavailable";
    }
}`
      },
      bullets: [
        "Closed: normal calls are permitted.",
        "Open: calls are stopped temporarily according to the breaker policy.",
        "Half-open: limited trial calls test recovery.",
        "Configure failure-rate and slow-call thresholds according to observed behavior.",
        "Use timeouts even when a circuit breaker is configured.",
        "Make fallback behavior safe for the business operation.",
        "Monitor breaker state transitions and rejected calls.",
        "Avoid returning success-shaped fallback responses for operations that did not succeed."
      ]
    },
    {
      id: "bulkheads",
      title: "Prevent Cascading Failures with Bulkheads",
      paragraphs: [
        "A bulkhead isolates resources so that one slow dependency or workload cannot consume all capacity needed by other operations. The concept comes from ship compartments: damage in one compartment should not sink the entire ship.",
        "In an application, bulkheads can use separate thread pools, bounded queues, concurrency limits, or connection pools for different dependencies. If the payment service becomes slow, its resource allocation should not prevent unrelated operations from running.",
        "Bulkheads work alongside timeouts, retries, and circuit breakers. They do not repair a failing dependency, but they limit the scope of resource exhaustion and help the rest of the application remain responsive.",
        "Isolation introduces trade-offs. Separate pools consume resources and require capacity planning. Monitor rejected tasks, queue depth, utilization, and latency to ensure the limits are appropriate."
      ],
      bullets: [
        "Separate critical workloads from slow or unreliable dependencies.",
        "Use bounded queues rather than unlimited buffering.",
        "Set concurrency limits based on resource capacity.",
        "Measure queue depth and rejected work.",
        "Combine bulkheads with timeouts and circuit breakers.",
        "Avoid creating excessive thread pools without understanding their resource cost."
      ]
    },
    {
      id: "rate-limiting",
      title: "Use Rate Limiting and Backpressure",
      paragraphs: [
        "Rate limiting controls how much traffic a caller or application can submit over a defined period. It helps protect services from accidental overload, abusive traffic, and sudden bursts that exceed available capacity.",
        "When an API rejects a request because a rate limit has been exceeded, HTTP 429 Too Many Requests is commonly appropriate. The response may include Retry-After when the server can communicate when the client should try again.",
        "Backpressure is a broader technique for preventing producers from overwhelming downstream consumers. Depending on the architecture, it can involve bounded queues, admission control, demand signaling, or rejecting work before the system becomes unstable.",
        "Rate limits should reflect business requirements and resource capacity. Apply appropriate identity or client scoping, and avoid relying solely on untrusted headers to identify a caller."
      ],
      bullets: [
        "Define limits by caller, account, endpoint, or other appropriate scope.",
        "Return a documented rate-limit response.",
        "Use Retry-After when a meaningful retry time is available.",
        "Bound queues and reject work when the system cannot safely accept more.",
        "Monitor rejected requests and saturation.",
        "Avoid automatically retrying rate-limited requests immediately."
      ]
    },
    {
      id: "observability",
      title: "Monitor Errors and Reliability",
      paragraphs: [
        "Reliability mechanisms need observability. A service should track the number of failed requests, timeout frequency, retry attempts, circuit-breaker transitions, rejected requests, and dependency latency.",
        "Use metrics to identify trends, logs to record relevant diagnostic events, and distributed traces to identify which dependency or operation contributed to a failure. Correlation identifiers can help connect related events across a request.",
        "Alert on sustained user-impacting symptoms, such as an elevated error rate, prolonged latency, or excessive dependency timeouts. A high retry count can also indicate that a downstream service is unstable, even if retries temporarily hide some failures from users.",
        "Avoid using unique request IDs or other unbounded values as metric tags. Put high-cardinality diagnostic identifiers in logs or traces instead, where the observability system can handle them appropriately.",
        "Production error handling should be evaluated using measurable outcomes, not just whether an exception handler exists."
      ],
      bullets: [
        "Track request count, error ratio, and latency percentiles.",
        "Measure dependency timeout and failure rates.",
        "Monitor retries and circuit-breaker state changes.",
        "Track queue depth, rejected work, and connection-pool pressure.",
        "Correlate logs and traces using request or trace identifiers.",
        "Alert on sustained symptoms and meaningful service impact.",
        "Keep sensitive data and unbounded identifiers out of metric labels."
      ]
    },
    {
      id: "testing-reliability",
      title: "Test Error Handling and Reliability",
      paragraphs: [
        "Reliability features should be tested under both normal and failure conditions. Unit tests can verify exception mapping and retry decisions, while integration tests can verify the actual HTTP status and response body returned by the application.",
        "Use MockMvc or an appropriate HTTP test client to verify that invalid requests return the documented error contract. For timeouts and retries, use controlled test doubles or a mock downstream server that can simulate delays, failures, and successful recovery.",
        "Test idempotency by submitting the same key more than once and verifying that the business effect occurs only once. Also test concurrent requests, reused keys with different payloads, and recovery from partial failures where relevant.",
        "Circuit-breaker tests should cover normal operation, transition to the open state, fallback behavior, and recovery behavior. Avoid tests that depend on real network outages or unpredictable external systems.",
        "Operational tests should confirm that logs and metrics provide useful diagnostic information without exposing secrets. Alert rules and notification routes should also be exercised before relying on them during an incident."
      ],
      bullets: [
        "Verify the status code and body for each known exception.",
        "Test invalid request data and missing resources.",
        "Simulate slow and unavailable downstream services.",
        "Verify retry limits and backoff behavior.",
        "Verify duplicate requests do not repeat protected side effects.",
        "Test circuit-breaker transitions and fallback behavior.",
        "Confirm sensitive values are not exposed in responses or logs.",
        "Test monitoring alerts and operational runbooks."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Production Reliability Mistakes",
      paragraphs: [
        "A common mistake is returning HTTP 200 with an error message when an operation fails. This forces every client to inspect the response body and may cause monitoring systems to count failed operations as successful HTTP requests.",
        "Another mistake is exposing exception messages directly. Database errors, file paths, internal hostnames, and implementation details can leak through unfiltered messages or stack traces.",
        "Unlimited retries can turn a small dependency issue into a system-wide outage. Retrying writes without idempotency can create duplicate orders or charges. Configuring a circuit breaker without client timeouts can still leave individual calls waiting too long.",
        "A timeout does not prove that a remote operation did not happen. The remote service may have completed the operation after the caller stopped waiting, so a retry may repeat the side effect unless the operation is designed safely.",
        "A fallback must not pretend that an important operation succeeded when the system does not know its outcome. For critical operations, use a safe failure response, reconciliation, or a documented pending state.",
        "Finally, catching and ignoring every exception hides defects and makes production behavior unpredictable. Handle known failures explicitly and allow unexpected failures to be recorded and investigated."
      ],
      bullets: [
        "Returning HTTP 200 for failed operations.",
        "Exposing stack traces or raw database exception messages.",
        "Using one generic status code for every failure.",
        "Retrying every exception without classification.",
        "Using unlimited retries or no backoff.",
        "Retrying non-idempotent writes without duplicate protection.",
        "Assuming a timeout means the remote operation never happened.",
        "Using circuit breakers without timeouts or resource limits.",
        "Returning misleading fallback responses.",
        "Catching exceptions and silently ignoring them."
      ]
    },
    {
      id: "best-practices",
      title: "Production Error Handling Best Practices",
      paragraphs: [
        "Design a consistent API error contract and document the status codes clients can expect. Use specific exceptions for known application conditions, and map them centrally to safe responses.",
        "Configure connection, response, and database timeouts based on measured latency and the total request deadline. Keep connection pools and queues bounded so that slow dependencies cannot consume unlimited resources.",
        "Apply retries only to suitable transient failures. Use a limited attempt count, backoff, and jitter where appropriate. Ensure non-idempotent operations have a safe retry strategy before enabling automatic retries.",
        "Use circuit breakers and bulkheads when they address realistic dependency-failure risks. Keep fallback behavior honest and make degraded operation explicit to callers.",
        "Instrument failures, latency, retries, and dependency health. Maintain dashboards, actionable alerts, and runbooks that help responders diagnose incidents quickly.",
        "Review reliability behavior after incidents. Update error contracts, timeout budgets, retry policies, tests, and monitoring based on evidence from real failures."
      ],
      bullets: [
        "Keep API errors consistent and documented.",
        "Return safe messages and stable error codes.",
        "Use specific exception mappings for expected failures.",
        "Configure explicit timeouts and resource limits.",
        "Bound retries and avoid retry storms.",
        "Use idempotency to protect important write operations.",
        "Combine circuit breakers and bulkheads with timeouts where appropriate.",
        "Measure reliability with metrics, logs, and traces.",
        "Test failure paths before production deployment.",
        "Review incidents and improve the system continuously."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you handle exceptions consistently in Spring Boot?",
          answer: "Use @RestControllerAdvice and @ExceptionHandler to map known exceptions to suitable HTTP statuses and a consistent error response format. Handle security-filter failures through Spring Security's authentication and authorization handlers where necessary."
        },
        {
          question: "Why are timeouts important in microservices?",
          answer: "Timeouts limit how long a request waits on a dependency and help prevent slow remote systems from exhausting threads, connections, and other resources."
        },
        {
          question: "What is idempotency?",
          answer: "An operation is idempotent when repeating it has the same intended effect as performing it once. It helps make retries safer when a client cannot determine whether the original request succeeded."
        },
        {
          question: "Should every failed request be retried?",
          answer: "No. Retry only suitable transient failures, use bounded attempts and backoff, and account for whether the operation is safe to repeat."
        },
        {
          question: "What is a circuit breaker?",
          answer: "A circuit breaker temporarily stops calls to a failing dependency after configured conditions are reached. It can allow limited trial calls later to determine whether the dependency has recovered."
        },
        {
          question: "What is the difference between a connection timeout and a response timeout?",
          answer: "A connection timeout limits the time to establish a connection. A response or read timeout limits waiting for response data, according to the HTTP client's semantics."
        },
        {
          question: "What is exponential backoff?",
          answer: "Exponential backoff increases the delay between successive retry attempts. Jitter can add randomness to reduce synchronized retries from multiple clients."
        },
        {
          question: "What is the purpose of an idempotency key?",
          answer: "It identifies one logical operation so that repeated requests can return a consistent outcome instead of repeating the business side effect. The server must persist and enforce key uniqueness and handle concurrent requests safely."
        },
        {
          question: "Why is retrying a payment request dangerous?",
          answer: "A timeout does not prove that the payment failed. The provider may have completed the charge even though the response was lost. Use provider-supported idempotency or another reliable reconciliation mechanism before repeating the operation."
        },
        {
          question: "What are the three common circuit-breaker states?",
          answer: "Closed allows normal calls, open blocks calls temporarily, and half-open permits limited trial calls to test whether the dependency has recovered."
        },
        {
          question: "What is a bulkhead pattern?",
          answer: "A bulkhead isolates resources, such as thread pools or connection pools, so that a slow dependency or workload cannot consume all capacity needed by other operations."
        },
        {
          question: "What is the difference between a retry and a circuit breaker?",
          answer: "A retry repeats an individual operation after a suitable failure. A circuit breaker uses recent failure behavior to decide whether calls to a dependency should be attempted at all."
        },
        {
          question: "What is the difference between HTTP 401 and HTTP 403?",
          answer: "401 indicates that valid authentication is required or authentication failed. 403 indicates that the caller is not permitted to perform the requested operation."
        },
        {
          question: "When should an API return HTTP 409?",
          answer: "409 Conflict is appropriate when a request conflicts with the current resource state, such as a duplicate creation or an invalid state transition, according to the API contract."
        },
        {
          question: "Why should raw exception messages not be returned to clients?",
          answer: "They may reveal SQL statements, internal paths, hostnames, implementation details, or sensitive values. Return a safe message and stable error code while recording protected diagnostic information in server-side logs."
        },
        {
          question: "Can @RestControllerAdvice handle every Spring Security error?",
          answer: "No. Some authentication and authorization failures occur in the security filter chain before controller invocation. Configure an AuthenticationEntryPoint and AccessDeniedHandler for those cases."
        },
        {
          question: "How would you prevent duplicate order creation when a client retries?",
          answer: "Accept an idempotency key, scope it to the caller and operation, persist it with uniqueness enforcement, and return the previously recorded outcome for a repeated request. Handle concurrent requests and coordinate the key record with the business operation."
        },
        {
          question: "How would you investigate repeated downstream timeouts?",
          answer: "Check timeout and error metrics, dependency latency percentiles, connection-pool usage, logs, and distributed traces. Review recent deployments and traffic changes, confirm timeout budgets, and determine whether retries or resource exhaustion are worsening the problem."
        },
        {
          question: "What should a fallback method return?",
          answer: "A fallback should return a safe, documented degraded result or failure response. It must not claim that an operation succeeded when its outcome is unknown or when the required business action was not completed."
        },
        {
          question: "How do you prevent cascading failures?",
          answer: "Use explicit timeouts, bounded retries with backoff, circuit breakers, bulkheads, resource limits, and suitable load shedding. Monitor dependency behavior and test failure scenarios before production."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Production reliability combines consistent error responses with controls that prevent one failure from spreading through the application. Spring Boot supports centralized exception handling through @RestControllerAdvice and @ExceptionHandler.",
        "Timeouts limit waiting, retries help with suitable transient failures, idempotency prevents duplicate business effects, circuit breakers reduce calls to unhealthy dependencies, and bulkheads isolate resource consumption.",
        "These techniques work together. Retries need a bounded policy, circuit breakers still need timeouts, and a timed-out write may have succeeded remotely. Use safe API contracts, observability, and failure-focused tests to verify production behavior."
      ],
      bullets: [
        "API errors: stable codes, safe messages, suitable HTTP statuses.",
        "Timeouts: bound waiting on dependencies.",
        "Retries: limited attempts, suitable failures, backoff, and jitter.",
        "Idempotency: repeated logical requests do not repeat the intended side effect.",
        "Circuit breaker: temporarily blocks calls to an unhealthy dependency.",
        "Bulkhead: isolates resources between workloads.",
        "Rate limiting: controls incoming request volume.",
        "Observability: metrics, logs, and distributed traces.",
        "Testing: verify both expected failures and recovery behavior."
      ]
    }
  ]
};
