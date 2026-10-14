
export const beanScopes = {
  id: "bean-scopes",
  title: "Spring Bean Scopes",
  slug: "bean-scopes",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "45 min",

  description:
    "Understand Spring bean scopes, instance creation and reuse, web-aware scopes, scoped proxies, dependency injection between different scopes, thread safety, and real-world use cases.",

  sections: [
    {
      id: "what-is-scope",
      title: "1. What is a Bean Scope?",

      paragraphs: [
        "A bean scope determines how Spring creates, reuses, and manages instances of a bean. It controls the lifecycle and visibility of bean instances within the relevant Spring container or web context.",
        "For example, an application-wide service usually uses singleton scope because many requests can share the same service instance. A temporary report builder might use prototype scope when each operation needs a separate instance.",
        "Choosing the correct scope is important for memory usage, state management, thread safety, and application behavior. A scope does not automatically make a class thread-safe; the class's fields and operations must still be designed correctly."
      ],

      bullets: [
        "Singleton: one instance per bean definition per ApplicationContext.",
        "Prototype: a new instance for each container request for that bean.",
        "Request: one instance per HTTP request.",
        "Session: one instance per HTTP session.",
        "Application: one instance per ServletContext.",
        "WebSocket: one instance per WebSocket session."
      ]
    },

    {
      id: "scope-types",
      title: "2. Types of Spring Bean Scopes",

      paragraphs: [
        "Spring supports singleton and prototype scopes in its general-purpose container. In web-aware application contexts, Spring also supports request, session, application, and WebSocket scopes.",
        "Web-aware scopes require the appropriate web infrastructure. They are not generally available in a plain, non-web ApplicationContext.",
        "Singleton is the default scope when no other scope is specified. You can configure a scope using @Scope or the equivalent configuration options."
      ],

      code: {
        language: "text",
        code: `Spring Bean Scopes
|
|-- singleton
|     One instance per bean definition per context
|
|-- prototype
|     New instance for each container lookup
|
|-- request
|     One instance per HTTP request
|
|-- session
|     One instance per HTTP session
|
|-- application
|     One instance per ServletContext
|
|-- websocket
      One instance per WebSocket session`
      }
    },

    {
      id: "singleton",
      title: "3. Singleton Scope",

      paragraphs: [
        "Singleton is the default Spring bean scope. Spring normally creates one instance of a singleton bean per bean definition in a particular ApplicationContext and reuses that instance whenever the bean is injected or retrieved from that context.",
        "Singleton does not mean one instance across the entire JVM. If two independent ApplicationContext instances each manage the same bean definition, each context can have its own singleton instance.",
        "Singleton scope is suitable for stateless services, repositories, configuration components, and shared application services. Because the same instance can be accessed by concurrent requests, mutable shared state must be handled carefully."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class UserService {

    public String getMessage() {
        return "Hello from UserService";
    }
}`
      },

      bullets: [
        "Singleton is the default scope, so @Scope(\"singleton\") is usually unnecessary.",
        "The bean is shared by consumers within its ApplicationContext.",
        "Spring singleton scope does not automatically synchronize method calls.",
        "Stateless services are usually a good fit for singleton scope."
      ]
    },

    {
      id: "singleton-example",
      title: "4. Verifying Singleton Behavior",

      paragraphs: [
        "You can retrieve the same singleton bean more than once from an ApplicationContext and compare the references. If both lookups refer to the same bean definition in the same context, the references will normally point to the same object."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ScopeDemo {

    public static void main(String[] args) {
        try (AnnotationConfigApplicationContext context =
                     new AnnotationConfigApplicationContext(AppConfig.class)) {

            UserService first =
                    context.getBean(UserService.class);

            UserService second =
                    context.getBean(UserService.class);

            System.out.println(first == second); // true
        }
    }
}`
      },

      bullets: [
        "The comparison uses == to compare object references.",
        "The example assumes UserService is registered in AppConfig's component scan or bean configuration.",
        "The two lookups use the same ApplicationContext.",
        "This behavior is about bean identity, not whether the bean's methods are thread-safe."
      ]
    },

    {
      id: "prototype",
      title: "5. Prototype Scope",

      paragraphs: [
        "Prototype scope tells Spring to create a new bean instance whenever the bean is requested from the container. Spring performs the bean's creation and initialization lifecycle, then hands the instance to the caller.",
        "Prototype scope is useful when each operation needs an independent object with its own temporary state, such as a report builder or a request-specific calculation object.",
        "Unlike singleton scope, Spring does not automatically manage the complete destruction lifecycle of prototype instances after handing them to callers. If a prototype object owns resources, the code that uses it must arrange appropriate cleanup."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ReportBuilder {

    private String reportName;

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getReportName() {
        return reportName;
    }
}`
      },

      bullets: [
        "Each container lookup normally creates a new instance.",
        "Each instance can hold separate temporary state.",
        "Prototype scope does not mean a new object is created on every ordinary method call.",
        "Spring does not automatically call destruction callbacks for prototype instances after handing them to callers."
      ]
    },

    {
      id: "prototype-example",
      title: "6. Verifying Prototype Behavior",

      paragraphs: [
        "Retrieving a prototype bean twice from the same ApplicationContext normally returns two different object instances. This is useful when an operation requires a separate object with independent state."
      ],

      code: {
        language: "java",
        code: `ReportBuilder first =
        context.getBean(ReportBuilder.class);

ReportBuilder second =
        context.getBean(ReportBuilder.class);

System.out.println(first == second); // false

first.setReportName("Monthly Report");
second.setReportName("Annual Report");

System.out.println(first.getReportName());
// Monthly Report

System.out.println(second.getReportName());
// Annual Report`
      },

      bullets: [
        "The two objects have separate fields.",
        "Changing the first instance does not change the second instance.",
        "The example assumes ReportBuilder is registered with prototype scope.",
        "A new instance is created by the container lookup, not by each getter or setter call."
      ]
    },

    {
      id: "singleton-vs-prototype",
      title: "7. Singleton vs Prototype",

      paragraphs: [
        "The main difference is instance reuse. Singleton scope reuses the same instance for a bean definition within a context, while prototype scope creates a new instance for each request to the container.",
        "Prototype scope is not automatically better for mutable objects. A singleton bean can safely perform operations with local variables and immutable dependencies. Conversely, a prototype object can still be used incorrectly if its state is shared elsewhere."
      ],

      code: {
        language: "text",
        code: `Singleton:
getBean() ----> Instance A
getBean() ----> Instance A
getBean() ----> Instance A

Prototype:
getBean() ----> Instance A
getBean() ----> Instance B
getBean() ----> Instance C`
      },

      bullets: [
        "Singleton: generally less object-creation overhead and shared instance state.",
        "Prototype: separate instance state for each container lookup.",
        "Singleton: suitable for most stateless Spring services.",
        "Prototype: useful for independently initialized, short-lived objects.",
        "Prototype objects still require cleanup when they own resources."
      ]
    },

    {
      id: "request-scope",
      title: "8. Request Scope",

      paragraphs: [
        "Request scope creates one bean instance for each HTTP request. Components participating in the same request can resolve the request-scoped bean for that request.",
        "Request-scoped beans are useful for temporary request-specific data, such as a correlation identifier or a value calculated from the current request. Do not use them as a replacement for persistent storage.",
        "Request scope requires a web-aware Spring context and an active HTTP request. Accessing a request-scoped bean when no request is active can fail unless access is correctly deferred or proxied."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class RequestMetadata {

    private String correlationId;

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }
}`
      },

      bullets: [
        "@RequestScope is a convenient annotation for request-scoped components.",
        "A new scoped instance is associated with each HTTP request.",
        "The instance is not shared as the same target object across separate requests.",
        "Do not assume request scope is available in scheduled jobs or ordinary command-line execution."
      ]
    },

    {
      id: "session-scope",
      title: "9. Session Scope",

      paragraphs: [
        "Session scope creates one bean instance for each HTTP session. Requests that belong to the same session can use the same session-scoped target bean, while separate sessions have separate instances.",
        "This scope may be useful for session-specific, non-sensitive application state. However, important business data should normally be stored in an appropriate persistence layer, and authentication or authorization should use the application's security mechanisms.",
        "A session-scoped bean can be accessed by concurrent requests belonging to the same session. Do not assume that session scope makes mutable fields thread-safe."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class UserSessionPreferences {

    private String preferredLanguage = "en";

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String language) {
        this.preferredLanguage = language;
    }
}`
      },

      bullets: [
        "The instance is associated with an HTTP session.",
        "Different sessions receive different scoped instances.",
        "The scope requires web-aware infrastructure.",
        "Session data may disappear when the session expires or is invalidated.",
        "Consider serialization and session replication requirements in distributed deployments."
      ]
    },

    {
      id: "application-scope",
      title: "10. Application Scope",

      paragraphs: [
        "Application scope creates one bean instance per ServletContext. This means the instance is associated with the web application rather than with an individual HTTP request or session.",
        "Application scope is useful for data that belongs to the web application context and must be shared across requests. It is different from Spring singleton scope: a singleton is associated with a particular Spring bean definition and ApplicationContext, while application scope is associated with the ServletContext.",
        "Most ordinary Spring service beans do not need application scope. The default singleton scope is sufficient for many application-wide services."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

@Component
@ApplicationScope
public class ApplicationStatus {

    public String getStatus() {
        return "Application is running";
    }
}`
      },

      bullets: [
        "One scoped instance per ServletContext.",
        "Shared across requests within that web application.",
        "Different ServletContext instances have separate application-scoped instances.",
        "Use singleton scope for ordinary Spring services unless ServletContext-level semantics are specifically required."
      ]
    },

    {
      id: "websocket-scope",
      title: "11. WebSocket Scope",

      paragraphs: [
        "WebSocket scope associates a bean instance with a WebSocket session. It can be useful when a component needs state that belongs to a particular live WebSocket connection.",
        "This scope requires suitable WebSocket infrastructure and an active WebSocket session. It should not be confused with HTTP request scope, because a WebSocket connection can remain open across many message exchanges."
      ],

      bullets: [
        "One scoped target per WebSocket session.",
        "Useful for state tied to an individual connection.",
        "Requires WebSocket-aware Spring infrastructure.",
        "Design cleanup and disconnect handling carefully."
      ]
    },

    {
      id: "scope-configuration",
      title: "12. Configuring Bean Scopes",

      paragraphs: [
        "For component-scanned classes, @Scope can specify the scope name. Spring also provides specialized annotations such as @RequestScope, @SessionScope, and @ApplicationScope for web applications.",
        "For beans created through configuration methods, use the scope attribute on @Bean. The scope name should be valid for the container in which the bean is registered."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class ReportConfiguration {

    @Bean
    @Scope("prototype")
    public ReportBuilder reportBuilder() {
        return new ReportBuilder();
    }
}`
      },

      bullets: [
        "@Scope(\"singleton\") explicitly selects singleton scope.",
        "@Scope(\"prototype\") selects prototype scope.",
        "@Bean methods can declare scope as well as component classes.",
        "Web scopes require the relevant web-aware context."
      ]
    },

    {
      id: "scope-mismatch",
      title: "13. Injecting Prototype into Singleton",

      paragraphs: [
        "A common scope-related problem occurs when a prototype bean is injected directly into a singleton bean through its constructor. The prototype dependency is normally resolved when the singleton is created, so the singleton retains that particular prototype instance.",
        "This means that calling a method on the singleton repeatedly does not automatically produce a new prototype instance. If each operation requires a fresh prototype object, use ObjectProvider, a scoped proxy where appropriate, or another deliberate lookup mechanism."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final ObjectProvider<ReportBuilder> reportBuilderProvider;

    public ReportService(
            ObjectProvider<ReportBuilder> reportBuilderProvider) {
        this.reportBuilderProvider = reportBuilderProvider;
    }

    public ReportBuilder createReportBuilder() {
        return reportBuilderProvider.getObject();
    }
}`
      },

      bullets: [
        "ObjectProvider defers bean lookup until getObject() is called.",
        "When ReportBuilder is prototype-scoped, each getObject() call normally requests a new instance.",
        "The example assumes ReportBuilder is registered as a Spring prototype bean.",
        "Choose the lookup mechanism based on whether a new target is needed per operation."
      ]
    },

    {
      id: "scoped-proxy",
      title: "14. What is a Scoped Proxy?",

      paragraphs: [
        "A scoped proxy is an intermediary object that allows a bean with a shorter or context-dependent scope to be injected into a bean with a longer lifetime. When a method is called, the proxy resolves the appropriate target instance for the active scope.",
        "For example, a singleton service can depend on a request-scoped component through a scoped proxy. The singleton retains the proxy, while the proxy delegates calls to the target associated with the current HTTP request.",
        "Scoped proxies are particularly useful for request and session scopes. They do not make a request-scoped target available outside a valid request; the relevant scope must still be active."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CurrentRequestInfo {

    public String describe() {
        return "Information for the current request";
    }
}`
      },

      bullets: [
        "The singleton consumer can retain the proxy rather than a particular request target.",
        "The proxy resolves the target according to the active scope.",
        "A scoped proxy does not remove the requirement for an active request or session.",
        "Use scoped proxies intentionally because they add indirection to method calls."
      ]
    },

    {
      id: "scope-and-thread-safety",
      title: "15. Bean Scopes and Thread Safety",

      paragraphs: [
        "A bean's scope controls instance creation and reuse; it does not automatically protect its fields from concurrent access.",
        "Singleton beans are often called by multiple request-handling threads. If a singleton service stores request-specific values in mutable instance fields, one request can overwrite another request's data.",
        "Prefer stateless singleton services, immutable fields, local variables, and appropriately synchronized or concurrent data structures when shared mutable state is genuinely required."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class PriceCalculator {

    public double calculate(double price, double taxRate) {
        // Local variables belong to this invocation.
        double tax = price * taxRate;
        return price + tax;
    }
}`
      },

      bullets: [
        "Stateless singleton services are usually safe to share when their dependencies are also designed appropriately.",
        "Avoid storing request-specific data in mutable singleton fields.",
        "Request scope does not automatically solve all concurrency problems.",
        "Session-scoped beans can also be accessed concurrently by multiple requests.",
        "Use the right concurrency strategy for genuinely shared mutable data."
      ]
    },

    {
      id: "scope-comparison",
      title: "16. Complete Scope Comparison",

      paragraphs: [
        "Use this comparison to remember which context owns an instance and when Spring creates or reuses it."
      ],

      code: {
        language: "text",
        code: `Singleton
    |
    +--> One instance per bean definition per ApplicationContext

Prototype
    |
    +--> New instance for each container request

Request
    |
    +--> One instance per HTTP request

Session
    |
    +--> One instance per HTTP session

Application
    |
    +--> One instance per ServletContext

WebSocket
    |
    +--> One instance per WebSocket session`
      },

      bullets: [
        "Singleton and prototype are general-purpose container scopes.",
        "Request, session, application, and WebSocket scopes are web-aware scopes.",
        "The default scope is singleton.",
        "Prototype creation does not imply automatic destruction management.",
        "Shorter-lived dependencies injected into longer-lived beans may need a provider or scoped proxy."
      ]
    },

    {
      id: "common-mistakes",
      title: "17. Common Bean Scope Mistakes",

      bullets: [
        "Assuming singleton means one object for the entire JVM.",
        "Assuming singleton scope automatically makes a bean thread-safe.",
        "Expecting a prototype dependency injected into a singleton to refresh on every method call.",
        "Using request or session scope in a non-web ApplicationContext.",
        "Accessing a request-scoped bean when no HTTP request is active.",
        "Assuming Spring automatically calls destruction callbacks for prototype instances after use.",
        "Storing request-specific state in a mutable singleton service.",
        "Using application scope when ordinary singleton scope would be sufficient.",
        "Assuming session-scoped fields are safe from concurrent access.",
        "Using scoped proxies without understanding that the target still requires an active scope."
      ]
    },

    {
      id: "best-practices",
      title: "18. Spring Bean Scope Best Practices",

      bullets: [
        "Use singleton scope for most stateless services and repositories.",
        "Use prototype scope when a new independently initialized object is required for each container lookup.",
        "Use request scope for short-lived data associated with an HTTP request.",
        "Use session scope only for data that genuinely belongs to an HTTP session.",
        "Use application scope only when ServletContext-level semantics are required.",
        "Use WebSocket scope for state that belongs to a WebSocket session.",
        "Use ObjectProvider when a singleton needs to obtain fresh prototype instances on demand.",
        "Use scoped proxies or an appropriate provider when a longer-lived bean needs access to a shorter-lived scoped dependency.",
        "Keep singleton services stateless wherever practical.",
        "Define explicit resource cleanup for prototype instances that own resources."
      ]
    },

    {
      id: "interview",
      title: "19. Spring Bean Scope Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is a bean scope?",
          answer:
            "A bean scope defines how Spring creates, reuses, and manages instances of a bean within the relevant container or web context."
        },
        {
          question: "What is the default Spring bean scope?",
          answer:
            "Singleton is the default scope."
        },
        {
          question: "What does singleton mean in Spring?",
          answer:
            "It normally means one instance per bean definition per ApplicationContext, not one instance globally across the entire JVM."
        },
        {
          question: "What is prototype scope?",
          answer:
            "Prototype scope creates a new bean instance whenever the bean is requested from the container."
        },
        {
          question: "What is request scope?",
          answer:
            "Request scope associates one bean instance with each HTTP request in a web-aware Spring context."
        },
        {
          question: "What is session scope?",
          answer:
            "Session scope associates one bean instance with each HTTP session."
        },
        {
          question: "What is application scope?",
          answer:
            "Application scope associates one bean instance with the ServletContext."
        },
        {
          question: "What is WebSocket scope?",
          answer:
            "WebSocket scope associates a bean instance with a WebSocket session."
        },
        {
          question: "What is the difference between singleton and prototype?",
          answer:
            "Singleton reuses the same instance within its ApplicationContext for a bean definition. Prototype normally creates a new instance for each container lookup."
        },
        {
          question: "Does singleton scope make a bean thread-safe?",
          answer:
            "No. Thread safety depends on how the bean's fields and methods handle concurrent access."
        },
        {
          question: "Does Spring destroy prototype beans automatically?",
          answer:
            "Spring manages prototype creation and initialization but does not automatically manage their complete destruction lifecycle after handing them to callers."
        },
        {
          question: "What happens when a prototype bean is injected into a singleton?",
          answer:
            "The singleton normally receives a prototype instance when the singleton is created and retains that instance. It does not automatically get a new prototype instance on every method call."
        },
        {
          question: "How can a singleton obtain a fresh prototype bean?",
          answer:
            "It can use ObjectProvider or another deliberate lookup mechanism to request a new prototype instance when needed."
        },
        {
          question: "What is a scoped proxy?",
          answer:
            "It is an intermediary object that resolves the target bean according to its active scope when a method is invoked."
        },
        {
          question: "Can a request-scoped bean be injected into a singleton?",
          answer:
            "Yes, with an appropriate scoped proxy or provider-based lookup. The request-scoped target still requires an active HTTP request."
        },
        {
          question: "Can request scope be used in a command-line application?",
          answer:
            "Not as an ordinary request-scoped bean without suitable web infrastructure and an active HTTP request."
        },
        {
          question: "What is the difference between Spring singleton and application scope?",
          answer:
            "Spring singleton scope is associated with a bean definition and ApplicationContext. Application scope is associated with a ServletContext."
        },
        {
          question: "When should prototype scope be used?",
          answer:
            "Use it when each container lookup needs a newly created object with independent state or initialization."
        },
        {
          question: "Can two HTTP requests share a session-scoped bean?",
          answer:
            "Requests belonging to the same HTTP session can use the same session-scoped target instance, so concurrent access to mutable state must be considered."
        },
        {
          question: "Which scope should be used for a stateless service?",
          answer:
            "Singleton is generally appropriate for a stateless service because the same instance can serve multiple operations without storing per-request mutable state."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "20. Quick Revision Notes",

      bullets: [
        "Default scope: singleton.",
        "Singleton: one instance per bean definition per ApplicationContext.",
        "Prototype: a new instance per container lookup.",
        "Request: one instance per HTTP request.",
        "Session: one instance per HTTP session.",
        "Application: one instance per ServletContext.",
        "WebSocket: one instance per WebSocket session.",
        "Prototype beans do not receive automatic destruction callbacks after being handed to callers.",
        "ObjectProvider can request a fresh prototype instance when needed.",
        "Scoped proxies help inject shorter-lived scoped beans into longer-lived beans.",
        "Scope does not guarantee thread safety.",
        "Stateless singleton services are a common Spring design."
      ],

      paragraphs: [
        "Interview-ready answer: Spring bean scope determines how bean instances are created and reused. Singleton is the default and normally provides one instance per bean definition per ApplicationContext. Prototype creates a new instance for each container lookup. Web-aware scopes include request, session, application, and WebSocket. When a shorter-lived bean is needed by a singleton, a scoped proxy or provider can be used. Scope selection should consider lifecycle, state, concurrency, and cleanup requirements."
      ]
    }
  ]
};
