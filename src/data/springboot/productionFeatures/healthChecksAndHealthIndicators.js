
export const healthChecksAndHealthIndicators = {
  id: 1402,
  title: "Health Checks and Health Indicators",
  slug: "health-checks-and-health-indicators",
  topicTitle: "Spring Boot Production Features",
  description:
    "Learn Spring Boot Actuator health checks, built-in and custom health indicators, liveness and readiness probes, load-balancer health checks, endpoint security, and production troubleshooting.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "health",
      title: "What Is a Health Check?",
      paragraphs: [
        "A health check gives an external system a signal about whether an application or one of its important components is in a suitable state. Load balancers, container orchestrators, and monitoring tools can use health results to make operational decisions.",
        "Spring Boot Actuator provides a health endpoint at /actuator/health when the Actuator dependency is present and the endpoint is available through the application's configuration. It combines health information from registered health contributors.",
        "Health contributors may represent infrastructure such as a database or disk space, or application-specific components such as a processing engine. Which contributors appear depends on the application's dependencies, configuration, and custom health indicators.",
        "Health status commonly includes UP, DOWN, OUT_OF_SERVICE, and UNKNOWN. These statuses communicate the condition reported by the configured contributors. The overall status is determined by the health aggregation configuration and the statuses of the contributors included in that health endpoint or health group.",
        "A successful health response does not guarantee that every business operation is correct. A database may be reachable while a particular query fails, or an external payment provider may be unavailable even though the core application is healthy. Design checks around the operational decision they are intended to support."
      ],
      bullets: [
        "Liveness asks whether the application should continue running.",
        "Readiness asks whether the application is ready to receive traffic.",
        "Dependency health reports the condition of components such as databases or external services.",
        "Actuator health combines information from registered health contributors.",
        "Keep health checks fast, predictable, and inexpensive.",
        "Choose health checks based on the action that a monitoring system or platform will take.",
        "Do not treat a healthy response as proof that every business feature works."
      ]
    },
    {
      id: "actuator-setup",
      title: "Enable Spring Boot Actuator Health Checks",
      paragraphs: [
        "Spring Boot Actuator provides production-oriented endpoints for monitoring and managing an application. To use its health endpoint, add the Actuator starter to the application.",
        "By default, the health endpoint is commonly available at /actuator/health when the application uses the standard web setup and the endpoint has not been disabled or otherwise restricted. Endpoint exposure and security configuration determine whether a particular caller can access it.",
        "Exposing an endpoint over HTTP is different from having the endpoint available internally. Production applications should expose only the endpoints they need and protect operational information according to their security requirements."
      ],
      code: {
        language: "xml",
        code: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>`
      },
      bullets: [
        "Use the Actuator starter that matches the Spring Boot version managed by your project.",
        "Start the application and test the configured health endpoint.",
        "Configure HTTP endpoint exposure deliberately.",
        "Protect sensitive management endpoints with suitable network and security controls.",
        "Do not assume adding the dependency automatically makes every Actuator endpoint publicly accessible."
      ]
    },
    {
      id: "health-response",
      title: "Understand Health Responses and Statuses",
      paragraphs: [
        "The Actuator health endpoint returns a health status. Depending on configuration and the information exposed to the caller, the response may also contain component details and individual contributor statuses.",
        "A simple response may contain only the overall status. More detailed responses can help operators identify which component is unhealthy, but revealing database details or internal service information to an unauthenticated caller can create a security risk.",
        "The overall health status is not simply a universal rule that any failed dependency always makes every health group DOWN. Health groups can include selected contributors, and status aggregation can be configured. Inspect the actual health-group configuration when a result differs from expectations."
      ],
      code: {
        language: "json",
        code: `{
  "status": "UP"
}`
      },
      bullets: [
        "UP indicates that the reported component or group is healthy.",
        "DOWN indicates that a component or group reports an unhealthy condition.",
        "OUT_OF_SERVICE can indicate that a component should not be used.",
        "UNKNOWN means the reported state could not be determined.",
        "Component details depend on endpoint configuration and authorization.",
        "Use detailed responses for trusted operators rather than exposing sensitive internals unnecessarily.",
        "A health status describes the configured check results, not a guarantee about future requests."
      ]
    },
    {
      id: "custom-indicator",
      title: "Create a Custom Health Indicator",
      paragraphs: [
        "Spring Boot allows application-specific health checks through the HealthIndicator interface. A custom indicator can report whether an important internal component is operational.",
        "Spring discovers a custom indicator when it is registered as a bean. Its health method should return an appropriate Health result, such as Health.up() or Health.down().",
        "The example below checks a hypothetical processing engine. ProcessingEngine is an application-specific type; it must be implemented and registered as a Spring bean for this example to compile in a real project.",
        "A custom health check should use a reliable and inexpensive signal. Avoid executing a large business workflow or making an unbounded remote call each time the health endpoint is requested."
      ],
      code: {
        language: "java",
        code: `package com.codeforge.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class ProcessingHealthIndicator
        implements HealthIndicator {

    private final ProcessingEngine engine;

    public ProcessingHealthIndicator(
            ProcessingEngine engine) {
        this.engine = engine;
    }

    @Override
    public Health health() {
        if (engine.isAvailable()) {
            return Health.up()
                    .withDetail("component", "processing-engine")
                    .build();
        }

        return Health.down()
                .withDetail("component", "processing-engine")
                .withDetail("reason", "engine unavailable")
                .build();
    }
}`
      },
      bullets: [
        "Health.up() reports an UP status.",
        "Health.down() reports a DOWN status.",
        "A custom indicator is registered as a Spring bean.",
        "ProcessingEngine is an application-specific dependency that must be implemented.",
        "Use bounded checks and suitable timeouts when a health indicator calls another service.",
        "Keep returned details free of passwords, tokens, private data, and unnecessary infrastructure information.",
        "Choose the health group in which the indicator should participate instead of assuming every indicator belongs in every probe."
      ]
    },
    {
      id: "built-in-indicators",
      title: "Understand Built-In Health Indicators",
      paragraphs: [
        "Spring Boot Actuator can automatically configure health indicators for supported technologies present on the classpath and available in the application context.",
        "For example, a database health indicator can check database connectivity, while other indicators may report on disk space or supported messaging systems. The exact set of available indicators depends on the dependencies and Spring Boot version in use.",
        "Automatic configuration reduces the need to write custom code for common infrastructure checks. However, an indicator generally answers a limited question about its component; it does not prove that the application can complete every operation involving that dependency.",
        "If a database indicator reports DOWN, investigate connectivity, credentials, database availability, network rules, and connection-pool behavior. Do not immediately assume the database server itself is the only possible cause."
      ],
      bullets: [
        "Use built-in indicators for supported infrastructure when they meet your requirements.",
        "Check the Spring Boot version's documentation for available indicators and configuration.",
        "Understand what each indicator actually verifies.",
        "Use custom indicators only when application-specific information is needed.",
        "Avoid duplicating an existing built-in check without a clear reason.",
        "Investigate the underlying cause instead of relying only on the final status."
      ]
    },
    {
      id: "probes",
      title: "Liveness and Readiness",
      paragraphs: [
        "Liveness and readiness solve different operational problems. Liveness asks whether the process is functioning well enough to continue running. Readiness asks whether the instance should receive application traffic.",
        "If an application is alive but temporarily unable to serve requests, a readiness failure can remove it from traffic without repeatedly restarting it. This is useful during startup, maintenance, or dependency problems that prevent the instance from serving requests correctly.",
        "A liveness check should generally avoid failing merely because a remote dependency is unavailable. Otherwise, a temporary database outage can cause many application instances to restart simultaneously, increasing load and making recovery harder.",
        "Spring Boot Actuator supports liveness and readiness health groups when probes are enabled. These groups are designed for orchestrator integrations, but the final behavior depends on how the deployment platform consumes the probe results.",
        "Readiness may include selected dependency indicators when the application's traffic eligibility truly depends on those dependencies. Make this decision carefully: including every external service can make an otherwise useful application instance unavailable during a partial dependency outage."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoint:
    health:
      probes:
        enabled: true
      group:
        readiness:
          include: readinessState,db

server:
  shutdown: graceful`
      },
      bullets: [
        "Use liveness to identify an application that cannot recover on its own.",
        "Use readiness to decide whether an instance should receive traffic.",
        "readinessState represents Spring's application readiness state.",
        "The db contributor is included in the readiness group in this example.",
        "Including db means database health can affect the readiness result; choose this intentionally.",
        "Avoid making liveness depend directly on every remote dependency.",
        "Verify probe paths and health-group behavior against the Spring Boot version in use."
      ]
    },
    {
      id: "probe-paths",
      title: "Configure Probe Endpoints for Containers",
      paragraphs: [
        "When Actuator health probes are enabled, Spring Boot provides liveness and readiness health groups. In a typical web application, these are accessible through paths such as /actuator/health/liveness and /actuator/health/readiness when the relevant HTTP exposure and security settings allow access.",
        "A container orchestrator can call these paths to determine whether the instance should remain running and whether it should receive traffic. Probe paths, timeouts, intervals, and failure thresholds should match the deployment environment.",
        "In containerized deployments, management endpoints served only on a separate management port may not always provide the same signal as the main application listener. For some deployments, exposing additional probe paths on the main server port is useful so that the probe tests the application server that handles normal traffic.",
        "The property management.endpoint.health.probes.add-additional-paths=true can be used in supported Spring Boot versions to add probe paths to the main server port. Confirm support and behavior in the documentation for your exact version."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoint:
    health:
      probes:
        enabled: true
        add-additional-paths: true
  endpoints:
    web:
      exposure:
        include: health`
      },
      bullets: [
        "Use the liveness path for liveness checks and the readiness path for readiness checks.",
        "Ensure the relevant health endpoint is exposed over HTTP.",
        "Ensure the deployment platform can reach the probe endpoint.",
        "Review security rules so legitimate probes work without exposing sensitive management endpoints.",
        "Choose suitable probe timeouts, intervals, and failure thresholds.",
        "Use additional main-port probe paths when supported and appropriate for the deployment.",
        "Test probes after deployment instead of relying only on local behavior."
      ]
    },
    {
      id: "load-balancer",
      title: "Health Checks Behind a Load Balancer",
      paragraphs: [
        "A load balancer can periodically call a health endpoint on each application instance. Based on its health policy, it can stop routing new traffic to an instance that fails the configured checks and resume routing when the instance becomes healthy again.",
        "A load-balancer health check is an infrastructure decision. It is related to Actuator health, but it is not automatically the same as Kubernetes liveness or readiness. The load balancer must be configured to call the correct endpoint and interpret the response correctly.",
        "The endpoint path, accepted HTTP status codes, timeout, interval, and failure threshold must agree with the application configuration. An overly aggressive policy can remove healthy instances during harmless temporary delays.",
        "Health checks should also be tested for recovery. An instance that was removed from traffic should be able to return when the check succeeds again, according to the load balancer's recovery policy."
      ],
      code: {
        language: "text",
        code: `Example load-balancer configuration concept

Health endpoint: /actuator/health/readiness
Expected HTTP status: 200
Timeout: a short, bounded duration
Interval: a reasonable repeated-check interval
Failure threshold: configured for the expected environment
Recovery: restore traffic after successful checks

These values are illustrative.
Use values appropriate to your platform and application.`
      },
      bullets: [
        "Choose an endpoint intended for traffic eligibility.",
        "Set reasonable health-check timeouts and failure thresholds.",
        "Confirm that the load balancer can reach the endpoint.",
        "Avoid exposing sensitive dependency details to unauthenticated callers.",
        "Test how the load balancer reacts to both failure and recovery.",
        "Coordinate load-balancer draining with graceful shutdown during deployments.",
        "Avoid overly aggressive checks that cause unnecessary instance removal."
      ]
    },
    {
      id: "security",
      title: "Secure Actuator Health Endpoints",
      paragraphs: [
        "Health endpoints can reveal operational information about databases, messaging systems, external services, and internal components. Whether this information is exposed depends on the endpoint configuration and security rules.",
        "A minimal health response is often appropriate for public or infrastructure-facing checks. Detailed component information can be restricted to authenticated operators or made available through a separately protected management interface.",
        "Endpoint exposure and authorization are separate controls. Exposing the health endpoint makes it available through the web layer, while Spring Security or network controls determine who can access it.",
        "Do not expose all Actuator endpoints indiscriminately. Endpoints that reveal environment properties, configuration, or other management information can create substantial risk if they are publicly accessible."
      ],
      code: {
        language: "yaml",
        code: `management:
  endpoints:
    web:
      exposure:
        include: health

  endpoint:
    health:
      show-details: never
      probes:
        enabled: true`
      },
      bullets: [
        "Expose only the Actuator endpoints that the deployment needs.",
        "Use appropriate Spring Security rules and network access controls.",
        "Keep detailed health information restricted to trusted operators.",
        "Avoid returning credentials, tokens, connection strings, or private infrastructure details.",
        "Verify that required probes remain accessible after applying security rules.",
        "Treat management endpoints as production interfaces that require deliberate configuration."
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshoot Unhealthy Applications",
      paragraphs: [
        "When a health endpoint reports DOWN or an orchestrator marks an instance unhealthy, begin by identifying which health group and contributor produced the status. If details are restricted, use authorized logs and diagnostics rather than exposing additional information publicly.",
        "A database health failure may result from a database outage, invalid credentials, network connectivity problems, TLS configuration, connection-pool exhaustion, or an unavailable database connection. The health result is a symptom that requires diagnosis.",
        "If an instance repeatedly fails liveness and restarts, determine whether the application is actually unable to recover or whether the probe is too strict. Restarting an application cannot fix every external dependency failure and may worsen an incident.",
        "If readiness fails while liveness remains healthy, the instance may be alive but unsuitable for traffic. Investigate the readiness group, startup state, dependencies included in the group, and the infrastructure's routing behavior."
      ],
      bullets: [
        "Identify whether the failing check is liveness, readiness, or general dependency health.",
        "Inspect authorized health details and application logs.",
        "Check database connectivity, credentials, networking, and connection-pool behavior.",
        "Review probe paths, timeouts, intervals, and failure thresholds.",
        "Verify that management endpoint security allows legitimate probes.",
        "Check whether a custom health indicator is blocking or performing expensive work.",
        "Avoid using repeated restarts as a universal solution for dependency failures."
      ]
    },
    {
      id: "testing",
      title: "Test Health Indicators",
      paragraphs: [
        "Health indicators should be tested for both healthy and unhealthy conditions. This verifies that the application reports the expected status and that custom checks handle failures safely.",
        "For a custom indicator, mock the dependency and test the result returned by health(). This approach avoids depending on a live external service for a small unit test.",
        "Integration tests can verify that the health endpoint is available and that the expected contributors are included. Tests should use configuration appropriate for the test environment and must not rely on production credentials.",
        "For deployment readiness, also test the actual probe endpoint in the packaged application or container. Unit tests alone cannot prove that the platform can reach the endpoint or interpret its status correctly."
      ],
      code: {
        language: "java",
        code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.boot.actuate.health.Status;

import static org.mockito.Mockito.mock;

class ProcessingHealthIndicatorTest {

    @Test
    void reportsUpWhenEngineIsAvailable() {
        ProcessingEngine engine =
                mock(ProcessingEngine.class);

        when(engine.isAvailable()).thenReturn(true);

        ProcessingHealthIndicator indicator =
                new ProcessingHealthIndicator(engine);

        assertEquals(Status.UP, indicator.health().getStatus());
    }

    @Test
    void reportsDownWhenEngineIsUnavailable() {
        ProcessingEngine engine =
                mock(ProcessingEngine.class);

        when(engine.isAvailable()).thenReturn(false);

        ProcessingHealthIndicator indicator =
                new ProcessingHealthIndicator(engine);

        assertEquals(Status.DOWN, indicator.health().getStatus());
    }
}`
      },
      bullets: [
        "Test the UP and DOWN paths of custom indicators.",
        "Mock external dependencies for focused unit tests.",
        "Test endpoint availability and health-group membership in integration tests.",
        "Test timeout and exception behavior for checks that call external services.",
        "Verify endpoint access after applying security configuration.",
        "Test the real container or orchestrator probe paths before production rollout."
      ]
    },
    {
      id: "common-mistakes",
      title: "Common Health Check Mistakes",
      paragraphs: [
        "A health check is useful only when it measures a condition relevant to the operational decision. A check that performs an expensive workflow, blocks on an external service, or fails for harmless temporary conditions can itself become a source of instability.",
        "Another common mistake is using the same health definition for every purpose. Liveness, readiness, detailed dependency health, and load-balancer checks may require different contributors and failure policies.",
        "Health status also needs to be interpreted in context. A DOWN result does not automatically mean that the process should restart, and an UP result does not guarantee that all business functions will succeed."
      ],
      bullets: [
        "Making liveness depend on every external service.",
        "Including all dependencies in readiness without evaluating the consequences.",
        "Performing slow or unbounded work inside a health indicator.",
        "Exposing detailed dependency information publicly.",
        "Assuming every Actuator endpoint is exposed by default.",
        "Using a load-balancer endpoint that does not represent traffic readiness.",
        "Ignoring recovery behavior after a failed health check.",
        "Assuming HTTP 200 proves that all business operations work.",
        "Restarting instances repeatedly to compensate for an unavailable remote dependency.",
        "Failing to test health endpoints through the actual deployment network and security configuration."
      ]
    },
    {
      id: "best-practices",
      title: "Health Check Best Practices",
      paragraphs: [
        "A production health-check strategy should provide actionable signals without adding significant load or creating unnecessary restarts. Each check should have a clear purpose and a documented interpretation.",
        "Use liveness for conditions where restarting the application is an appropriate recovery action. Use readiness for conditions where the instance should temporarily stop receiving traffic. Use separate diagnostics or monitoring for detailed dependency visibility where appropriate.",
        "Keep custom checks inexpensive, bound any external calls, and secure diagnostic details. Finally, verify how the load balancer or orchestrator responds to both failed and successful checks."
      ],
      bullets: [
        "Use Spring Boot Actuator for standard health endpoints.",
        "Use built-in indicators when they meet the application's requirements.",
        "Keep custom HealthIndicator implementations fast and predictable.",
        "Separate liveness from readiness.",
        "Include dependencies in readiness only when they affect traffic eligibility.",
        "Avoid unnecessary remote dependency checks in liveness.",
        "Restrict detailed health information to trusted users.",
        "Configure appropriate probe intervals, timeouts, and failure thresholds.",
        "Test both unhealthy and recovery scenarios.",
        "Coordinate readiness checks with graceful shutdown and traffic draining.",
        "Monitor health transitions and investigate repeated failures."
      ]
    },
    {
      id: "interview",
      title: "Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a health check?",
          answer: "A health check reports whether an application or component is in a suitable state. Load balancers, orchestrators, and monitoring systems use the result to make operational decisions."
        },
        {
          question: "What is Spring Boot Actuator?",
          answer: "Spring Boot Actuator provides production-oriented endpoints and monitoring capabilities, including health information through the health endpoint when configured and available."
        },
        {
          question: "What is the default Actuator health endpoint?",
          answer: "In a standard web application, the health endpoint is commonly available at /actuator/health when Actuator is installed and the endpoint is enabled, exposed, and accessible under the application's configuration."
        },
        {
          question: "What is the difference between liveness and readiness?",
          answer: "Liveness indicates whether the application should continue running. Readiness indicates whether the instance should receive traffic. A dependency failure may make an instance unready without necessarily requiring a restart."
        },
        {
          question: "What is a HealthIndicator?",
          answer: "HealthIndicator is a Spring Boot Actuator interface that lets an application report the health of a particular component through its health() method."
        },
        {
          question: "How do you create a custom health indicator?",
          answer: "Create a Spring bean that implements HealthIndicator and implement health() to return a Health result such as Health.up().build() or Health.down().build()."
        },
        {
          question: "Should a liveness check fail when the database is down?",
          answer: "Usually not solely for that reason. Restarting every application instance during a database outage can worsen the incident. Database health is often better handled through readiness or separate dependency monitoring."
        },
        {
          question: "Should the database be included in readiness?",
          answer: "Include it when database availability is required for the instance to serve useful traffic. Consider the effect of removing every instance from traffic during a database outage and choose the policy intentionally."
        },
        {
          question: "How does a load balancer use health checks?",
          answer: "It periodically calls a configured endpoint and applies its health policy to determine whether an instance should receive traffic. The endpoint, timeout, accepted response, and failure thresholds must be configured correctly."
        },
        {
          question: "Does HTTP 200 from a health endpoint guarantee that the application is error-free?",
          answer: "No. It indicates that the configured health endpoint returned a successful HTTP response and its health contributors reported the configured result. It does not verify every business operation or guarantee future availability."
        },
        {
          question: "What is the difference between a built-in and custom health indicator?",
          answer: "A built-in indicator is provided through Spring Boot's supported integrations. A custom indicator is application-defined and reports the condition of a component specific to the application."
        },
        {
          question: "Why should health checks be fast?",
          answer: "Health checks may run frequently and affect routing or restart decisions. Slow or expensive checks can consume resources, time out, and incorrectly make healthy instances appear unavailable."
        },
        {
          question: "How can you protect health endpoint details?",
          answer: "Expose only the necessary endpoints, restrict access through Spring Security and network controls, and configure health detail visibility so unauthenticated callers do not receive sensitive component information."
        },
        {
          question: "What happens if a custom health indicator throws an exception?",
          answer: "The health contributor may be reported as unhealthy or fail to produce its expected result, depending on the exception and framework behavior. Custom checks should handle expected failures safely and use bounded external calls."
        },
        {
          question: "How do you test a custom HealthIndicator?",
          answer: "Mock its dependency, test the expected UP and DOWN results, and add integration tests to verify endpoint availability, health-group membership, and deployment probe behavior."
        },
        {
          question: "How are health checks related to graceful shutdown?",
          answer: "Readiness and traffic draining help prevent new requests from reaching an instance that is being removed. Graceful shutdown then gives in-flight requests and managed components time to finish within configured limits."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "Quick Revision Notes",
      paragraphs: [
        "Spring Boot Actuator health checks report the condition of configured health contributors. Custom HealthIndicator implementations allow application-specific health reporting, while liveness and readiness health groups support different operational decisions.",
        "A reliable production design keeps health checks inexpensive, secures detailed information, uses readiness to control traffic eligibility, and avoids restarting instances simply because an external dependency is temporarily unavailable."
      ],
      bullets: [
        "Actuator health endpoint: /actuator/health.",
        "Custom health checks: implement HealthIndicator and return a Health result.",
        "UP: the reported component or group is healthy.",
        "DOWN: the reported component or group is unhealthy.",
        "Liveness: should the application continue running?",
        "Readiness: should the instance receive traffic?",
        "Load-balancer checks: control routing according to infrastructure policy.",
        "Endpoint exposure: determines which management endpoints are available over HTTP.",
        "Endpoint security: controls who can access exposed management information.",
        "Production rule: test failure, recovery, and actual deployment probe behavior."
      ],
      code: {
        language: "text",
        code: `Production health-check flow

Spring Boot application
          |
          v
   Actuator health
          |
          +------------------+
          |                  |
          v                  v
      Liveness            Readiness
          |                  |
          v                  v
 Continue or restart    Receive traffic?
                             |
                             v
                    Load balancer or
                    orchestrator routing`
      }
    }
  ]
};
