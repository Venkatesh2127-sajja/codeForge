
export const applicationMetricsAndMicrometer = {
  id: 1403,
  title: "Application Metrics and Micrometer",
  slug: "application-metrics-and-micrometer",
  topicTitle: "Spring Boot Production Features",
  description:
    "Understand metrics, Micrometer, counters, timers, gauges, JVM metrics, HTTP request metrics, Prometheus integration, and production monitoring.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "metrics",
      title: "What Are Application Metrics?",
      paragraphs: [
        "Application metrics are numerical measurements collected over time to understand an application's health, performance, resource consumption, and business activity. Examples include HTTP request counts, response duration, JVM memory usage, garbage collection activity, error rates, and database connection pool utilization.",
        "Consider a Spring Boot application deployed in production. If users report that API responses are slow, metrics can help determine whether response latency has increased, traffic has grown, the JVM is experiencing memory pressure, or database connections are becoming exhausted.",
        "Metrics are most useful when collected continuously and viewed as time series. A single memory measurement tells you how much memory was used at one moment, while a graph over time helps reveal whether usage is stable, increasing, or approaching a limit.",
        "Spring Boot integrates with Micrometer, which provides an instrumentation API and integrations for supported monitoring systems. Spring Boot Actuator provides operational endpoints and automatically configures many useful measurements when the relevant dependencies and instrumentation are present.",
        "Metrics, logs, and distributed traces serve different purposes. Metrics reveal trends and numerical behavior, logs explain individual events, and traces show how a request travels through components and services."
      ],
      bullets: [
        "Counter: records an accumulating number of events.",
        "Timer: records operation duration and the number of recorded operations.",
        "Gauge: samples a value that can increase or decrease.",
        "Distribution summary: records the distribution of sampled values, such as request sizes or order amounts.",
        "HTTP server metrics help measure request counts and latency.",
        "JVM metrics help monitor memory, garbage collection, and thread activity.",
        "Database pool metrics help identify connection utilization and potential exhaustion.",
        "Business metrics can measure events such as orders created or payments completed.",
        "Metrics support dashboards, alerting, capacity planning, and incident investigation.",
        "Avoid high-cardinality tags such as raw user IDs, order IDs, and request IDs."
      ],
      code: {
        language: "text",
        code: `Example monitoring dashboard:

HTTP requests per second:       125
HTTP 5xx error rate:             1.2%
Average request duration:        180 ms
95th percentile duration:        420 ms
JVM heap used:                   650 MB
Active database connections:     18`
      },
      output:
        "These are illustrative measurements, not real readings from an application. Together, they help an operator understand traffic, reliability, latency, memory use, and database activity.",
      bullets: [
        "Request rate indicates how much traffic the application is handling.",
        "Error rate shows the proportion or number of failed requests.",
        "Percentile latency reveals slower requests that an average can hide.",
        "Memory and connection measurements help detect resource pressure.",
        "Use trends and alert thresholds rather than relying on one isolated reading."
      ]
    },
    {
      id: "micrometer",
      title: "What Is Micrometer?",
      paragraphs: [
        "Micrometer is an instrumentation facade for application metrics. It provides a consistent programming API for recording measurements without forcing application code to depend directly on one monitoring vendor.",
        "A MeterRegistry manages registered meters such as counters, timers, gauges, and distribution summaries. A registry implementation determines how those measurements are exposed or exported to a monitoring system.",
        "Spring Boot can automatically configure a registry when the appropriate Micrometer registry dependency is available. For example, a Prometheus registry allows measurements to be exposed in a format that Prometheus can scrape.",
        "Micrometer also supports common metric conventions such as names, descriptions, tags, and statistical measurements. Consistent names and tags make dashboards and queries easier to maintain across services.",
        "Metrics should be designed carefully. Each unique combination of a metric name and its tag values can create a separate time series in a monitoring backend. Unbounded tag values can create high cardinality, increasing memory usage, storage requirements, and monitoring costs."
      ],
      bullets: [
        "MeterRegistry manages meters registered by application code and instrumentation.",
        "Counter records accumulating events.",
        "Timer records duration and count for operations.",
        "Gauge samples a value that may rise or fall.",
        "DistributionSummary records the distribution of sampled values.",
        "Tags add bounded dimensions such as operation, outcome, or service type.",
        "Registry dependencies and configuration depend on the chosen monitoring backend.",
        "Use stable metric names and a consistent naming convention.",
        "Never use a unique request ID or raw user ID as a general-purpose metric tag."
      ],
      code: {
        language: "java",
        code: `import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class InventoryMetricsService {

    private final MeterRegistry registry;

    public InventoryMetricsService(MeterRegistry registry) {
        this.registry = registry;
    }

    public void recordStockCheck(String outcome) {
        registry.counter(
            "codeforge.inventory.stock.checks",
            "outcome",
            outcome
        ).increment();
    }
}`
      },
      output:
        "This example records stock-check events by outcome. The possible outcome values should come from a small, controlled set, such as success or failure, rather than arbitrary input supplied by a user.",
      bullets: [
        "Constructor injection provides the registry managed by Spring.",
        "Tags let operators compare measurements by a bounded dimension.",
        "For frequently used meters, consider creating and registering the meter once and reusing it.",
        "A registry does not automatically send data to every monitoring platform; the corresponding integration must be configured."
      ]
    },
    {
      id: "custom-counter",
      title: "Create a Custom Counter",
      paragraphs: [
        "A Counter measures an accumulating number of events. It is useful for events such as successful order submissions, payment failures, or messages processed.",
        "A counter normally increases and does not represent a current inventory level or queue size. Monitoring systems often calculate the rate of increase over a time window to show how quickly events are occurring.",
        "Create and register a counter once, then reuse it whenever the corresponding event occurs. Increment it only after the event being measured has actually happened.",
        "For example, a successful-order counter should be incremented after the order has been successfully created according to the application's business rules. Incrementing before the operation finishes can produce misleading measurements."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;

import org.springframework.stereotype.Service;

@Service
public class OrderMetricsService {

    private final Counter successfulOrders;

    public OrderMetricsService(MeterRegistry registry) {
        this.successfulOrders = Counter.builder(
                    "codeforge.orders.created")
                .description("Successfully created orders")
                .register(registry);
    }

    public void recordSuccessfulOrder() {
        successfulOrders.increment();
    }
}`
      },
      bullets: [
        "MeterRegistry manages registered meters.",
        "Register a reusable counter instead of constructing a new meter for every event.",
        "Call increment only when the measured event has actually occurred.",
        "Use separate counters or a bounded outcome tag to distinguish meaningful outcomes.",
        "Keep metric names stable and document their meanings.",
        "A process restart may reset in-memory counter state; monitoring backends can calculate rates across collected samples and handle counter resets."
      ],
      code: {
        language: "java",
        code: `// Example: increment after successful business processing.

orderRepository.save(order);

// Record success after the save operation returns successfully.
orderMetricsService.recordSuccessfulOrder();`
      },
      output:
        "The counter is incremented after the save call succeeds. This example assumes that the save operation's return is the success point appropriate for the application; transaction completion and external side effects may require more careful placement."
    },
    {
      id: "timers-and-gauges",
      title: "Use Timers and Gauges",
      paragraphs: [
        "A Timer measures how long operations take and records the number of timed operations. Timers are useful for monitoring service methods, external API calls, database operations, and other work where latency matters.",
        "Timer measurements commonly include a count and total duration. Depending on the registry and configuration, additional statistics such as percentiles or histogram buckets may be available.",
        "A Gauge samples a value that can increase or decrease, such as the number of items waiting in a queue or the current size of a collection. A gauge is not an accumulating event count.",
        "Use timers for operation duration and gauges for current state. Avoid using a gauge for an ever-increasing event total when a counter is the appropriate instrument."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.metrics;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;

import org.springframework.stereotype.Service;

@Service
public class CatalogMetricsService {

    private final Timer catalogTimer;

    public CatalogMetricsService(MeterRegistry registry) {
        this.catalogTimer = Timer.builder(
                    "codeforge.catalog.lookup")
                .description("Catalog lookup duration")
                .register(registry);
    }

    public String findProduct(String productId) {
        return catalogTimer.record(() -> {
            // Replace with the real lookup operation.
            return "Product-" + productId;
        });
    }
}`
      },
      output:
        "Each execution of findProduct is timed. The timer records the operation's duration and count, making latency trends available through the configured registry.",
      bullets: [
        "Use Timer.record(...) for synchronous operations that return a result.",
        "Use a suitable timer API for asynchronous work so the recorded duration covers the intended operation.",
        "Configure percentiles or histogram buckets when supported and required by the monitoring backend.",
        "Do not assume that every timer automatically exposes every percentile.",
        "A gauge must observe a meaningful live value and should not be backed by an object that can be garbage-collected unexpectedly."
      ],
      code: {
        language: "java",
        code: `import java.util.concurrent.atomic.AtomicInteger;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;

public class QueueMetrics {

    private final AtomicInteger queuedJobs =
            new AtomicInteger();

    public QueueMetrics(MeterRegistry registry) {
        Gauge.builder(
                "codeforge.jobs.queued",
                queuedJobs,
                AtomicInteger::get
            )
            .description("Number of jobs currently queued")
            .register(registry);
    }

    public void jobAdded() {
        queuedJobs.incrementAndGet();
    }

    public void jobRemoved() {
        queuedJobs.updateAndGet(
            count -> Math.max(0, count - 1)
        );
    }
}`
      },
      bullets: [
        "The AtomicInteger provides a thread-safe value for concurrent updates.",
        "The gauge observes the current queued-job count rather than recording every change as a new total.",
        "In real applications, connect the metric to the actual queue state or keep the tracked value synchronized with queue operations.",
        "The example's constructor can be annotated with @Component or @Service, or the object can be created by a Spring configuration class."
      ]
    },
    {
      id: "inspect",
      title: "Inspect Metrics with Actuator",
      paragraphs: [
        "Spring Boot Actuator provides operational endpoints, including a metrics endpoint when the required Actuator dependency is present and the endpoint is exposed. The metrics endpoint can list available metric names and show measurements for a selected registered metric.",
        "The exact metrics available depend on the application's dependencies, configured instrumentation, and active registry. JVM, HTTP server, database pool, and custom metrics are examples of measurements that may be available when their corresponding instrumentation is active.",
        "The metrics endpoint is mainly useful for diagnosis and inspection. It is not a replacement for a time-series monitoring backend that continuously collects measurements, stores history, generates dashboards, and evaluates alerts.",
        "Management endpoints should be exposed and secured deliberately. Avoid making operational data available publicly without an appropriate security policy."
      ],
      code: {
        language: "http",
        code: `GET /actuator/metrics
GET /actuator/metrics/jvm.memory.used
GET /actuator/metrics/http.server.requests
GET /actuator/metrics/codeforge.orders.created`
      },
      output:
        "The first request lists registered metric names. The remaining requests inspect selected metrics if those names are registered. A metric that is not present may be unavailable because its instrumentation or dependency is not configured, or because its name differs in the current application.",
      bullets: [
        "Add the Spring Boot Actuator dependency.",
        "Expose only the management endpoints required by the application.",
        "Inspect registered names rather than assuming every possible metric exists.",
        "Use an appropriate registry or exporter for the monitoring platform.",
        "Protect management endpoints through network restrictions and authentication where appropriate.",
        "Do not assume that inspecting a metric through Actuator provides long-term history."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,metrics`
      },
      bullets: [
        "This configuration exposes the health and metrics endpoints over the web management interface.",
        "Endpoint exposure is not equivalent to endpoint authorization. Apply appropriate security and network controls.",
        "Avoid exposing every management endpoint simply for convenience."
      ]
    },
    {
      id: "jvm-and-http-metrics",
      title: "JVM and HTTP Request Metrics",
      paragraphs: [
        "JVM metrics help operators understand the Java runtime's resource usage. Depending on the active instrumentation, useful measurements include heap and non-heap memory, garbage collection activity, live threads, and class loading.",
        "HTTP server metrics help measure inbound request activity. They can include request counts and duration measurements, often with bounded dimensions such as HTTP method, response status, and URI template.",
        "A high response time does not automatically mean that the controller is slow. It may be caused by a database query, a downstream HTTP call, thread contention, garbage collection, or an overloaded dependency. Combine metrics with logs and distributed traces to identify the cause.",
        "Avoid using raw URL paths containing identifiers as metric tags. A URI template such as /orders/{id} is generally safer for cardinality than recording every individual path such as /orders/101 and /orders/102."
      ],
      bullets: [
        "Use JVM memory metrics to investigate heap pressure and memory trends.",
        "Use garbage collection metrics to understand collection activity and pause behavior where available.",
        "Use thread metrics to investigate thread growth or contention.",
        "Use HTTP request duration and error measurements to assess API reliability.",
        "Use database pool metrics to investigate connection usage and acquisition delays.",
        "Use bounded URI templates and other low-cardinality tags.",
        "Interpret metrics together; one measurement rarely explains an entire production incident."
      ],
      code: {
        language: "text",
        code: `Example diagnostic sequence:

1. HTTP latency increases.
2. Check request rate and HTTP error measurements.
3. Check JVM memory and garbage collection activity.
4. Check database connection pool usage.
5. Inspect logs for failures around the same time.
6. Follow a distributed trace to identify the slow dependency.`
      }
    },
    {
      id: "prometheus-export",
      title: "Export Metrics to Prometheus",
      paragraphs: [
        "Prometheus is a monitoring system that collects time-series measurements by scraping configured endpoints. Spring Boot applications can expose Micrometer measurements in Prometheus format when the appropriate registry integration is present.",
        "For a typical Spring Boot setup, add the Actuator dependency and the Micrometer Prometheus registry dependency compatible with the application's Spring Boot and Micrometer versions. Expose the Prometheus endpoint and configure Prometheus to scrape it.",
        "Prometheus stores collected measurements as time series and supports querying, dashboards through compatible visualization tools, and alert rules. Exact deployment and security settings depend on the environment.",
        "An exposed Prometheus endpoint is not automatically secured merely because it is intended for a monitoring server. Restrict access using network controls and any required authentication or platform-specific protection."
      ],
      code: {
        language: "xml",
        code: `<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
</dependencies>`
      },
      bullets: [
        "Use dependency versions managed by the Spring Boot dependency management where possible.",
        "Add the Prometheus registry to enable the corresponding integration.",
        "Expose the prometheus endpoint explicitly.",
        "Configure Prometheus with the application's reachable scrape address.",
        "Restrict access to the endpoint to the intended monitoring infrastructure.",
        "Verify that the scrape target is healthy and that expected time series are present."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,prometheus`
      },
      output:
        "With a compatible Prometheus registry configured and the endpoint exposed, the application can provide metrics for Prometheus to scrape at /actuator/prometheus.",
      bullets: [
        "Actuator exposes the endpoint; the registry provides the Prometheus integration.",
        "Prometheus must still be configured to scrape the endpoint.",
        "The application should not expose management endpoints to untrusted networks."
      ]
    },
    {
      id: "metric-cardinality",
      title: "Metric Cardinality and Naming Best Practices",
      paragraphs: [
        "Metric cardinality is the number of distinct time series produced by metric names and their tag combinations. Every new combination can increase storage, memory, query cost, and ingestion work in the monitoring system.",
        "Suppose a request counter has a userId tag. If thousands or millions of users generate requests, the metric can create a large number of time series. A bounded tag such as outcome=success or outcome=failure is generally more manageable.",
        "Use consistent metric names and tag keys across instances and services. Choose dimensions that help answer operational questions, and avoid tags whose values change for every individual request.",
        "Metric names should describe what is being measured, while tags should represent bounded dimensions. Follow the conventions expected by the configured registry and monitoring backend."
      ],
      bullets: [
        "Prefer bounded tags such as outcome, method, or operation.",
        "Avoid raw user IDs, email addresses, order IDs, and request IDs as metric tags.",
        "Avoid arbitrary user input as a tag value.",
        "Use consistent names and units.",
        "Use counters for accumulating event counts and timers for operation duration.",
        "Review new custom metrics for cardinality before deploying them to production.",
        "Use logs or traces for individual request identifiers instead of creating a time series per request."
      ],
      code: {
        language: "java",
        code: `// Better: bounded tag values.
registry.counter(
    "codeforge.payment.operations",
    "outcome",
    "success"
).increment();

// Avoid: a new time series for every customer.
registry.counter(
    "codeforge.payment.operations",
    "userId",
    userId
).increment();`
      }
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What are application metrics?",
          answer: "Application metrics are numerical measurements collected over time to understand application behavior, performance, resource usage, and business activity."
        },
        {
          question: "What is Micrometer?",
          answer: "Micrometer is an instrumentation facade that lets applications record metrics through a consistent API and integrate with supported monitoring systems through registry implementations."
        },
        {
          question: "What is Spring Boot Actuator?",
          answer: "Spring Boot Actuator provides operational features and management endpoints, including health and metrics endpoints when configured and exposed."
        },
        {
          question: "What is the difference between a Counter and a Gauge?",
          answer: "A Counter records an accumulating number of events, while a Gauge samples a value that can rise or fall, such as the number of items currently in a queue."
        },
        {
          question: "What is a Timer in Micrometer?",
          answer: "A Timer records the duration and count of operations. It is useful for measuring request latency, service execution time, and external-call duration."
        },
        {
          question: "What is a DistributionSummary?",
          answer: "A DistributionSummary records the distribution of sampled values, such as payload sizes or order amounts. It differs from a Timer, which is designed specifically for measuring duration and operation count."
        },
        {
          question: "What is MeterRegistry?",
          answer: "MeterRegistry manages registered meters such as counters, timers, gauges, and distribution summaries. Registry implementations determine how measurements are exposed or exported."
        },
        {
          question: "How do you create a custom counter in Spring Boot?",
          answer: "Inject MeterRegistry, create a Counter with Counter.builder(...).register(registry), and increment it when the measured event occurs."
        },
        {
          question: "How do you inspect metrics using Actuator?",
          answer: "When the metrics endpoint is exposed, GET /actuator/metrics lists available metric names. GET /actuator/metrics/{metricName} inspects a registered metric."
        },
        {
          question: "Does the Actuator metrics endpoint store history?",
          answer: "The endpoint exposes measurements from registered meters for inspection. Long-term time-series history generally requires a monitoring backend that continuously collects and stores the measurements."
        },
        {
          question: "What is Prometheus?",
          answer: "Prometheus is a monitoring system that collects and stores time-series measurements by scraping configured endpoints. It supports querying and alerting on collected metrics."
        },
        {
          question: "How do you expose Spring Boot metrics to Prometheus?",
          answer: "Add the Actuator dependency and a compatible Micrometer Prometheus registry, expose the Prometheus endpoint, and configure Prometheus to scrape the application's endpoint."
        },
        {
          question: "What is metric cardinality?",
          answer: "Metric cardinality is the number of distinct time series created by metric names and tag combinations. High-cardinality tags can increase monitoring storage, memory usage, and query costs."
        },
        {
          question: "Why should user IDs not be used as metric tags?",
          answer: "User IDs may have many distinct values, creating a large number of time series. Use bounded tags for aggregate measurements and use logs or traces for individual request details."
        },
        {
          question: "What are JVM metrics?",
          answer: "JVM metrics describe Java runtime behavior, such as memory usage, garbage collection, thread counts, and class loading, depending on the instrumentation available."
        },
        {
          question: "What is the difference between metrics, logs, and traces?",
          answer: "Metrics show numerical trends, logs record individual events and details, and distributed traces show how a request moves through services and dependencies."
        },
        {
          question: "How can metrics help troubleshoot a slow API?",
          answer: "Inspect request rate, latency, error measurements, JVM activity, and database pool utilization. Then correlate the time window with logs and distributed traces to identify the slow component."
        },
        {
          question: "Why should metric names and tags be consistent?",
          answer: "Consistent names and tag keys make metrics easier to compare across application instances, query in monitoring tools, and use in dashboards and alert rules."
        },
        {
          question: "Does adding Micrometer automatically send metrics to every monitoring system?",
          answer: "No. Micrometer provides the instrumentation API, but exporting measurements requires a compatible registry or integration and the appropriate configuration."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Application metrics provide numerical visibility into application health, performance, resource consumption, and business activity. Micrometer supplies the instrumentation API, Spring Boot Actuator exposes operational endpoints, and a compatible registry connects measurements to a monitoring backend."
      ],
      bullets: [
        "Counter: accumulating event count.",
        "Timer: operation duration and count.",
        "Gauge: sampled value that can increase or decrease.",
        "DistributionSummary: distribution of sampled values.",
        "MeterRegistry manages registered meters.",
        "Actuator's metrics endpoint allows inspection of registered measurements.",
        "Prometheus can scrape metrics exposed through a compatible registry.",
        "JVM metrics help diagnose memory, garbage collection, and thread behavior.",
        "HTTP metrics help analyze request volume, latency, and errors.",
        "High-cardinality tags can create excessive time series.",
        "Metrics provide trends; logs provide event details; traces show request paths.",
        "Secure management endpoints and avoid exposing operational measurements publicly."
      ]
    }
  ]
};
