
export const springBootActuatorFundamentals = {
  id: 1401,
  title: "Spring Boot Actuator Fundamentals",
  slug: "spring-boot-actuator-fundamentals",
  topicTitle: "Spring Boot Production Features",
  description:
    "Understand Spring Boot Actuator, production management endpoints, application health, metrics, and secure endpoint exposure.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "definition",
      title: "What Is Spring Boot Actuator?",
      paragraphs: [
        "Spring Boot Actuator provides production-oriented management and monitoring capabilities for a running Spring Boot application. It exposes operational information such as application health, metrics, environment information, bean information, request mappings, and other management data through configurable endpoints.",
        "During local development, developers often inspect console logs to understand whether an application is working correctly. In production, manually reading logs is not enough. Operations teams need standard endpoints that can answer questions such as: Is the application alive? Is it ready to receive traffic? How much memory is being used? How many HTTP requests are arriving? What is the response time? Are failures increasing?",
        "Actuator integrates with the Spring Boot application context and Micrometer's metrics infrastructure. This allows Spring Boot applications to expose operational information in a standardized way.",
        "Actuator itself does not magically create a complete monitoring platform. It provides management endpoints and application measurements. External systems such as Prometheus, Grafana, Kubernetes, cloud monitoring platforms, or other observability systems can consume this information."
      ],
      bullets: [
        "Actuator is mainly used for production monitoring and management.",
        "The commonly used health endpoint is GET /actuator/health.",
        "The metrics endpoint exposes metrics registered in the application's metrics infrastructure.",
        "Actuator endpoints can be enabled, disabled, exposed, and secured independently.",
        "Actuator can integrate with external monitoring and observability systems.",
        "Actuator does not replace application logs.",
        "Actuator does not replace distributed tracing.",
        "Actuator does not replace a complete alerting and dashboarding platform."
      ]
    },
    {
      id: "actuator-problem",
      title: "Why Do We Need Actuator?",
      paragraphs: [
        "Consider a Spring Boot application deployed on a production server. The application may be running as a Java process, but that alone does not tell us whether it is actually capable of serving requests.",
        "A process can be alive while the application is unhealthy. For example, the application may have lost its database connection, exhausted an important resource, failed to initialize a dependency, or become unable to serve requests correctly.",
        "Actuator provides standardized management information that can be consumed by humans, load balancers, container platforms, and monitoring systems."
      ],
      code: {
        language: "text",
        code: `Without Actuator:

Application
     |
     +---- Logs
     |
     +---- Manual inspection
     |
     +---- Difficult operational checks


With Actuator:

Application
     |
     +---- /actuator/health
     |
     +---- /actuator/metrics
     |
     +---- /actuator/info
     |
     +---- Other management endpoints
     |
     +---- External monitoring system`
      },
      bullets: [
        "A running JVM process does not necessarily mean the application is healthy.",
        "Health endpoints provide machine-readable health information.",
        "Metrics help identify resource usage and application behavior.",
        "Management endpoints make operational checks repeatable.",
        "Load balancers and orchestration platforms can use health information."
      ]
    },
    {
      id: "dependency",
      title: "Add the Actuator Dependency",
      paragraphs: [
        "For a Maven-based Spring Boot application, add the spring-boot-starter-actuator dependency. Spring Boot's dependency management normally takes care of compatible versions of Actuator and its underlying dependencies.",
        "After adding the dependency and restarting the application, Actuator becomes part of the Spring application context and its configured endpoints can become available."
      ],
      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>`
      },
      bullets: [
        "Use the Actuator starter that matches your Spring Boot project.",
        "Normally you do not need to specify the Actuator version separately when using Spring Boot dependency management.",
        "Restart the application after adding the dependency.",
        "Check startup logs if an expected endpoint is not available."
      ]
    },
    {
      id: "endpoint-concept",
      title: "What Is an Actuator Endpoint?",
      paragraphs: [
        "An Actuator endpoint is an entry point through which Spring Boot exposes operational information or management functionality.",
        "Endpoints are designed for operational purposes rather than normal business functionality. For example, /actuator/health answers whether the application is healthy, while /actuator/metrics provides access to registered measurements.",
        "The endpoint availability depends on several factors. An endpoint may be implemented by Actuator but still not be available over HTTP because it is disabled, not exposed, or protected by security."
      ],
      code: {
        language: "text",
        code: `Client / Monitoring System
          |
          | HTTP request
          v
GET /actuator/health
          |
          v
Spring Boot Actuator
          |
          +---- Health contributors
          |
          +---- Application state
          |
          v
      Health response`
      },
      bullets: [
        "Endpoint implementation and endpoint exposure are different concepts.",
        "An endpoint can exist without being exposed through HTTP.",
        "Security can prevent an exposed endpoint from being accessed.",
        "The endpoint base path is normally /actuator.",
        "Individual endpoint paths are usually under that base path."
      ]
    },
    {
      id: "configuration",
      title: "Configure and Inspect Actuator",
      paragraphs: [
        "Spring Boot allows Actuator web exposure to be configured using application properties or YAML. A common configuration is to expose health, info, and metrics.",
        "Exposing an endpoint makes it available through the configured management web transport. It does not automatically mean that every user should be allowed to access it.",
        "The health endpoint is commonly treated differently from sensitive diagnostic endpoints because monitoring systems frequently need access to health information."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics

  endpoint:
    health:
      show-details: never`
      },
      bullets: [
        "GET /actuator/health returns the application's health status.",
        "GET /actuator/info returns configured application information.",
        "GET /actuator/metrics lists available metric names.",
        "GET /actuator/metrics/jvm.memory.used can inspect a specific registered metric when available.",
        "An endpoint can be unavailable if it is disabled.",
        "An endpoint can be unavailable if it is not exposed through the requested transport.",
        "Security rules can also prevent access."
      ]
    },
    {
      id: "endpoint-flow",
      title: "How an Actuator Request Works",
      paragraphs: [
        "When a client requests an Actuator endpoint, the request enters the Spring Boot web application just like other HTTP requests. Actuator provides the endpoint implementation and produces the management response.",
        "For a health request, Actuator evaluates the configured health contributors and combines their statuses according to the application's health configuration."
      ],
      code: {
        language: "text",
        code: `Client
  |
  | GET /actuator/health
  v
Embedded Tomcat
  |
  v
Spring Boot Web Layer
  |
  v
Actuator Endpoint
  |
  v
Health Contributors
  |
  +---- Application health
  +---- Database health
  +---- Other configured contributors
  |
  v
Health Result
  |
  v
HTTP Response
  |
  v
Client`
      },
      bullets: [
        "The request is handled by the application's management infrastructure.",
        "The health endpoint gathers information from health contributors.",
        "The final health status is returned as a management response.",
        "Authentication and authorization can be applied before the endpoint result is returned."
      ]
    },
    {
      id: "common-endpoints",
      title: "Important Actuator Endpoints",
      paragraphs: [
        "Spring Boot Actuator provides many endpoints, but applications should expose only those that are useful for their operational requirements.",
        "The exact availability of an endpoint depends on the Spring Boot version, dependencies, endpoint configuration, exposure configuration, and security rules."
      ],
      code: {
        language: "text",
        code: `/actuator/health
    Application health information

/actuator/info
    Application information

/actuator/metrics
    Available metric names

/actuator/metrics/{metric.name}
    Details for a specific metric

/actuator/beans
    Spring beans information

/actuator/mappings
    Request mappings

/actuator/env
    Environment and configuration information

/actuator/loggers
    Logger configuration and levels

/actuator/threaddump
    Thread information

/actuator/heapdump
    Heap dump endpoint when available`
      },
      bullets: [
        "Health is commonly required by infrastructure.",
        "Metrics are useful for monitoring and alerting.",
        "Info can expose controlled application metadata.",
        "Mappings can help diagnose request routing.",
        "Environment and configuration endpoints require careful protection.",
        "Heap dumps and thread dumps can contain sensitive operational information.",
        "Do not expose every endpoint simply because Actuator provides it."
      ]
    },
    {
      id: "health",
      title: "Actuator Health Endpoint",
      paragraphs: [
        "The health endpoint is one of the most important Actuator endpoints. It provides an overall health status that can be consumed by developers, monitoring systems, load balancers, and container orchestration platforms.",
        "A simple health response can indicate whether the application is UP. Depending on configuration and available health contributors, the response can also contain additional component information.",
        "Health information should be designed according to the purpose of the check. A liveness check answers whether the application process should be considered alive. A readiness check answers whether the application is ready to receive traffic."
      ],
      code: {
        language: "text",
        code: `GET /actuator/health

Example response:

{
  "status": "UP"
}`
      },
      bullets: [
        "UP generally means the health system considers the application healthy.",
        "DOWN indicates that one or more health conditions have failed according to the configured health model.",
        "Health details can be restricted.",
        "Readiness and liveness are important in containerized deployments.",
        "Health endpoints should be lightweight enough for frequent infrastructure checks."
      ]
    },
    {
      id: "health-details",
      title: "Health Details",
      paragraphs: [
        "Health details can contain useful information such as database connectivity or other health contributor information. However, detailed health responses can reveal internal infrastructure details.",
        "The management.endpoint.health.show-details property controls how much health detail is returned. Authorization should still be considered because hiding details does not itself secure the endpoint."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoint:
    health:
      show-details: never`
      },
      bullets: [
        "never keeps health details hidden.",
        "when-authorized can expose details only to authorized users when security is configured appropriately.",
        "always exposes health details and therefore requires careful security consideration.",
        "The setting controls response detail, not network security."
      ]
    },
    {
      id: "metrics",
      title: "Actuator Metrics",
      paragraphs: [
        "Metrics are numerical measurements that describe application behavior or resource usage. Spring Boot uses Micrometer as its metrics instrumentation layer.",
        "Actuator exposes metrics through the /actuator/metrics endpoint when the endpoint is available and exposed.",
        "Typical applications can have JVM metrics, memory metrics, garbage collection metrics, HTTP server metrics, CPU-related measurements, and other measurements depending on the application's dependencies and configuration."
      ],
      code: {
        language: "text",
        code: `GET /actuator/metrics

Possible metric names include:

jvm.memory.used
jvm.memory.committed
jvm.gc.pause
process.cpu.usage
system.cpu.usage

HTTP-related metrics may also be available depending
on the application and Spring Boot version.`
      },
      bullets: [
        "Metrics are measurements, not log messages.",
        "Micrometer provides the instrumentation abstraction.",
        "Actuator exposes metrics through management endpoints.",
        "The exact metric names depend on the application and libraries.",
        "Metrics can be exported to external monitoring systems."
      ]
    },
    {
      id: "specific-metric",
      title: "Inspect a Specific Metric",
      paragraphs: [
        "The metrics endpoint can be used with a specific metric name to inspect its measurements. This is useful when troubleshooting memory usage, CPU behavior, request processing, or other operational concerns.",
        "Metric output can include measurements and tags. Tags provide dimensions that allow a metric to be analyzed by different characteristics."
      ],
      code: {
        language: "text",
        code: `GET /actuator/metrics/jvm.memory.used

Example structure:

{
  "name": "jvm.memory.used",
  "measurements": [
    {
      "statistic": "VALUE",
      "value": 12345678
    }
  ],
  "availableTags": [
    {
      "tag": "area",
      "values": ["heap", "nonheap"]
    }
  ]
}`
      },
      bullets: [
        "Metric names identify what is being measured.",
        "Measurements contain numerical values.",
        "Tags provide dimensions for a metric.",
        "Available tags depend on the metric.",
        "Avoid creating uncontrolled high-cardinality tags in custom metrics."
      ]
    },
    {
      id: "custom-metric-preview",
      title: "Custom Metrics Preview",
      paragraphs: [
        "Applications can create custom metrics using Micrometer. This is useful when business or application-specific behavior needs to be monitored.",
        "For example, a payment service might count successful payments, failed payments, or payment processing duration."
      ],
      code: {
        language: "java",
        code: `import io.micrometer.core.instrument.Counter;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final Counter paymentCounter;

    public PaymentService(io.micrometer.core.instrument.MeterRegistry registry) {
        this.paymentCounter = Counter.builder("payments.completed")
                .description("Number of completed payments")
                .register(registry);
    }

    public void completePayment() {
        // Payment processing
        paymentCounter.increment();
    }
}`
      },
      bullets: [
        "Counters are useful for values that increase over time.",
        "Timers are useful for measuring durations.",
        "Gauges are useful for values that can increase or decrease.",
        "Custom metrics should have meaningful names.",
        "Metric tags should be controlled to avoid excessive cardinality."
      ]
    },
    {
      id: "info-endpoint",
      title: "The Info Endpoint",
      paragraphs: [
        "The info endpoint can expose controlled application information such as application version, build information, or selected metadata.",
        "It should not be used as a place to expose secrets, credentials, internal tokens, or sensitive configuration."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics

info:
  app:
    name: CodeForge
    version: 1.0.0
    description: Coding learning platform`
      },
      bullets: [
        "Use info for safe application metadata.",
        "Do not expose passwords or API keys.",
        "Do not assume that hiding an endpoint is a substitute for authorization.",
        "Keep operational metadata useful but minimal."
      ]
    },
    {
      id: "management-port",
      title: "Separate Management Port",
      paragraphs: [
        "Spring Boot can expose Actuator management endpoints on a separate port from the application's main HTTP port. This can make network-level access control easier in some deployment architectures.",
        "A separate management port does not automatically make the endpoints secure. Authentication, authorization, firewall rules, network policies, and infrastructure configuration may still be required."
      ],
      code: {
        language: "yaml",
        code: `server:
  port: 8080

management:
  server:
    port: 8081

  endpoints:
    web:
      exposure:
        include: health,metrics`
      },
      bullets: [
        "Application traffic can use port 8080 in this example.",
        "Management traffic can use port 8081.",
        "A separate port can simplify network restrictions.",
        "The management port should still be protected.",
        "Do not assume that a separate port automatically provides authentication."
      ]
    },
    {
      id: "security",
      title: "Secure Actuator in Production",
      paragraphs: [
        "Operational endpoints can reveal information about application internals. Some endpoints can expose environment properties, bean information, request mappings, thread information, logger configuration, or other sensitive operational data.",
        "Expose only the endpoints required by your monitoring and operations architecture. Use Spring Security where appropriate and restrict management traffic at the network level when possible.",
        "The show-details setting controls the amount of information returned by health responses. It does not replace authorization, authentication, firewall rules, or network restrictions."
      ],
      bullets: [
        "Expose only required endpoints.",
        "Protect sensitive management endpoints with authentication and authorization.",
        "Consider a separate management port.",
        "Use firewall rules or network policies where appropriate.",
        "Do not expose environment or configuration information publicly.",
        "Never expose secrets intentionally through Actuator responses.",
        "Review Actuator exposure again before production deployment.",
        "Do not blindly use include: '*' in a public production application."
      ]
    },
    {
      id: "security-example",
      title: "Protect Actuator with Spring Security",
      paragraphs: [
        "If Spring Security is part of the application, Actuator endpoints can be protected using normal Spring Security authorization rules.",
        "A common production approach is to allow a narrowly defined health endpoint for infrastructure checks while requiring authentication for more sensitive management endpoints."
      ],
      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/**").hasRole("ACTUATOR")
                .anyRequest().authenticated()
            );

        return http.build();
    }
}`
      },
      bullets: [
        "This is an example policy, not a universal production configuration.",
        "Health access may be public when infrastructure requires it.",
        "Sensitive management endpoints should normally require authorization.",
        "The exact security design depends on how the application is deployed."
      ]
    },
    {
      id: "health-vs-readiness",
      title: "Liveness vs Readiness",
      paragraphs: [
        "In modern production environments, especially Kubernetes-based deployments, it is important to distinguish liveness from readiness.",
        "Liveness asks whether the application should continue running. Readiness asks whether the application is currently ready to receive traffic.",
        "A temporary dependency problem does not always mean that the application process should be restarted. Therefore, readiness and liveness should be designed carefully."
      ],
      code: {
        language: "text",
        code: `Liveness

"Is the application process alive?"

        |
        v
If unhealthy
        |
        v
Orchestrator may restart application


Readiness

"Can this application receive traffic?"

        |
        v
If not ready
        |
        v
Remove instance from traffic
but do not necessarily restart it`
      },
      bullets: [
        "Liveness is about whether the application should remain running.",
        "Readiness is about whether the application should receive traffic.",
        "Do not put every external dependency into liveness.",
        "Readiness can include dependencies when that matches the application's traffic requirements.",
        "Incorrect health design can cause unnecessary restarts."
      ]
    },
    {
      id: "troubleshooting",
      title: "Common Actuator Troubleshooting",
      paragraphs: [
        "A frequent beginner problem is adding the Actuator dependency and immediately expecting every endpoint to be accessible. Endpoint availability is controlled by endpoint enablement, web exposure, security, and the application's configuration.",
        "Troubleshooting should therefore proceed systematically rather than changing multiple settings randomly."
      ],
      code: {
        language: "text",
        code: `Problem: /actuator/metrics returns 404

Check:

1. Is spring-boot-starter-actuator present?
2. Did the application restart?
3. Is the metrics endpoint available?
4. Is metrics exposed over HTTP?
5. Is Spring Security blocking the request?
6. Is a custom management base path configured?
7. Is the request being sent to the correct management port?`
      },
      bullets: [
        "Check the dependency first.",
        "Check endpoint exposure configuration.",
        "Check the management base path.",
        "Check whether a separate management port is configured.",
        "Check Spring Security authorization rules.",
        "Check application startup logs.",
        "Check the exact Spring Boot version when configuration behavior differs."
      ]
    },
    {
      id: "testing",
      title: "Testing Actuator with Postman or Browser",
      paragraphs: [
        "For a local application running on port 8080 with the default Actuator base path, the health endpoint can be tested using a browser, curl, or Postman.",
        "Testing management endpoints locally before deployment helps verify that the expected endpoints are actually exposed and that security rules behave as intended."
      ],
      code: {
        language: "bash",
        code: `curl http://localhost:8080/actuator/health

curl http://localhost:8080/actuator/info

curl http://localhost:8080/actuator/metrics

curl http://localhost:8080/actuator/metrics/jvm.memory.used`
      },
      bullets: [
        "Start the Spring Boot application first.",
        "Use the correct server or management port.",
        "Use the configured Actuator base path.",
        "If authentication is configured, provide the required credentials or token.",
        "Test both successful and unauthorized requests."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      paragraphs: [
        "Actuator is simple to add but easy to configure incorrectly. Most production problems come from exposing too much information, misunderstanding endpoint exposure, or treating Actuator as a complete observability platform."
      ],
      bullets: [
        "Mistake 1: Exposing every Actuator endpoint publicly.",
        "Mistake 2: Assuming show-details controls authentication.",
        "Mistake 3: Confusing endpoint existence with HTTP exposure.",
        "Mistake 4: Assuming /actuator/metrics will contain every metric automatically.",
        "Mistake 5: Creating high-cardinality custom metric tags.",
        "Mistake 6: Putting expensive dependency checks into liveness.",
        "Mistake 7: Exposing environment or configuration information without reviewing sensitive values.",
        "Mistake 8: Assuming Actuator replaces logs and tracing.",
        "Mistake 9: Forgetting that a custom management port changes where endpoints are accessed.",
        "Mistake 10: Using wildcard endpoint exposure without a security review."
      ]
    },
    {
      id: "best-practices",
      title: "Actuator Best Practices",
      paragraphs: [
        "A production Actuator configuration should follow the principle of least exposure. The goal is not to expose as many endpoints as possible. The goal is to expose the smallest set of operational information needed by the team and infrastructure.",
        "Health endpoints should be designed for reliable infrastructure checks, while metrics should be collected and analyzed by a proper monitoring system."
      ],
      bullets: [
        "Expose only required endpoints.",
        "Protect sensitive endpoints.",
        "Use a separate management port when it improves network isolation.",
        "Keep health checks lightweight.",
        "Design liveness and readiness separately.",
        "Avoid secrets in Actuator output.",
        "Control custom metric cardinality.",
        "Use external monitoring for long-term metric storage and visualization.",
        "Use logs for detailed event information.",
        "Use distributed tracing for request flow across services.",
        "Review Actuator configuration as part of production readiness checks."
      ]
    },
    {
      id: "observability-overview",
      title: "Actuator vs Logs vs Metrics vs Tracing",
      paragraphs: [
        "Actuator is one part of production observability. Logs, metrics, and traces answer different questions.",
        "A useful way to remember the difference is: logs tell you what happened, metrics tell you how much or how often, and traces show how a request moved through distributed components."
      ],
      code: {
        language: "text",
        code: `Logs
  -> What happened?

Metrics
  -> How much?
  -> How often?
  -> How long?

Tracing
  -> Where did the request travel?

Actuator
  -> Provides management endpoints and
     access to application health/metrics`
      },
      bullets: [
        "Use logs for detailed events and errors.",
        "Use metrics for numerical trends and alerting.",
        "Use traces for distributed request flows.",
        "Use Actuator to expose operational information from Spring Boot applications.",
        "A production system usually needs multiple observability signals."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is Spring Boot Actuator?",
          answer:
            "Spring Boot Actuator provides production-oriented management endpoints and metrics integrations that help developers and operators inspect application health, configuration-related information, and runtime behavior."
        },
        {
          question: "How do you enable Actuator in a Spring Boot application?",
          answer:
            "Add the spring-boot-starter-actuator dependency, configure the required endpoints, expose the endpoints through the intended management transport, and apply appropriate security controls."
        },
        {
          question: "What is the commonly used Actuator health endpoint?",
          answer:
            "GET /actuator/health is the commonly used health endpoint when the application uses the default Actuator base path and the endpoint is available."
        },
        {
          question: "What is the default Actuator base path?",
          answer:
            "The default web base path is /actuator. It can be customized through management endpoint web path configuration."
        },
        {
          question: "What is the purpose of the health endpoint?",
          answer:
            "The health endpoint provides a machine-readable indication of application health and can be used by developers, monitoring systems, load balancers, and deployment infrastructure."
        },
        {
          question: "What is the purpose of the metrics endpoint?",
          answer:
            "The metrics endpoint provides access to registered application and runtime measurements through Micrometer's metrics infrastructure."
        },
        {
          question: "What is Micrometer?",
          answer:
            "Micrometer is the metrics instrumentation facade used by Spring Boot to provide application measurements in a vendor-neutral way and integrate with different monitoring systems."
        },
        {
          question: "Does adding Actuator automatically expose every endpoint?",
          answer:
            "No. Endpoint availability depends on endpoint enablement, web exposure, configuration, dependencies, and security."
        },
        {
          question: "Is it safe to expose all Actuator endpoints publicly?",
          answer:
            "No. Some endpoints can reveal sensitive operational or configuration information. Production applications should expose only required endpoints and protect sensitive management operations."
        },
        {
          question: "What does management.endpoints.web.exposure.include do?",
          answer:
            "It controls which Actuator endpoints are exposed through the web management interface. It does not by itself provide authentication or authorization."
        },
        {
          question: "What does management.endpoint.health.show-details control?",
          answer:
            "It controls how much detail is included in health responses. It does not replace authentication, authorization, or network security."
        },
        {
          question: "Can Actuator run on a different port?",
          answer:
            "Yes. Spring Boot can configure a separate management server port, which can help with network isolation and operational access control."
        },
        {
          question: "What is the difference between liveness and readiness?",
          answer:
            "Liveness indicates whether the application should remain running, while readiness indicates whether the application is currently ready to receive traffic."
        },
        {
          question: "Should a database failure always make liveness DOWN?",
          answer:
            "Not necessarily. A temporary dependency failure may mean the application is not ready to receive traffic, but restarting the application may not solve the problem. Liveness and readiness should be designed according to the application's behavior."
        },
        {
          question: "Does Actuator replace Prometheus and Grafana?",
          answer:
            "No. Actuator exposes management information and metrics. Monitoring systems such as Prometheus can collect metrics, while visualization systems such as Grafana can display trends and dashboards."
        },
        {
          question: "Does Actuator replace logging?",
          answer:
            "No. Actuator and metrics provide operational information, while logs provide detailed event information and diagnostic context."
        },
        {
          question: "What happens if /actuator/health returns 404?",
          answer:
            "Check whether Actuator is included, whether the health endpoint is enabled and exposed, whether a custom management base path or port is configured, and whether the request is being sent to the correct application."
        },
        {
          question: "Why should Actuator endpoints be secured?",
          answer:
            "Some endpoints can reveal application internals, configuration information, mappings, thread information, or other operational details that should not be publicly accessible."
        },
        {
          question: "What is a custom metric?",
          answer:
            "A custom metric is an application-specific measurement created using Micrometer, such as the number of successful payments, orders processed, or the duration of a business operation."
        },
        {
          question: "What is metric cardinality?",
          answer:
            "Cardinality refers to the number of distinct time series produced by metric dimensions such as tags. Uncontrolled high-cardinality tags can consume significant monitoring resources and should be avoided."
        }
      ]
    },
    {
      id: "interview-scenario",
      title: "Scenario-Based Interview Question",
      paragraphs: [
        "Interviewers often ask how you would expose Actuator in a production Spring Boot application without creating a security risk."
      ],
      code: {
        language: "text",
        code: `Interviewer:
"How would you configure Actuator for production?"

Good answer:

1. Add spring-boot-starter-actuator.
2. Expose only required endpoints.
3. Keep sensitive endpoints protected.
4. Configure authentication and authorization.
5. Consider a separate management port.
6. Configure health checks for infrastructure.
7. Separate liveness and readiness concerns.
8. Export metrics to the monitoring system.
9. Avoid exposing secrets or sensitive configuration.
10. Test the management endpoints before deployment.`
      },
      bullets: [
        "Start with minimum required exposure.",
        "Apply security before production deployment.",
        "Use health for infrastructure checks.",
        "Use metrics for monitoring and alerting.",
        "Keep sensitive diagnostic endpoints restricted."
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Spring Boot Actuator provides production-oriented management endpoints for monitoring and operating Spring Boot applications."
      ],
      bullets: [
        "Dependency: spring-boot-starter-actuator.",
        "Common health endpoint: /actuator/health.",
        "Common metrics endpoint: /actuator/metrics.",
        "Default Actuator web base path: /actuator.",
        "Endpoint exposure is different from endpoint security.",
        "show-details controls health response detail, not authentication.",
        "Micrometer provides the metrics instrumentation layer.",
        "Liveness asks whether the application should remain running.",
        "Readiness asks whether the application can receive traffic.",
        "Expose only required Actuator endpoints.",
        "Protect sensitive management endpoints.",
        "Actuator complements logs, metrics, tracing, and external monitoring systems.",
        "Never treat Actuator as a reason to expose internal application information publicly."
      ]
    }
  ]
};
