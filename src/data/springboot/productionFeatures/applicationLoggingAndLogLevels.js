
export const applicationLoggingAndLogLevels = {
  id: 1404,
  title: "Application Logging and Log Levels",
  slug: "application-logging-and-log-levels",
  topicTitle: "Spring Boot Production Features",
  description:
    "Learn structured logging, log levels, exception logging, correlation IDs, centralized logging, and safe production log configuration.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "logging",
      title: "Why Is Logging Important?",
      paragraphs: [
        "Logging records important events that occur while an application is running. Developers and operations teams use logs to understand application behavior, investigate failures, identify performance problems, and determine what happened before an error occurred.",
        "Consider an e-commerce application in which a customer places an order. The request may pass through a controller, service, database repository, and payment gateway. If payment fails, logs can help identify which operation failed and the order involved without requiring a developer to reproduce the issue locally.",
        "Spring Boot commonly uses SLF4J as the logging API and Logback as the default logging implementation when using the standard starter configuration. SLF4J provides a consistent interface, while Logback performs the actual logging.",
        "Logging is different from debugging. Debugging usually involves inspecting program execution during development, whereas logging records selected events that can be reviewed later, including in production environments.",
        "Production logs should be meaningful, searchable, consistent, and safe. Logging every variable or every method call can create excessive output, increase storage costs, reduce performance, and expose sensitive information.",
        "Logs complement metrics and distributed traces. Logs explain individual events, metrics summarize numerical behavior such as request error rates, and traces help follow a request across multiple services."
      ],
      bullets: [
        "DEBUG: detailed diagnostic information, such as intermediate processing decisions.",
        "INFO: significant normal events, such as application startup or successful business operations.",
        "WARN: unusual conditions that deserve attention but do not necessarily stop an operation.",
        "ERROR: failures that prevent an operation from completing as expected.",
        "TRACE: very detailed diagnostic information, usually enabled only for targeted troubleshooting.",
        "FATAL is not a standard SLF4J logging method; some logging systems use it as a separate severity level.",
        "Choose levels based on operational significance, not simply on how important the message feels.",
        "Never log passwords, authentication tokens, private keys, or full payment-card details.",
        "Use logs to explain events and metrics to measure trends and rates."
      ],
      code: {
        language: "text",
        code: `Example application log:

2026-10-07 10:15:22 INFO  [http-nio-8080-exec-2]
c.c.service.OrderService - Order created: orderId=ORD-101

2026-10-07 10:15:23 WARN  [http-nio-8080-exec-2]
c.c.service.InventoryService - Low stock: productId=PROD-10

2026-10-07 10:15:24 ERROR [http-nio-8080-exec-2]
c.c.service.PaymentService - Payment failed: orderId=ORD-101`
      },
      output:
        "The example illustrates how timestamps, severity levels, thread names, logger names, and contextual messages help developers understand application events. Exact log formatting depends on the configured logging implementation and pattern.",
      bullets: [
        "A timestamp tells when the event occurred.",
        "A severity level helps filter events.",
        "A logger name helps locate the relevant application component.",
        "Context such as orderId helps correlate related events.",
        "Thread names can be useful for diagnosing concurrent execution, but they are not a replacement for request correlation IDs."
      ]
    },
    {
      id: "slf4j",
      title: "Use a Logger in a Service",
      paragraphs: [
        "A logger is an object used to record messages at different severity levels. In a Spring Boot service, create a logger associated with the class so that log entries can be traced back to the component that generated them.",
        "SLF4J provides methods such as trace(), debug(), info(), warn(), and error(). The configured logging level determines which messages are emitted.",
        "Parameterized logging uses placeholders such as {}. Instead of manually concatenating strings, provide values as additional arguments. This makes log statements easier to read and avoids unnecessary message construction when a level is disabled.",
        "Logging a business event does not mean that the event is guaranteed to succeed. For example, log a payment as completed only after the payment operation has actually completed successfully.",
        "Use stable identifiers, such as orderId or requestId, when they help troubleshoot an operation. Do not include secrets or unrestricted user-provided content in log messages."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private static final Logger log =
            LoggerFactory.getLogger(PaymentService.class);

    public void processPayment(String orderId) {
        log.info("Starting payment for orderId={}", orderId);

        // Perform payment processing here.

        log.info(
            "Payment processing completed for orderId={}",
            orderId
        );
    }
}`
      },
      output:
        "When the INFO level is enabled, the logger records the start and successful completion messages. The actual payment logic is omitted from this example.",
      bullets: [
        "Use a class-specific logger instead of System.out.println().",
        "Prefer parameterized messages such as log.info(\"Order {} created\", orderId).",
        "Use DEBUG for detailed diagnostic information that should not normally appear in production.",
        "Use INFO for meaningful business or application lifecycle events.",
        "Use WARN for recoverable but unexpected conditions.",
        "Use ERROR for failures requiring investigation or operational attention.",
        "Avoid logging the same event at every layer of a request.",
        "Do not treat the presence of an INFO message as proof that a database transaction has committed; place success logs carefully."
      ]
    },
    {
      id: "configuration",
      title: "Configure Log Levels",
      paragraphs: [
        "Spring Boot supports logging configuration through application.properties or application.yml. You can configure a root logging level and override it for particular packages or classes.",
        "The root level controls the default logging threshold. A package-specific level can enable more detailed messages for one part of the application without enabling them throughout every dependency.",
        "For example, a production environment might use INFO for application code and WARN for a noisy framework package. During an incident, DEBUG can temporarily be enabled for a selected package after considering the performance and data-exposure implications.",
        "Logging configuration can vary between development, testing, and production through environment-specific configuration files or external configuration. Avoid making verbose logging a permanent global production setting.",
        "A configured level acts as a threshold. Setting a package to WARN normally permits WARN and ERROR messages while excluding INFO, DEBUG, and TRACE messages for that package, subject to more specific configuration."
      ],
      code: {
        language: "yaml",
        code: `logging:
  level:
    root: INFO
    com.codeforge: INFO
    org.springframework.web: WARN
    com.codeforge.payment: DEBUG`
      },
      output:
        "The root logger uses INFO, application packages use INFO by default, Spring Web uses WARN, and the payment package has a more specific DEBUG setting. The package-specific setting allows more detailed payment diagnostics.",
      bullets: [
        "Configure root and package-specific log levels deliberately.",
        "Use DEBUG selectively for troubleshooting.",
        "Review sensitive-data exposure before increasing log verbosity.",
        "Keep log messages consistent across application components.",
        "Avoid setting all third-party libraries to DEBUG without a specific reason.",
        "Review log volume and retention after changing production log levels."
      ],
      code: {
        language: "properties",
        code: `logging.level.root=INFO
logging.level.com.codeforge=DEBUG
logging.level.org.springframework.web=WARN`
      }
    },
    {
      id: "exceptions",
      title: "Log Exceptions Correctly",
      paragraphs: [
        "Exceptions provide information about failures during program execution. When a failure needs to be investigated, a log entry should include enough safe context to identify the operation and the exception that occurred.",
        "SLF4J supports passing a Throwable as an argument so the logging implementation can record its stack trace. Passing only exception.getMessage() generally loses useful stack-trace information.",
        "An exception should not automatically be logged at every layer. If a repository logs an exception, a service logs the same exception, and a controller logs it again, one failure can generate several nearly identical stack traces. Prefer logging at a layer that can add meaningful context or make the operational decision.",
        "If a service cannot recover from an exception, it may propagate the exception to a caller or centralized exception handler. Logging and rethrowing should be intentional: avoid changing the exception type or losing its original cause accidentally.",
        "Client-facing error responses should not expose stack traces, internal file paths, database statements, secrets, or implementation details. Internal logs and public API responses serve different audiences."
      ],
      code: {
        language: "java",
        code: `try {
    paymentGateway.charge(orderId);
} catch (PaymentException exception) {
    log.error(
        "Payment failed for orderId={}",
        orderId,
        exception
    );

    throw exception;
}`
      },
      output:
        "The error message includes the order identifier, and the exception object allows the logger to include its stack trace. The exception is then propagated to the caller.",
      bullets: [
        "Include useful diagnostic context, such as an order identifier or operation name.",
        "Pass the Throwable itself when a stack trace is required.",
        "Preserve the original exception cause when wrapping an exception.",
        "Avoid logging and rethrowing the same failure repeatedly at every layer.",
        "Use centralized exception handling to produce consistent API error responses.",
        "Never return internal stack traces directly to clients in production.",
        "Sanitize untrusted values to prevent log injection through forged newline or control characters."
      ],
      code: {
        language: "java",
        code: `// Example: wrap a lower-level failure and preserve its cause.

try {
    paymentGateway.charge(orderId);
} catch (PaymentException exception) {
    throw new OrderPaymentFailedException(
        "Unable to process payment for order " + orderId,
        exception
    );
}

// A centralized handler can log the failure once,
// then return a safe API response.`
      }
    },
    {
      id: "structured-logging",
      title: "Structured Logging and Searchable Fields",
      paragraphs: [
        "Structured logging records log events with separate fields rather than relying only on a long, unstructured sentence. A JSON log entry can contain a timestamp, severity, logger name, message, requestId, orderId, and service name.",
        "Structured fields make it easier for a log aggregation platform to search, filter, group, and analyze events. For example, an operator can filter all ERROR events for a particular order or group payment failures by service.",
        "A message that embeds identifiers in arbitrary text may still be searchable, but structured fields provide a more consistent way to query data. The exact JSON format and configuration depend on the logging implementation and the application's chosen encoder.",
        "Do not label a log format as structured JSON merely because the message contains braces. Use a JSON encoder or logging configuration that actually emits valid structured records."
      ],
      code: {
        language: "json",
        code: `{
  "timestamp": "2026-10-07T10:15:22Z",
  "level": "INFO",
  "service": "order-service",
  "message": "Order created",
  "orderId": "ORD-101",
  "requestId": "req-7f21"
}`
      },
      bullets: [
        "Prefer stable field names across services.",
        "Use JSON output when your log collection pipeline supports structured records.",
        "Include service and environment identifiers when appropriate.",
        "Keep field values bounded and avoid large request or response bodies.",
        "Do not put credentials, bearer tokens, or sensitive personal information in structured fields.",
        "Use an established JSON logging encoder or supported Spring Boot logging configuration rather than manually constructing JSON strings."
      ]
    },
    {
      id: "correlation-ids",
      title: "Correlation IDs and Request Tracing",
      paragraphs: [
        "A correlation ID is an identifier used to connect log events that belong to the same request or business operation. It becomes especially useful when requests pass through multiple components or microservices.",
        "For example, a checkout request may call an order service, inventory service, and payment service. A shared correlation identifier helps an operator find related log entries across these components.",
        "A request identifier can be generated at the application boundary or accepted from a trusted upstream service. Incoming identifiers should be validated and length-limited. Do not trust arbitrary client-supplied values without validation, and do not use a correlation ID as an authorization credential.",
        "SLF4J's MDC, or Mapped Diagnostic Context, allows contextual values to be associated with the current execution context so a logging pattern or encoder can include them automatically.",
        "MDC values must be cleaned up when execution finishes. In servlet applications, a filter is a common place to set and remove request context. Asynchronous execution and thread pools require additional care because context does not automatically propagate across every execution boundary."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.logging;

import java.io.IOException;
import java.util.UUID;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class CorrelationIdFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String requestId = UUID.randomUUID().toString();

        try {
            MDC.put("requestId", requestId);
            response.setHeader("X-Request-Id", requestId);

            filterChain.doFilter(request, response);
        } finally {
            MDC.remove("requestId");
        }
    }
}`
      },
      bullets: [
        "The filter creates a request identifier for each incoming request.",
        "MDC makes the identifier available to compatible logging configurations on the current thread.",
        "The finally block prevents stale context from leaking into a later request handled by a reused thread.",
        "Configure the log pattern or JSON encoder to emit the requestId field; setting MDC alone does not guarantee that it appears in output.",
        "For distributed systems, propagate trace context using established tracing standards and libraries where appropriate.",
        "For asynchronous work, explicitly configure context propagation or use tracing instrumentation.",
        "If the application accepts a request ID from upstream, validate its format and size before using it."
      ]
    },
    {
      id: "logging-in-spring-boot",
      title: "Logging Configuration in Spring Boot",
      paragraphs: [
        "Spring Boot's standard starter configuration usually provides SLF4J and Logback without requiring an additional logging dependency. In most applications, the recommended starting point is to use the default setup and configure the required levels.",
        "The logging system can be configured through application.properties, application.yml, and supported logging configuration files. More advanced setups may use Logback configuration for custom appenders, rolling files, or specialized output formats.",
        "For containerized applications, writing logs to standard output and standard error is often practical because the container runtime or deployment platform can collect and route them. If files are used, configure rotation, retention, disk limits, and access permissions.",
        "Spring Boot Actuator can expose operational information such as health and metrics, depending on which endpoints are enabled and secured. It is not a substitute for a logging backend, and operational endpoints should not be exposed indiscriminately."
      ],
      code: {
        language: "yaml",
        code: `spring:
  application:
    name: order-service

logging:
  level:
    root: INFO
    com.codeforge: INFO
  pattern:
    console: "%d{yyyy-MM-dd'T'HH:mm:ss.SSSXXX} %-5level [%thread] %logger{36} - %msg%n"`
      },
      bullets: [
        "The application name helps identify which service emitted an event.",
        "The console pattern includes a timestamp, level, thread, logger, and message.",
        "Patterns control text formatting; they do not automatically produce JSON.",
        "Use environment-specific configuration when development and production require different verbosity.",
        "Ensure log destinations are writable and have appropriate permissions.",
        "For file logging, configure rolling and retention so logs do not fill the disk.",
        "Secure Actuator endpoints and expose only the operational information that is required."
      ]
    },
    {
      id: "centralized-logging",
      title: "Centralized Logging in Production",
      paragraphs: [
        "In a production system, logs may come from multiple application instances, containers, and services. Inspecting each machine separately becomes difficult as the system grows.",
        "Centralized logging collects records from multiple sources into a searchable platform. Teams can filter by time, service, severity, request ID, and other fields to investigate an incident.",
        "A typical pipeline is application logs to a collector or agent, then to a centralized log store, and finally to a dashboard or search interface. The particular tools depend on the deployment environment and organizational requirements.",
        "Centralization improves investigation, but it also creates a security responsibility. Access controls, retention rules, encryption, and data redaction should be considered because centralized logs can contain operationally sensitive information.",
        "Logging infrastructure can fail or become unavailable. Applications should have an appropriate operational policy for buffering, dropped logs, backpressure, and storage limits rather than assuming every event will always be retained."
      ],
      bullets: [
        "Collect logs from all relevant application instances.",
        "Use consistent timestamps and service identifiers.",
        "Search by correlation ID to follow a request across services.",
        "Configure access controls and retention policies.",
        "Monitor log ingestion failures, volume spikes, and storage capacity.",
        "Avoid logging secrets even when a centralized platform is access-controlled.",
        "Use metrics and distributed tracing alongside logs for a fuller view of system behavior."
      ],
      code: {
        language: "text",
        code: `Spring Boot application
        |
        v
Console / JSON log output
        |
        v
Log collector or platform agent
        |
        v
Centralized log storage
        |
        v
Search, dashboards, and alerts`
      }
    },
    {
      id: "logging-best-practices",
      title: "Production Logging Best Practices",
      paragraphs: [
        "Effective logging balances diagnostic usefulness, operational cost, application performance, and privacy. The objective is not to record everything; it is to record enough reliable context to understand important events and failures.",
        "Establish a consistent logging policy across controllers, services, repositories, and background workers. Choose a clear owner for each significant error so that failures are not reported redundantly at every layer.",
        "Use stable identifiers and structured fields to support searching. Avoid large payloads, arbitrary user-controlled content, and unnecessary database output. Review the policy whenever new endpoints, integrations, or sensitive data fields are introduced.",
        "Production logging should also be tested. Confirm that expected events appear at the selected level, that exceptions retain their stack traces, and that sensitive values are not emitted."
      ],
      bullets: [
        "Use SLF4J parameterized logging instead of unnecessary string concatenation.",
        "Choose DEBUG, INFO, WARN, and ERROR consistently.",
        "Avoid logging passwords, access tokens, refresh tokens, private keys, and payment-card data.",
        "Mask or omit personal information when it is not needed for troubleshooting.",
        "Avoid duplicate stack traces for the same failure.",
        "Use correlation IDs or distributed trace context for request-level diagnosis.",
        "Set log rotation and retention limits where files are used.",
        "Use appropriate access controls and retention policies for centralized logs.",
        "Review unexpected log-volume increases because they can indicate loops, retries, or a production incident.",
        "Do not swallow exceptions merely to avoid error logs.",
        "Do not use logging as a replacement for metrics, health checks, or tracing.",
        "Avoid logging full HTTP headers or request bodies by default, since they may contain credentials or sensitive information."
      ]
    },
    {
      id: "common-logging-mistakes",
      title: "Common Logging Mistakes",
      paragraphs: [
        "Logging mistakes can make production incidents harder to investigate or create security and performance problems. Common issues include recording too much information, recording too little context, and treating every exception as a new error at every layer.",
        "A frequent mistake is using System.out.println() throughout application code. It does not provide the same configurable levels and integration capabilities as a logging framework.",
        "Another mistake is logging only exception.getMessage(). This may omit the stack trace needed to identify the source of the failure. Conversely, printing the same exception at several layers can create unnecessary noise.",
        "Developers should also avoid logging a success message before the operation has actually succeeded. For example, a message saying that an order was saved should not be emitted before the save operation has completed successfully."
      ],
      bullets: [
        "Mistake: logging secrets for easier debugging. Better: log safe identifiers and redact sensitive values.",
        "Mistake: enabling DEBUG globally in production. Better: enable it only for targeted components and a limited period.",
        "Mistake: logging only an exception message. Better: pass the Throwable when a stack trace is needed.",
        "Mistake: logging the same exception in every layer. Better: log where useful context or operational handling is added.",
        "Mistake: relying on logs to measure request rates. Better: use metrics for numerical trends.",
        "Mistake: setting MDC and never clearing it. Better: remove context in a finally block.",
        "Mistake: assuming MDC automatically propagates to every asynchronous task. Better: configure explicit context propagation or tracing support.",
        "Mistake: assuming a text pattern creates valid JSON. Better: use a proper JSON encoder when structured JSON is required."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is application logging?",
          answer: "Application logging records selected events during execution. It helps developers and operations teams investigate errors, understand application behavior, and troubleshoot production issues."
        },
        {
          question: "What is the difference between logging and System.out.println?",
          answer: "A logging framework provides configurable severity levels, formatting, exception stack traces, and integration with log collection systems. System.out.println is a basic console-printing mechanism without those built-in capabilities."
        },
        {
          question: "Which logging framework does Spring Boot use by default?",
          answer: "With the standard starter logging configuration, Spring Boot commonly uses SLF4J as the logging API and Logback as the implementation."
        },
        {
          question: "What is SLF4J?",
          answer: "SLF4J is a logging facade that provides a common API. It allows application code to use familiar logging methods while a compatible logging implementation performs the actual logging."
        },
        {
          question: "What are the common logging levels?",
          answer: "TRACE, DEBUG, INFO, WARN, and ERROR are common SLF4J levels. TRACE is highly detailed, DEBUG supports diagnosis, INFO records normal significant events, WARN reports unusual conditions, and ERROR reports failures."
        },
        {
          question: "What is the difference between INFO and DEBUG?",
          answer: "INFO is intended for significant application events that are useful during normal operation. DEBUG provides more detailed diagnostic information and is commonly disabled in production unless temporarily needed."
        },
        {
          question: "When should you use WARN and ERROR?",
          answer: "WARN is appropriate for an unexpected condition that deserves attention but may be recoverable. ERROR is appropriate when an operation fails or a significant problem requires investigation."
        },
        {
          question: "How do you configure logging levels in Spring Boot?",
          answer: "Use logging.level.root and package-specific properties in application.properties or the equivalent logging.level entries in application.yml."
        },
        {
          question: "Why is parameterized logging useful?",
          answer: "Parameterized logging uses placeholders such as {} and supplies values separately. It improves readability and avoids unnecessary message construction when the corresponding logging level is disabled."
        },
        {
          question: "How should an exception be logged?",
          answer: "Include safe diagnostic context and pass the Throwable object to the logger when a stack trace is required. Avoid duplicate logs that add no useful information."
        },
        {
          question: "Why should passwords and JWTs not be logged?",
          answer: "Logs may be collected, retained, and accessed by multiple operational systems or users. Exposing passwords or bearer tokens can enable unauthorized access."
        },
        {
          question: "What is structured logging?",
          answer: "Structured logging records events as fields, often in JSON. Fields such as timestamp, level, service, requestId, and orderId make records easier to search and analyze."
        },
        {
          question: "What is a correlation ID?",
          answer: "A correlation ID is an identifier used to connect log events belonging to the same request or business operation, especially when multiple services process that operation."
        },
        {
          question: "What is MDC in SLF4J?",
          answer: "Mapped Diagnostic Context stores contextual values associated with the current execution context. Logging patterns or encoders can include values such as requestId automatically. Context must be cleaned up and propagated appropriately."
        },
        {
          question: "Why should MDC values be removed after a request?",
          answer: "Servlet containers reuse threads. If a request leaves its MDC values behind, a later request handled by the same thread could inherit incorrect context. A finally block is commonly used for cleanup."
        },
        {
          question: "What is centralized logging?",
          answer: "Centralized logging collects records from multiple services or application instances into a common platform, allowing teams to search, filter, correlate, and investigate incidents in one place."
        },
        {
          question: "What is the difference between logs, metrics, and traces?",
          answer: "Logs describe individual events, metrics summarize numerical measurements such as latency and error rate, and traces follow the path of a request across components or services."
        },
        {
          question: "Should every caught exception be logged?",
          answer: "No. Log a failure where it can be handled meaningfully or where useful context is added. Repeatedly logging and rethrowing the same exception at every layer can create noisy, duplicate stack traces."
        },
        {
          question: "How do you troubleshoot a production issue using logs?",
          answer: "Identify the approximate time and affected service, filter by severity and relevant identifiers, follow the request or correlation ID, inspect the exception stack trace, and compare the events with metrics and traces."
        },
        {
          question: "Why is excessive logging a problem?",
          answer: "Excessive logging can increase storage and ingestion costs, affect performance, make important events harder to find, and accidentally expose sensitive information."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Application logging records meaningful runtime events and supports troubleshooting, monitoring, and incident investigation. A good production logging strategy uses consistent severity levels, safe contextual fields, appropriate retention, and controlled log volume."
      ],
      bullets: [
        "SLF4J is the logging API; Logback is the common default implementation in Spring Boot starter applications.",
        "TRACE and DEBUG are diagnostic levels; INFO records significant normal events.",
        "WARN indicates an unusual condition; ERROR indicates a significant failure.",
        "Use parameterized logging with {} placeholders.",
        "Pass exceptions as Throwable arguments when stack traces are needed.",
        "Never log passwords, tokens, private keys, or sensitive payment details.",
        "Configure levels with logging.level.root and package-specific settings.",
        "Use structured logging for searchable fields and correlation IDs to connect related events.",
        "Use centralized logging for multi-instance applications.",
        "Use metrics for numerical trends and distributed tracing for cross-service request paths."
      ]
    }
  ]
};
