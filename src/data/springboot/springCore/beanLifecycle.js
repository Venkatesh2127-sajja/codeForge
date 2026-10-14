
export const beanLifecycle = {
  id: "bean-lifecycle",
  title: "Spring Bean Lifecycle",
  slug: "bean-lifecycle",
  topicTitle: "Spring Core Fundamentals",
  estimatedTime: "50 min",

  description:
    "Understand the complete Spring bean lifecycle, including instantiation, dependency injection, initialization callbacks, BeanPostProcessor, destruction callbacks, bean scopes, and real-world lifecycle examples.",

  sections: [
    {
      id: "lifecycle-overview",
      title: "1. Spring Bean Lifecycle Overview",

      paragraphs: [
        "The Spring bean lifecycle describes the stages through which a Spring-managed object passes, from bean definition and object creation to initialization, normal use, and eventual destruction.",
        "Spring manages these stages through its IoC container, usually an ApplicationContext in Spring Boot applications. The container creates and configures beans according to bean definitions, injects dependencies, invokes lifecycle callbacks, and manages destruction when the relevant container or bean lifecycle ends.",
        "Understanding the lifecycle is important when initializing caches, validating configuration, opening resources, starting background tasks, releasing connections, and debugging bean initialization problems."
      ],

      code: {
        language: "text",
        code: `Bean Definition Registration
          |
          v
Bean Instantiation
          |
          v
Dependency Injection
          |
          v
Aware Callbacks
          |
          v
BeanPostProcessor
(before initialization)
          |
          v
Initialization Callbacks
@PostConstruct
InitializingBean.afterPropertiesSet()
Custom init method
          |
          v
BeanPostProcessor
(after initialization)
          |
          v
Bean Ready for Use
          |
          v
Application Context Shutdown
          |
          v
Destruction Callbacks
@PreDestroy
DisposableBean.destroy()
Custom destroy method`
      },

      bullets: [
        "Bean definition registration describes how a bean should be created.",
        "Instantiation creates the object.",
        "Dependency injection supplies required dependencies.",
        "Initialization callbacks perform setup after dependencies have been supplied.",
        "The bean becomes available for normal use after initialization and post-processing.",
        "Destruction callbacks release resources when the managed lifecycle ends."
      ]
    },

    {
      id: "bean-definition",
      title: "2. Bean Definition Registration",

      paragraphs: [
        "Before Spring creates a bean, it needs a bean definition or another registration mechanism that describes the object to manage. A bean definition can include the class, scope, dependencies, initialization method, and destruction method.",
        "Spring Boot commonly discovers components through component scanning. Classes annotated with @Component, @Service, @Repository, or @Controller can be registered as beans when they are within the component-scan scope.",
        "Beans can also be registered through @Bean methods inside configuration classes. Bean definitions are normally registered while the application context is being prepared, before ordinary singleton bean initialization is completed."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendEmail() {
        System.out.println("Email sent");
    }
}`
      },

      bullets: [
        "@Service registers a service class as a component-scanning candidate.",
        "@Component is a general-purpose component annotation.",
        "@Bean registers the object returned by a configuration method.",
        "The relevant component or configuration must be discovered by Spring."
      ]
    },

    {
      id: "bean-instantiation",
      title: "3. Bean Instantiation",

      paragraphs: [
        "Instantiation is the stage where Spring creates the bean object. For a typical class, Spring invokes an appropriate constructor, although factories, factory methods, and other creation mechanisms are also supported.",
        "At this point, the object exists, but its required dependencies and initialization work may not yet be complete. Therefore, the object should not be assumed to be ready for application use simply because its constructor has run.",
        "Constructor injection takes place as part of creating the object: Spring resolves constructor arguments before invoking the selected constructor."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Component;

@Component
public class ReportService {

    public ReportService() {
        System.out.println("ReportService constructed");
    }
}`
      },

      bullets: [
        "The constructor is executed when Spring creates the object.",
        "Constructor arguments must be resolved before that constructor can be invoked.",
        "Do not start complicated background work in a constructor.",
        "Use initialization callbacks when setup must occur after dependency injection."
      ]
    },

    {
      id: "dependency-injection",
      title: "4. Dependency Injection and Property Population",

      paragraphs: [
        "After an object is instantiated, Spring supplies dependencies that are injected through supported fields, setter methods, and other configured injection points. Constructor dependencies have already been supplied during construction.",
        "For example, an OrderService may need PaymentService. Spring resolves a suitable PaymentService bean and injects it into OrderService before the latter's initialization callbacks run.",
        "This order matters because an initialization method can safely use injected dependencies, while a constructor should not assume that field or setter injection has already happened."
      ],

      code: {
        language: "java",
        code: `import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public void processPayment() {
        System.out.println("Payment processed");
    }
}

@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
    }
}`
      },

      bullets: [
        "Spring resolves the PaymentService dependency.",
        "Constructor injection supplies it when OrderService is instantiated.",
        "For field and setter injection, those injection points are populated after instantiation.",
        "Initialization callbacks run after dependency injection has been completed."
      ]
    },

    {
      id: "aware-interfaces",
      title: "5. Aware Interfaces and Container References",

      paragraphs: [
        "Some Spring beans need access to selected infrastructure objects. Spring provides Aware interfaces for this purpose, including BeanNameAware, BeanFactoryAware, and ApplicationContextAware.",
        "When applicable, Spring invokes these callbacks after the bean has been instantiated and its dependencies have been populated, but before the initialization callbacks and the usual before-initialization post-processing sequence.",
        "Aware interfaces can be useful in framework infrastructure, but ordinary business services should usually receive the specific dependency they need instead of depending on the entire ApplicationContext."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.BeanNameAware;
import org.springframework.stereotype.Component;

@Component
public class BeanIdentityService implements BeanNameAware {

    private String beanName;

    @Override
    public void setBeanName(String name) {
        this.beanName = name;
    }

    public String getBeanName() {
        return beanName;
    }
}`
      },

      bullets: [
        "BeanNameAware provides the registered bean name.",
        "BeanFactoryAware provides access to the BeanFactory.",
        "ApplicationContextAware provides access to the ApplicationContext.",
        "Use these interfaces selectively to avoid unnecessary coupling to Spring infrastructure."
      ]
    },

    {
      id: "post-construct",
      title: "6. @PostConstruct",

      paragraphs: [
        "@PostConstruct marks a no-argument method that should run after dependency injection during bean initialization. It is commonly used for lightweight setup, validation, and initialization of data structures.",
        "In Spring Framework 6 and Spring Boot 3, import PostConstruct from jakarta.annotation.PostConstruct. Older applications based on earlier Spring versions may use the javax.annotation package.",
        "The method runs as part of initialization, before the bean is normally made available for use. If initialization fails, Spring may fail to create the bean and therefore fail to start the application context."
      ],

      code: {
        language: "java",
        code: `import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class CacheService {

    @PostConstruct
    public void initialize() {
        System.out.println("Cache initialized");
    }
}`
      },

      bullets: [
        "The method is called after dependency injection.",
        "It should generally perform setup that completes quickly.",
        "An initialization exception can cause bean creation to fail.",
        "Avoid relying on the bean being fully proxied or published to other beans from inside its own initialization callback."
      ]
    },

    {
      id: "initializing-bean",
      title: "7. InitializingBean Interface",

      paragraphs: [
        "InitializingBean is a Spring interface that defines the afterPropertiesSet() callback. Spring invokes this method after the bean's properties and dependencies have been populated.",
        "It can be used for initialization logic, but it couples the class directly to Spring. For ordinary application code, @PostConstruct or a configured custom initialization method is often less intrusive."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

@Component
public class DatabaseValidator implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        System.out.println("Validating database settings");
    }
}`
      },

      bullets: [
        "The callback method is named afterPropertiesSet().",
        "It runs during initialization after dependency population.",
        "It is part of the Spring-specific lifecycle API.",
        "Initialization should fail clearly if a required configuration or invariant is invalid."
      ]
    },

    {
      id: "custom-init-method",
      title: "8. Custom Initialization Methods",

      paragraphs: [
        "Spring also supports a custom initialization method configured through a @Bean method's initMethod attribute. This allows configuration to declare the lifecycle callback without requiring the bean class to implement a Spring lifecycle interface.",
        "For a bean configured this way, Spring invokes the custom initialization method as part of initialization after dependency injection. Do not configure multiple callbacks to perform the same setup unnecessarily."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfiguration {

    @Bean(initMethod = "initialize")
    public LocalCache localCache() {
        return new LocalCache();
    }
}

class LocalCache {

    public void initialize() {
        System.out.println("Local cache initialized");
    }
}`
      },

      bullets: [
        "@Bean(initMethod = \"initialize\") configures a custom init callback.",
        "The named method must exist and be accessible for the configured lifecycle operation.",
        "This approach is useful when the bean class should not depend on Spring lifecycle interfaces.",
        "Choose a clear initialization strategy rather than duplicating work across callbacks."
      ]
    },

    {
      id: "initialization-order",
      title: "9. Order of Initialization Callbacks",

      paragraphs: [
        "For a typical Spring-managed bean, dependency population occurs before initialization callbacks. Spring then invokes relevant Aware callbacks and BeanPostProcessor methods before initialization.",
        "A common simplified order is: dependency injection, Aware callbacks, BeanPostProcessor.postProcessBeforeInitialization(), @PostConstruct, InitializingBean.afterPropertiesSet(), configured custom init method, and BeanPostProcessor.postProcessAfterInitialization().",
        "This is a simplified view of the standard lifecycle. Infrastructure components and specialized bean types can introduce additional behavior. In particular, automatic proxy creation commonly occurs through post-processors, so code should not assume the final exposed bean reference is identical to the raw object used during initialization."
      ],

      code: {
        language: "text",
        code: `1. Instantiate the bean
2. Populate dependencies
3. Invoke applicable Aware callbacks
4. postProcessBeforeInitialization()
5. @PostConstruct
6. afterPropertiesSet()
7. Custom init method
8. postProcessAfterInitialization()
9. Expose the initialized bean for normal use`
      },

      bullets: [
        "The three common initialization callback mechanisms are @PostConstruct, InitializingBean, and a custom init method.",
        "Spring's standard annotation processing invokes @PostConstruct during the before-initialization post-processing phase.",
        "Initialization callbacks are not a substitute for a carefully designed application startup workflow.",
        "Do not assume every bean is eagerly created at the same moment; lazy initialization and bean dependencies affect timing."
      ]
    },

    {
      id: "bean-post-processor",
      title: "10. BeanPostProcessor",

      paragraphs: [
        "BeanPostProcessor is a Spring extension point that allows a bean to be inspected or modified before and after its initialization callbacks. A post-processor can return the original bean or a wrapped object.",
        "Spring uses post-processors for many framework features, including annotation processing and aspects of proxy-based behavior. For example, infrastructure can create proxy objects to support features such as declarative transactions or method-level interception.",
        "A BeanPostProcessor is infrastructure that operates on other beans. It should not be confused with the business bean's own initialization method."
      ],

      code: {
        language: "java",
        code: `import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

@Component
public class LoggingBeanPostProcessor
        implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(
            Object bean, String beanName) throws BeansException {

        System.out.println("Before initialization: " + beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(
            Object bean, String beanName) throws BeansException {

        System.out.println("After initialization: " + beanName);
        return bean;
    }
}`
      },

      bullets: [
        "postProcessBeforeInitialization() runs before the standard initialization callbacks.",
        "postProcessAfterInitialization() runs after those callbacks.",
        "A post-processor can wrap a bean or return a different object.",
        "Returning null from a post-processing callback has special consequences and should not be done accidentally.",
        "Post-processors are powerful infrastructure hooks; use them only when ordinary configuration or callbacks are insufficient."
      ]
    },

    {
      id: "bean-factory-post-processor",
      title: "11. BeanFactoryPostProcessor vs BeanPostProcessor",

      paragraphs: [
        "BeanFactoryPostProcessor and BeanPostProcessor operate at different stages and have different responsibilities.",
        "BeanFactoryPostProcessor works with bean definitions and bean factory metadata before ordinary application beans are instantiated. It can modify bean definitions or their configuration metadata.",
        "BeanPostProcessor works with bean instances. It can inspect or wrap an object around its initialization lifecycle."
      ],

      bullets: [
        "BeanFactoryPostProcessor: works with bean factory configuration and bean definitions.",
        "BeanPostProcessor: works with bean instances before and after initialization.",
        "Neither interface is a replacement for the other.",
        "Use the factory-level extension point for metadata changes and the instance-level extension point for bean processing."
      ],

      code: {
        language: "text",
        code: `ApplicationContext preparation
          |
          v
BeanFactoryPostProcessor
(modifies bean definitions)
          |
          v
Bean instantiation and dependency injection
          |
          v
BeanPostProcessor
(processes bean instances)
          |
          v
Initialization callbacks
          |
          v
BeanPostProcessor after initialization
          |
          v
Bean available for use`
      }
    },

    {
      id: "pre-destroy",
      title: "12. @PreDestroy",

      paragraphs: [
        "@PreDestroy marks a method that should run when a managed bean is being destroyed. It is commonly used to stop a resource-consuming component, close a custom resource, or release resources owned by the bean.",
        "In Spring Framework 6 and Spring Boot 3, import PreDestroy from jakarta.annotation.PreDestroy.",
        "For ordinary singleton beans, Spring normally invokes destruction callbacks when the owning application context closes cleanly. Destruction callbacks are not guaranteed after abrupt process termination, a forced kill, or a machine failure."
      ],

      code: {
        language: "java",
        code: `import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

@Component
public class CacheService {

    @PostConstruct
    public void initialize() {
        System.out.println("Cache initialized");
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("Cache cleanup");
    }
}`
      },

      bullets: [
        "@PostConstruct performs initialization.",
        "@PreDestroy performs cleanup during managed destruction.",
        "Cleanup should be safe to run once and should not depend on a fully operational application.",
        "Use resource-specific shutdown mechanisms when those resources require special handling."
      ]
    },

    {
      id: "destroy-callbacks",
      title: "13. DisposableBean and Custom Destruction Methods",

      paragraphs: [
        "Spring supports destruction through @PreDestroy, the DisposableBean interface's destroy() method, and a custom destroy method configured on a @Bean definition.",
        "When multiple mechanisms are configured for the same bean, the callbacks have a defined ordering. In a typical Spring-managed bean, @PreDestroy runs before DisposableBean.destroy(), followed by the configured custom destroy method.",
        "The DisposableBean interface couples the class to Spring. A custom destroy method or @PreDestroy is often preferable for ordinary application code."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResourceConfiguration {

    @Bean(destroyMethod = "close")
    public ManagedResource managedResource() {
        return new ManagedResource();
    }
}

class ManagedResource {

    public void use() {
        System.out.println("Resource in use");
    }

    public void close() {
        System.out.println("Resource closed");
    }
}`
      },

      bullets: [
        "@Bean(destroyMethod = \"close\") configures the custom destruction callback.",
        "The method is invoked when Spring destroys the managed bean under the applicable lifecycle conditions.",
        "Spring can infer public close() or shutdown() methods for certain @Bean definitions, but explicit configuration makes intent clear.",
        "Cleanup should release resources owned by the bean rather than shutting down resources owned by unrelated components."
      ]
    },

    {
      id: "singleton-prototype",
      title: "14. Lifecycle and Bean Scopes",

      paragraphs: [
        "Bean scope affects how many instances Spring manages and when their lifecycle begins and ends. A singleton bean is normally created once per bean definition per application context and reused by consumers.",
        "Prototype scope creates a new instance whenever Spring resolves the bean for a new request from the container. Spring manages prototype creation and initialization but does not automatically manage the complete destruction lifecycle for prototype instances after handing them to callers.",
        "If a prototype bean owns resources that require cleanup, the code obtaining the bean must take responsibility for releasing those resources, or use a suitable custom lifecycle design."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ApplicationCache {
}

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
class TemporaryReport {
}`
      },

      bullets: [
        "Singleton scope is the default Spring bean scope.",
        "A singleton bean is shared within its application context, so mutable state must be designed carefully.",
        "Prototype scope creates a new bean instance for each container lookup.",
        "Prototype beans do not receive automatic container-managed destruction callbacks after use.",
        "A singleton that injects a prototype directly generally retains the injected instance; use ObjectProvider or another scoped lookup mechanism when a fresh instance is required."
      ]
    },

    {
      id: "lazy-initialization",
      title: "15. Lazy Initialization and Lifecycle Timing",

      paragraphs: [
        "By default, singleton beans are generally initialized eagerly when an ApplicationContext is refreshed, subject to the application's configuration and bean dependencies. Eager initialization can reveal configuration errors early.",
        "@Lazy can defer creation until a bean is first requested. Lazy initialization changes when lifecycle callbacks run, so a lazy bean's @PostConstruct method may not run during initial application startup.",
        "Lazy initialization can reduce startup work, but it may also postpone the discovery of configuration or dependency problems until later in the application's execution."
      ],

      code: {
        language: "java",
        code: `import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Lazy
@Component
public class ExpensiveReportService {

    @PostConstruct
    public void initialize() {
        System.out.println("Report service initialized");
    }
}`
      },

      bullets: [
        "Eager singleton initialization usually happens during context startup.",
        "@Lazy can defer bean creation until it is requested.",
        "Lifecycle callbacks execute when the lazy bean is actually initialized.",
        "Do not use lazy initialization to hide essential startup validation failures."
      ]
    },

    {
      id: "application-context-close",
      title: "16. When Does Bean Destruction Happen?",

      paragraphs: [
        "For ordinary singleton beans, destruction callbacks are generally invoked when the owning ApplicationContext is closed cleanly. A Spring Boot application normally registers shutdown handling so that a normal JVM shutdown can close the context.",
        "In tests, closing the application context triggers its managed destruction lifecycle. When creating an AnnotationConfigApplicationContext manually, close it explicitly or use try-with-resources where appropriate.",
        "A forced termination, process crash, or operating-system failure can prevent cleanup callbacks from running. Important data must therefore be persisted reliably during normal operations rather than depending entirely on @PreDestroy."
      ],

      code: {
        language: "java",
        code: `import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class LifecycleDemo {

    public static void main(String[] args) {
        try (AnnotationConfigApplicationContext context =
                     new AnnotationConfigApplicationContext(AppConfig.class)) {

            CacheService cacheService =
                    context.getBean(CacheService.class);

            System.out.println("Application is running");
        }

        // Closing the context triggers destruction
        // callbacks for eligible managed beans.
    }
}`
      },

      bullets: [
        "Closing an ApplicationContext initiates destruction of eligible managed beans.",
        "Use try-with-resources when manually creating a closeable context.",
        "Spring Boot normally manages application context shutdown.",
        "Do not rely on destruction callbacks for critical data persistence.",
        "Abrupt termination can bypass graceful cleanup."
      ]
    },

    {
      id: "lifecycle-testing",
      title: "17. Testing Bean Lifecycle Callbacks",

      paragraphs: [
        "Lifecycle behavior can be tested by creating a Spring context, retrieving a bean, and then closing the context. This verifies both initialization and destruction behavior without requiring a running web server.",
        "The example below uses a small lifecycle bean. In a real test, assertions against a recording collaborator or an event log are more reliable than checking console output."
      ],

      code: {
        language: "java",
        code: `import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

@Component
public class LifecycleProbe {

    private boolean initialized;
    private boolean destroyed;

    @PostConstruct
    public void initialize() {
        initialized = true;
    }

    @PreDestroy
    public void cleanup() {
        destroyed = true;
    }

    public boolean isInitialized() {
        return initialized;
    }

    public boolean isDestroyed() {
        return destroyed;
    }
}`
      },

      bullets: [
        "Create the context and retrieve LifecycleProbe.",
        "Assert that isInitialized() is true after the bean has been initialized.",
        "Close the context.",
        "If the reference remains accessible, assert that isDestroyed() is true after clean context shutdown.",
        "Ensure the bean is an eligible managed singleton and that the test actually closes its context."
      ]
    },

    {
      id: "common-mistakes",
      title: "18. Common Bean Lifecycle Mistakes",

      paragraphs: [
        "Performing substantial work in a constructor can make object creation harder to reason about and can run before field or setter dependencies are injected.",
        "Starting background threads inside initialization callbacks without a clear shutdown strategy can leave tasks running during application shutdown. Prefer managed executors or framework lifecycle facilities and ensure resources are stopped appropriately.",
        "Assuming @PreDestroy always runs is unsafe because process crashes and forced termination may prevent graceful shutdown.",
        "Expecting Spring to call prototype bean destruction callbacks automatically is another common mistake. Prototype resource cleanup is the responsibility of the code that owns the instance.",
        "A BeanPostProcessor that creates or depends on other beans too early can introduce initialization-order issues. Keep infrastructure post-processors focused and understand when Spring instantiates them."
      ],

      bullets: [
        "Do not assume dependencies injected through fields are available in the constructor.",
        "Do not perform slow network calls unnecessarily during bean initialization.",
        "Do not rely on @PreDestroy for durable business operations.",
        "Do not forget cleanup for resource-owning prototype beans.",
        "Do not confuse BeanFactoryPostProcessor with BeanPostProcessor.",
        "Do not assume a raw object and its final proxy are always the same reference.",
        "Keep initialization and shutdown logic idempotent where practical."
      ]
    },

    {
      id: "best-practices",
      title: "19. Spring Bean Lifecycle Best Practices",

      bullets: [
        "Use constructor injection for mandatory dependencies.",
        "Use @PostConstruct for lightweight setup that requires injected dependencies.",
        "Validate required configuration early and fail clearly when it is invalid.",
        "Keep lifecycle callbacks short and avoid unnecessary remote calls during startup.",
        "Use managed executors and define a clear shutdown policy for background work.",
        "Use @PreDestroy or an appropriate destruction method to release resources owned by the bean.",
        "Remember that prototype beans do not receive automatic destruction callbacks after being handed to callers.",
        "Use BeanPostProcessor only when bean-instance processing or wrapping is genuinely needed.",
        "Test both initialization and graceful shutdown for resource-owning components.",
        "Never assume cleanup callbacks execute after abrupt process termination."
      ]
    },

    {
      id: "interview",
      title: "20. Spring Bean Lifecycle Interview Questions and Answers",

      interviewQuestions: [
        {
          question: "What is the Spring bean lifecycle?",
          answer:
            "It is the sequence of stages a Spring-managed bean passes through, including definition registration, instantiation, dependency injection, initialization, normal use, and destruction."
        },
        {
          question: "What are the major stages of a Spring bean lifecycle?",
          answer:
            "The simplified stages are bean definition registration, instantiation, dependency population, applicable Aware callbacks, before-initialization processing, initialization callbacks, after-initialization processing, normal use, and destruction."
        },
        {
          question: "What is @PostConstruct?",
          answer:
            "It marks an initialization method that Spring invokes after dependency injection during bean initialization."
        },
        {
          question: "What is @PreDestroy?",
          answer:
            "It marks a cleanup method that Spring invokes during managed bean destruction when the lifecycle conditions permit it."
        },
        {
          question: "What is BeanPostProcessor?",
          answer:
            "It is a Spring extension point that processes bean instances before and after their initialization callbacks and can return a wrapped instance."
        },
        {
          question: "What is the difference between BeanFactoryPostProcessor and BeanPostProcessor?",
          answer:
            "BeanFactoryPostProcessor works with bean factory configuration and bean definitions, while BeanPostProcessor works with bean instances."
        },
        {
          question: "What is InitializingBean?",
          answer:
            "It is a Spring interface that defines afterPropertiesSet(), a callback invoked during bean initialization after property population."
        },
        {
          question: "What is DisposableBean?",
          answer:
            "It is a Spring interface that defines destroy(), a callback used during managed destruction."
        },
        {
          question: "What is a custom init method?",
          answer:
            "It is an application-defined method configured as an initialization callback, for example through @Bean(initMethod = \"initialize\")."
        },
        {
          question: "What is a custom destroy method?",
          answer:
            "It is an application-defined cleanup method configured for a bean, for example through @Bean(destroyMethod = \"close\")."
        },
        {
          question: "What is the order of initialization callbacks?",
          answer:
            "In the common lifecycle, applicable Aware callbacks and before-initialization processing occur before @PostConstruct, then afterPropertiesSet(), then a configured custom init method, followed by after-initialization post-processing."
        },
        {
          question: "What is the typical order of destruction callbacks?",
          answer:
            "For a bean using all three mechanisms, @PreDestroy runs before DisposableBean.destroy(), followed by a configured custom destroy method."
        },
        {
          question: "When is @PostConstruct executed?",
          answer:
            "It is executed during bean initialization after the relevant dependencies have been populated."
        },
        {
          question: "When is @PreDestroy executed?",
          answer:
            "It is executed during managed bean destruction, commonly when an ApplicationContext closes cleanly."
        },
        {
          question: "Does Spring call @PreDestroy for prototype beans automatically?",
          answer:
            "No. Spring manages prototype creation and initialization but does not automatically manage their complete destruction lifecycle after handing instances to callers."
        },
        {
          question: "What happens if @PostConstruct throws an exception?",
          answer:
            "Bean initialization fails, and the application context may fail to start if the bean is required for startup."
        },
        {
          question: "Does @Lazy change lifecycle timing?",
          answer:
            "Yes. A lazy bean may be initialized only when first requested, so its initialization callbacks may run after application startup."
        },
        {
          question: "What happens when the Spring ApplicationContext closes?",
          answer:
            "Spring initiates destruction of eligible managed beans and invokes their configured cleanup callbacks."
        },
        {
          question: "Are @PreDestroy callbacks guaranteed to run?",
          answer:
            "No. Graceful context shutdown normally invokes them, but abrupt termination, forced process kills, or machine failures can prevent cleanup."
        },
        {
          question: "What are Aware interfaces?",
          answer:
            "They allow a bean to receive selected Spring infrastructure references or metadata, such as its bean name or the ApplicationContext."
        },
        {
          question: "Why should heavy work be avoided in @PostConstruct?",
          answer:
            "Slow initialization can delay application startup and make failures harder to recover from. Heavy work should be designed with appropriate startup orchestration and error handling."
        },
        {
          question: "How do you test the Spring bean lifecycle?",
          answer:
            "Create or load a Spring ApplicationContext, verify the bean's initialized state, close the context, and verify cleanup using assertions or a recording collaborator."
        }
      ]
    },

    {
      id: "quick-revision",
      title: "21. Quick Revision Notes",

      bullets: [
        "Instantiation: Spring creates the bean object.",
        "Dependency injection: Spring supplies required dependencies.",
        "@PostConstruct: initialization callback after dependency injection.",
        "InitializingBean.afterPropertiesSet(): Spring-specific initialization callback.",
        "Custom init method: application-defined initialization callback.",
        "BeanPostProcessor: processes bean instances before and after initialization.",
        "@PreDestroy: cleanup callback during managed destruction.",
        "DisposableBean.destroy(): Spring-specific destruction callback.",
        "Custom destroy method: application-defined cleanup callback.",
        "BeanFactoryPostProcessor modifies bean factory configuration or bean definitions.",
        "BeanPostProcessor works with bean instances.",
        "Prototype beans do not receive automatic destruction callbacks after being handed to callers.",
        "A clean ApplicationContext shutdown normally triggers eligible singleton destruction callbacks."
      ],

      paragraphs: [
        "Interview-ready answer: The Spring bean lifecycle begins with bean definition registration and instantiation, followed by dependency injection and applicable Aware callbacks. Spring then runs before-initialization post-processors, initialization callbacks such as @PostConstruct and afterPropertiesSet(), and after-initialization post-processors. The bean is then available for normal use. During managed shutdown, eligible beans receive destruction callbacks such as @PreDestroy. BeanPostProcessor is an important extension point because it can inspect or wrap beans around initialization."
      ]
    }
  ]
};
