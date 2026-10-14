
export const monitoringObservabilityAndAlerting = {
  id: 1409,
  title: "Monitoring, Observability, and Alerting",
  slug: "monitoring-observability-and-alerting",
  topicTitle: "Spring Boot Production Features",
  description:
    "Understand metrics, logs, traces, service-level indicators, dashboards, and actionable production alerts.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "observability",
      title: "What Is Observability?",
      paragraphs: [
        "Observability is the ability to understand a system's internal behavior by examining the information it emits. In production applications, engineers use telemetry to investigate failures, performance problems, unusual traffic, and resource consumption.",
        "The three commonly discussed observability signals are metrics, logs, and distributed traces. They provide different perspectives on the same application and are most useful when they can be correlated.",
        "Metrics reveal numerical trends, such as request latency and error rate. Logs record individual events and diagnostic details. Distributed traces show how a request travels through application components and downstream services, including how much time each operation takes.",
        "For example, suppose a Spring Boot API becomes slow. A dashboard may reveal that response latency has increased. Metrics can help identify whether HTTP requests or database operations are affected. Traces can reveal which operation is consuming time, while logs can provide the associated error or diagnostic context.",
        "Monitoring commonly evaluates known signals and predefined conditions. Observability also helps engineers investigate unexpected behavior by exploring the telemetry available from the system."
      ],
      bullets: [
        "Metrics: numerical measurements collected over time.",
        "Logs: timestamped records of application events, warnings, and failures.",
        "Traces: connected spans that show a request's path through components.",
        "Correlation identifiers: values such as trace IDs that help connect related telemetry.",
        "Dashboards: visual summaries of important operational signals.",
        "Alerts: notifications generated when defined conditions require attention."
      ]
    },
    {
      id: "observability-example",
      title: "How Observability Works in a Spring Boot Application",
      paragraphs: [
        "Consider a Spring Boot application that receives an order request. The request passes through a controller, a service, a repository, and a database. The application may also call a payment service.",
        "Metrics can show that order requests are taking longer than usual. A distributed trace can show whether the delay occurred in the order service, database query, or payment call. Logs can then provide detailed information about a timeout or failed operation.",
        "A trace is typically composed of spans. A span represents an operation and may contain its duration, attributes, status, and relationship to other spans. A trace ID identifies the overall request trace, while span IDs identify individual operations.",
        "Spring Boot integrates with Micrometer Observation for instrumenting application operations. Depending on the libraries and configuration, observations can contribute to metrics, tracing, or both. Exporting traces to a tracing backend requires an appropriate tracing and export configuration.",
        "Observability is not simply collecting as much data as possible. Useful telemetry should help answer operational questions without exposing credentials, personal data, or other sensitive information."
      ],
      bullets: [
        "Metrics answer: How often is the problem happening, and how severe is it?",
        "Logs answer: What event occurred, and what details were recorded?",
        "Traces answer: Where did the request spend time, and which dependency was involved?",
        "Trace IDs and structured log fields make investigation easier.",
        "Sampling may be necessary to control the cost of collecting traces at high traffic volumes."
      ],
      code: {
        language: "text",
        code: `Example request: POST /api/orders

HTTP metric:
  Request count increases
  p95 latency rises from 180 ms to 1,400 ms

Distributed trace:
  OrderController        1,400 ms
    OrderService         1,390 ms
      OrderRepository      70 ms
      PaymentClient      1,250 ms

Application log:
  Payment provider request timed out
  traceId=abc123...`
      },
      output:
        "The example suggests that the payment provider call is responsible for most of the request delay. The trace helps locate the slow operation, and the log provides additional diagnostic context."
    },
    {
      id: "monitoring",
      title: "Monitor Important Application Signals",
      paragraphs: [
        "Production dashboards should show whether the application is serving requests successfully, responding quickly, and operating within its resource limits. The most useful measurements depend on the service's purpose and its expected workload.",
        "A common starting point is the four golden signals: latency, traffic, errors, and saturation. These help teams understand user-facing performance and resource pressure.",
        "Latency measures request duration. Traffic measures demand. Errors measure failed requests or operations. Saturation indicates how close a resource is to its practical limit, such as CPU, memory, database connections, or worker capacity.",
        "Averages alone can hide problems affecting a smaller group of users. Percentiles such as p95 and p99 show the upper end of the latency distribution and can reveal slow requests that an average does not expose.",
        "A background worker needs additional measurements, such as queue depth, oldest-message age, processing duration, retry count, and failed-job count. A database-backed API may need connection-pool utilization and query latency."
      ],
      bullets: [
        "Request rate: the number of incoming requests over time.",
        "Error rate: the proportion or number of requests that fail.",
        "Latency: request duration, including p50, p95, and p99 percentiles.",
        "Saturation: pressure on CPU, memory, threads, connections, and queues.",
        "Dependency health: behavior of databases, message brokers, and downstream services.",
        "Business signals: successful orders, payment failures, or completed jobs.",
        "Availability: whether the service is able to perform its intended function."
      ]
    },
    {
      id: "golden-signals",
      title: "The Four Golden Signals",
      paragraphs: [
        "The four golden signals provide a practical starting point for designing a production dashboard. They are useful because they focus on user-facing symptoms and resource pressure rather than only reporting that a process is running.",
        "Latency should distinguish successful requests from failed requests where appropriate, because fast failures can make overall latency appear healthy. Traffic should be interpreted against normal demand and expected capacity. Error rates should use a clearly defined denominator.",
        "Saturation requires resource-specific measurements. CPU utilization, memory pressure, thread-pool queues, connection-pool usage, and message backlog each describe different bottlenecks. A single generic saturation number is rarely sufficient.",
        "These signals work best when paired with service objectives. For example, a service may define a latency target for most requests and a maximum acceptable percentage of failed requests over a rolling period."
      ],
      bullets: [
        "Latency: Are users waiting too long?",
        "Traffic: How much work is arriving?",
        "Errors: How much of that work is failing?",
        "Saturation: Which resource is approaching its effective capacity?",
        "Compare current values with historical baselines and expected traffic patterns.",
        "Avoid treating every brief spike as an incident without considering duration and impact."
      ],
      code: {
        language: "text",
        code: `API production dashboard

Traffic:
  Requests per second

Errors:
  Failed requests / total requests

Latency:
  p50, p95, and p99 request duration

Saturation:
  CPU and memory utilization
  Database connection-pool usage
  Executor queue depth

Dependencies:
  Database latency
  Downstream HTTP client failures`
      }
    },
    {
      id: "metrics-export",
      title: "Export Metrics to a Monitoring System",
      paragraphs: [
        "Spring Boot Actuator provides operational endpoints, and Micrometer supplies a common instrumentation API for application metrics. Registry implementations connect Micrometer to monitoring systems such as Prometheus.",
        "For a Prometheus-based setup, the application generally needs Spring Boot Actuator and a compatible Micrometer Prometheus registry dependency. The Prometheus scrape endpoint must also be exposed through the application's endpoint configuration.",
        "Prometheus periodically scrapes the application's metrics endpoint and stores the collected time series. A dashboard tool such as Grafana can query Prometheus and display trends. Alert rules can evaluate those time series and send notifications through a configured alerting pipeline.",
        "The following YAML exposes health, metrics, and Prometheus endpoints over the web. Exposure is not the same as authorization: network restrictions and security configuration must ensure that only intended users and monitoring infrastructure can access operational data.",
        "The exact configuration and available metrics depend on the Spring Boot version, dependencies, and installed instrumentation. Avoid exposing every Actuator endpoint merely for convenience."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      show-details: never`
      },
      bullets: [
        "Add the Spring Boot Actuator dependency.",
        "Add the Micrometer Prometheus registry compatible with the project's Spring Boot version.",
        "Expose only the endpoints required by the monitoring system.",
        "Configure the monitoring server to scrape the application's Prometheus endpoint.",
        "Restrict endpoint access to trusted infrastructure.",
        "Use dashboards to observe trends instead of relying only on one-time health checks."
      ]
    },
    {
      id: "prometheus-dependency",
      title: "Add Actuator and Prometheus Dependencies",
      paragraphs: [
        "Actuator and the Prometheus registry are separate dependencies. Actuator supplies operational endpoints and application-management features, while the registry allows Micrometer metrics to be exported in a Prometheus-compatible format.",
        "In a Maven-based Spring Boot project, use the Actuator starter and the Prometheus registry artifact. Spring Boot dependency management should normally manage compatible dependency versions when the project uses the Spring Boot parent or BOM.",
        "Do not copy a dependency version from an unrelated Spring Boot release. Verify that the registry and Actuator versions match the application's dependency-management setup."
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
        "Restart the application after adding the dependencies.",
        "Check that the Prometheus endpoint is available at /actuator/prometheus when web exposure is configured.",
        "Check /actuator/metrics to inspect available metric names when that endpoint is exposed.",
        "A missing endpoint may indicate a missing dependency, an exposure setting, or a security rule.",
        "Keep production endpoint access appropriately restricted."
      ]
    },
    {
      id: "custom-metrics",
      title: "Create Custom Application Metrics",
      paragraphs: [
        "Spring Boot and Micrometer provide many built-in measurements, including JVM statistics and HTTP server metrics when the relevant instrumentation is enabled. Custom metrics are useful when teams need to measure important business operations that built-in instrumentation cannot describe.",
        "For example, an order service may count accepted orders or time the duration of an operation. A counter measures a cumulative number of events, while a timer records durations and the number of timed operations.",
        "Micrometer meters can use tags to distinguish meaningful dimensions such as operation type or result. Tags should have a bounded set of possible values. User IDs, request IDs, email addresses, and arbitrary URLs can create excessive time series and should not be used as metric tags.",
        "The following example uses a counter for successful order submissions. Registering the counter once and incrementing it when the event occurs makes the metric available to supported registries."
      ],
      code: {
        language: "java",
        code: `import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class OrderMetrics {

    private final Counter successfulOrders;

    public OrderMetrics(MeterRegistry registry) {
        this.successfulOrders = Counter.builder("orders.created")
                .description("Number of successfully created orders")
                .tag("result", "success")
                .register(registry);
    }

    public void recordSuccessfulOrder() {
        successfulOrders.increment();
    }
}`
      },
      bullets: [
        "Use counters for event totals.",
        "Use timers for operation duration and count.",
        "Use gauges for values that can rise and fall, such as current queue size.",
        "Choose metric names and units consistently.",
        "Use a small, bounded set of tags.",
        "Increment a success counter only when the business operation actually succeeds.",
        "Do not put sensitive or high-cardinality identifiers into metric labels."
      ]
    },
    {
      id: "logs-and-correlation",
      title: "Connect Logs with Metrics and Traces",
      paragraphs: [
        "Metrics often reveal that a problem exists, but they rarely contain every detail needed to explain an individual failure. Logs provide event-level context, while traces show how operations relate across service boundaries.",
        "Structured logging records information in consistent fields, making it easier for a log platform to filter by service, environment, severity, or trace ID. A trace ID can connect logs to the distributed trace for the same request when tracing context is correctly propagated.",
        "Spring Boot applications commonly use SLF4J with a logging implementation such as Logback. Micrometer Tracing and a configured tracing bridge or exporter can provide trace context, depending on the application's dependencies and configuration.",
        "When adding diagnostic fields, avoid recording passwords, authorization headers, access tokens, database credentials, or unnecessary personal data. Production logs should provide useful context without becoming a second source of sensitive information."
      ],
      bullets: [
        "Use consistent structured fields such as service, environment, and trace ID.",
        "Include relevant exception information when it helps diagnose a failure.",
        "Propagate tracing context across supported HTTP and messaging integrations.",
        "Use trace IDs to move from a log entry to the corresponding distributed trace.",
        "Keep log volume, retention, and access controls appropriate for production.",
        "Never log complete authentication tokens or secrets."
      ],
      code: {
        language: "java",
        code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private static final Logger log =
            LoggerFactory.getLogger(PaymentService.class);

    public void processPayment(String orderReference) {
        log.info("Starting payment processing for orderReference={}",
                orderReference);

        // Call the payment provider and handle its result.
    }
}`
      },
      output:
        "The logger records a structured-style message with a stable field name. If tracing context is configured and included in the logging setup, the resulting log entry may also contain a trace ID for correlation."
    },
    {
      id: "distributed-tracing",
      title: "Understand Distributed Tracing",
      paragraphs: [
        "Distributed tracing follows a logical request across multiple operations, which may run in different services or processes. Each operation is represented by a span, and related spans are connected into a trace.",
        "A trace can reveal where latency accumulates across an API gateway, Spring Boot service, database operation, and downstream HTTP call. This is especially useful when the overall request is slow but no individual component appears obviously unhealthy.",
        "Trace context propagation allows downstream operations to remain associated with the original request. Supported instrumentation can propagate context automatically for common integrations, while custom asynchronous execution or unsupported clients may require additional configuration.",
        "Tracing data can be sampled to control storage and processing costs. Sampling decisions affect which traces are retained, so the absence of a trace does not necessarily mean that a request never occurred.",
        "Tracing should complement metrics and logs rather than replace them. Metrics efficiently describe aggregate behavior, while traces provide detailed examples of individual request paths."
      ],
      bullets: [
        "Trace: the overall journey of a request.",
        "Span: an individual operation within that journey.",
        "Trace ID: identifies the trace.",
        "Span ID: identifies a particular span.",
        "Parent-child relationships describe how operations are connected.",
        "Span attributes provide contextual details without exposing sensitive information.",
        "Sampling balances diagnostic value against telemetry cost."
      ]
    },
    {
      id: "service-level-indicators",
      title: "Service-Level Indicators and Objectives",
      paragraphs: [
        "A service-level indicator, or SLI, is a measurement of an aspect of service performance that matters to users. Examples include the proportion of successful requests, request latency, and successful background-job completion.",
        "A service-level objective, or SLO, is a target for an SLI over a defined time window. For example, a team might target at least 99.9 percent successful eligible requests over a rolling 30-day period. This is an illustrative target, not a universal requirement.",
        "An error budget represents the amount of unreliability allowed by an SLO. For an availability objective, failures consume the error budget. Teams can use error-budget consumption to make informed decisions about reliability work and risky releases.",
        "SLIs should be defined carefully. Specify which requests count, which failures are included, the measurement window, and the data source. Otherwise, dashboards and alerts may report a number that does not match actual user experience.",
        "A useful SLO is measurable and connected to a user outcome. A process being alive is not necessarily evidence that users can successfully complete their tasks."
      ],
      bullets: [
        "SLI: the measured service outcome.",
        "SLO: the target for that measurement over a specified period.",
        "SLA: an agreement with defined commitments and possible consequences.",
        "Error budget: the permitted unreliability under an SLO.",
        "Use success ratios and latency distributions that reflect real user experience.",
        "Document exclusions and denominators to prevent misleading availability calculations."
      ],
      code: {
        language: "text",
        code: `Illustrative availability SLO

Measurement window: 30 days
Eligible requests: 1,000,000
Successful requests: 999,000

Availability:
  999,000 / 1,000,000 = 99.9%

If the target is 99.9%:
  The measured availability meets the target.

Important:
  Define which requests are eligible and how failures
  are counted before using this calculation in production.`
      }
    },
    {
      id: "alerts",
      title: "Design Useful Alerts",
      paragraphs: [
        "An alert should identify a condition that needs attention, not merely report every unusual measurement. Alerts based on sustained symptoms and meaningful service impact are often more actionable than alerts triggered by a single short spike.",
        "For example, a sustained increase in failed requests, prolonged high latency, repeated readiness failures, or rapid error-budget consumption may justify an alert. The threshold should be based on the service's expected behavior and reliability objectives.",
        "A useful alert includes the affected service, environment, severity, condition, relevant time window, dashboard link, and operational runbook. The responder should understand why the alert fired and what investigation to begin.",
        "Alert rules require an evaluation period and, where appropriate, a pending duration. These reduce noise from transient spikes, although excessively long windows can delay detection of genuine incidents.",
        "Use different notification routes for urgent user-impacting incidents and lower-priority operational warnings. Review alerts after incidents to identify both false positives and important failures that were not detected."
      ],
      bullets: [
        "Define thresholds based on service expectations and SLOs.",
        "Use evaluation windows to reduce noise from brief fluctuations.",
        "Include service, environment, severity, and meaningful condition labels.",
        "Link alerts to dashboards, logs, traces, and operational runbooks.",
        "Assign ownership and escalation rules.",
        "Test notification delivery rather than assuming configuration is correct.",
        "Review false positives, alert fatigue, and missed incidents."
      ]
    },
    {
      id: "prometheus-alert-example",
      title: "Example: Define a Prometheus Alert",
      paragraphs: [
        "Prometheus alerting rules evaluate queries against collected time-series data. A rule can activate when a condition remains true for a configured duration. Prometheus can evaluate the rule, while Alertmanager commonly handles grouping, routing, deduplication, and notification delivery.",
        "The following example illustrates an alert for a sustained HTTP server error ratio. The exact metric names and labels depend on the Spring Boot version, Micrometer instrumentation, and application configuration.",
        "This example assumes the application exposes a request counter with a status label and that the monitoring system collects it. Confirm the actual metric names in your environment before deploying the rule.",
        "The ratio compares server-error responses with all observed responses. Production queries may need to filter out particular endpoints, distinguish traffic classes, or account for how status codes are represented by the installed instrumentation."
      ],
      code: {
        language: "yaml",
        code: `groups:
  - name: spring-boot-alerts
    rules:
      - alert: HighHttpServerErrorRate
        expr: |
          (
            sum(rate(http_server_requests_seconds_count{
              status=~"5.."
            }[5m]))
            /
            clamp_min(
              sum(rate(http_server_requests_seconds_count[5m])),
              0.001
            )
          ) > 0.05
        for: 10m
        labels:
          severity: warning
          service: orders-api
        annotations:
          summary: "High HTTP server error rate"
          description: "More than 5% of observed HTTP requests are failing with server errors."
          runbook: "https://example.com/runbooks/http-errors"`
      },
      output:
        "The alert becomes active when the evaluated server-error ratio remains above 5 percent for 10 minutes. The example runbook URL is a placeholder and must be replaced with your actual operational documentation."
    },
    {
      id: "dashboard-design",
      title: "Design an Effective Production Dashboard",
      paragraphs: [
        "A production dashboard should help an engineer quickly determine whether a service is healthy, what has changed, and where to investigate. Put the most important user-facing signals near the top, followed by resource and dependency details.",
        "A dashboard is more useful when it includes meaningful time ranges, units, service and environment filters, and links to related telemetry. Consistent dashboard conventions make it easier for responders to move between services during an incident.",
        "Avoid filling dashboards with every metric available. Start with a small set of high-value signals and add detailed panels for common investigations. A large number of charts is not a substitute for clear operational questions.",
        "Dashboards and alerts serve different purposes. A dashboard supports exploration and diagnosis; an alert notifies someone when a condition requires attention."
      ],
      bullets: [
        "Show request rate, error rate, and latency percentiles.",
        "Include CPU, memory, thread, connection-pool, and queue metrics where relevant.",
        "Display dependency latency and failures.",
        "Use consistent units and clear panel names.",
        "Provide service and environment filters.",
        "Link panels to logs, traces, deployment information, and runbooks.",
        "Review dashboards after incidents to identify missing diagnostic signals."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Monitoring and Observability Mistakes",
      paragraphs: [
        "Collecting telemetry without a clear operational purpose can increase cost while making incidents harder to investigate. Start by identifying the questions the service team needs to answer and then select appropriate metrics, logs, traces, and dashboards.",
        "One common mistake is relying only on averages. A service may have acceptable average latency while a meaningful portion of users experience very slow requests. Percentiles and distributions provide a more complete picture.",
        "Another mistake is using metrics with unbounded tags. A unique request ID or user ID can create a separate time series for each value, leading to excessive memory usage and monitoring costs.",
        "Alerts that fire on every short-lived spike can cause alert fatigue. Conversely, thresholds that are too high or evaluation windows that are too long may delay detection. Validate alert behavior against realistic traffic and incident scenarios.",
        "Exposing operational endpoints publicly, recording secrets in logs, or retaining excessive trace data can introduce security, privacy, and cost risks. Observability must be designed with access control and data governance in mind."
      ],
      bullets: [
        "Monitoring only CPU while ignoring user-facing latency and failures.",
        "Using average latency without checking tail percentiles.",
        "Creating unbounded metric labels.",
        "Exposing Actuator endpoints without appropriate access restrictions.",
        "Logging tokens, passwords, or confidential request bodies.",
        "Creating alerts without ownership, runbooks, or notification testing.",
        "Assuming that the absence of an alert proves the service is healthy.",
        "Collecting traces without configuring suitable sampling and retention."
      ]
    },
    {
      id: "production-best-practices",
      title: "Production Monitoring Best Practices",
      paragraphs: [
        "Build observability around the service's user-facing behavior. Define the most important SLIs, choose realistic SLOs, and make dashboards and alerts reflect those objectives.",
        "Keep telemetry useful and affordable. Set retention policies, control label cardinality, sample traces where appropriate, and select log levels based on operational needs. Review the cost and diagnostic value of each signal.",
        "Protect the monitoring infrastructure and application endpoints. Restrict access, separate production credentials from development credentials, and avoid including sensitive information in telemetry.",
        "Validate the complete monitoring path. Confirm that metrics are collected, dashboards show real data, alert rules evaluate correctly, notifications reach the right responders, and runbooks are usable.",
        "After an incident, improve the system using what the telemetry revealed. This may mean adding an SLI, refining an alert, improving trace propagation, or documenting a recurring failure mode."
      ],
      bullets: [
        "Define SLIs and SLOs before choosing alert thresholds.",
        "Prioritize user-impacting symptoms over isolated infrastructure measurements.",
        "Use metrics, logs, and traces together.",
        "Keep metric labels bounded and telemetry free of unnecessary sensitive data.",
        "Restrict Actuator and monitoring endpoints.",
        "Test alerts and notification routes regularly.",
        "Maintain runbooks with clear diagnostic steps.",
        "Review telemetry after incidents and remove noisy or redundant alerts."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What are the three common observability signals?",
          answer: "Metrics, logs, and distributed traces. Metrics show numerical trends, logs describe events, and traces show the path and timing of operations across components."
        },
        {
          question: "What is the difference between monitoring and observability?",
          answer: "Monitoring evaluates known signals and predefined conditions. Observability uses emitted telemetry to investigate and understand system behavior, including problems that were not anticipated in advance."
        },
        {
          question: "What is p95 latency?",
          answer: "The 95th percentile latency is the value at or below which approximately 95 percent of measured requests complete. It helps reveal slow requests that averages may hide."
        },
        {
          question: "What makes a good production alert?",
          answer: "A good alert identifies meaningful user or system impact, has a clear severity and owner, provides diagnostic context, and tells the responder where to investigate or what action may be needed."
        },
        {
          question: "How does Prometheus obtain Spring Boot metrics?",
          answer: "With a compatible Micrometer Prometheus registry and the required endpoint configuration, Prometheus periodically scrapes the application's metrics endpoint and stores the resulting time series."
        },
        {
          question: "What is Micrometer?",
          answer: "Micrometer is an instrumentation facade for collecting application metrics. It provides a common API for meters such as counters, timers, and gauges and supports integrations with monitoring systems through registry implementations."
        },
        {
          question: "What is the difference between a counter, gauge, and timer?",
          answer: "A counter records a cumulative event total, a gauge represents a value that can rise or fall, and a timer records operation durations and the number of timed events."
        },
        {
          question: "What are the four golden signals?",
          answer: "Latency, traffic, errors, and saturation. Together they help engineers understand request performance, demand, failures, and resource pressure."
        },
        {
          question: "Why is p99 latency useful?",
          answer: "It shows the upper tail of request latency. A service may have a good average while a small but important portion of requests take much longer."
        },
        {
          question: "What is a distributed trace?",
          answer: "A distributed trace represents the journey of a request across operations or services. It contains related spans that show operation timing and relationships, helping engineers locate bottlenecks."
        },
        {
          question: "What is the difference between a trace and a span?",
          answer: "A trace represents the overall request journey, while a span represents an individual operation within that journey. Multiple related spans can form one trace."
        },
        {
          question: "What is an SLI?",
          answer: "A service-level indicator is a measurement of service performance that matters to users, such as the percentage of successful requests or the proportion completed within a latency target."
        },
        {
          question: "What is an SLO?",
          answer: "A service-level objective is a defined target for an SLI over a specified period, such as a target success rate over a rolling 30-day window."
        },
        {
          question: "What is an error budget?",
          answer: "An error budget is the permitted unreliability under a service-level objective. It helps teams balance reliability improvements against the risks of releasing changes."
        },
        {
          question: "What is the role of Grafana?",
          answer: "Grafana is commonly used to query data sources such as Prometheus and display dashboards and visualizations. It can also participate in alerting workflows depending on the configured architecture."
        },
        {
          question: "What is Alertmanager used for?",
          answer: "In a Prometheus-based setup, Alertmanager commonly groups, deduplicates, routes, and manages notifications for alerts generated by Prometheus rules."
        },
        {
          question: "Why should metric labels have bounded values?",
          answer: "Unbounded labels create excessive unique time series, increasing storage and memory consumption and potentially degrading monitoring performance. Use stable, low-cardinality dimensions instead."
        },
        {
          question: "How do logs and traces work together?",
          answer: "A trace ID can connect a log entry to the distributed trace for the same request. The trace reveals the request path and timing, while logs provide event details and diagnostic information."
        },
        {
          question: "Does a healthy Actuator health endpoint guarantee that users can complete their operations?",
          answer: "No. Health checks report configured health information, but they may not represent every business operation or performance issue. User-facing metrics, synthetic checks, and suitable SLOs provide additional evidence."
        },
        {
          question: "How would you investigate a sudden increase in API latency?",
          answer: "Check the latency percentiles, traffic, error rate, and saturation dashboard first. Compare the affected period with recent deployments, inspect traces to identify slow operations, review correlated logs, and check database and downstream-service behavior."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Observability helps engineers understand system behavior using metrics, logs, and distributed traces. Spring Boot Actuator exposes operational endpoints, Micrometer instruments application behavior, and monitoring systems collect and analyze telemetry.",
        "Production monitoring should prioritize latency, traffic, errors, saturation, dependency behavior, and business outcomes. SLIs measure service performance, SLOs define targets, and error budgets help teams manage reliability.",
        "Useful alerts are actionable, tied to meaningful symptoms, and supported by dashboards, runbooks, and clear ownership. Secure endpoint access, bounded metric labels, and careful handling of sensitive telemetry are essential."
      ],
      bullets: [
        "Metrics = numerical trends.",
        "Logs = event details.",
        "Traces = request path and timing.",
        "Actuator = Spring Boot operational endpoints.",
        "Micrometer = instrumentation and metrics abstraction.",
        "Prometheus = time-series collection and querying.",
        "Grafana = dashboards and visualizations.",
        "Alertmanager = Prometheus alert notification routing and grouping.",
        "SLI = measured service outcome.",
        "SLO = target for an SLI.",
        "Error budget = permitted unreliability under an SLO.",
        "Good alerts = meaningful symptoms, clear ownership, and actionable context."
      ]
    }
  ]
};
