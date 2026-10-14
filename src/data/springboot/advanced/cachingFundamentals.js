
export const cachingFundamentals = {
  id: 1503,
  title: "Caching Fundamentals",
  slug: "caching-fundamentals",
  topicTitle: "Spring Boot Advanced",
  description:
    "Understand cache hits, cache misses, eviction, expiration, cache strategies, consistency, and how caching improves Spring Boot application performance.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "what-is-caching",
      title: "1. What Is Caching?",
      paragraphs: [
        "Caching is a performance optimization technique that stores the result of an expensive operation so that a later request can reuse it instead of repeating the work. The stored result is called a cache entry, and the information used to locate it is called a cache key.",
        "An expensive operation may involve querying MySQL, calling a remote REST API, calculating a report, or reading configuration from another service. When the same information is requested repeatedly, a cache can avoid unnecessary work.",
        "For example, a CodeForge course page may be requested thousands of times while its lesson content changes only occasionally. Instead of loading the same content from the database for every request, the application can reuse a cached result.",
        "A cache is usually not the authoritative source of business data. The database or another durable system remains the source of truth, while the cache stores a reusable copy that may need to be refreshed or invalidated."
      ],
      bullets: [
        "Cache: temporary storage for reusable results.",
        "Cache key: identifies a cached entry, such as product:101.",
        "Cache value: the data stored under that key.",
        "Cache hit: the requested value is available in the cache.",
        "Cache miss: the value is unavailable, so the application performs the underlying operation.",
        "Cache invalidation: removes or marks an entry as no longer valid.",
        "Cache expiration: makes an entry unavailable after a configured duration."
      ]
    },
    {
      id: "why-caching-is-needed",
      title: "2. Why Do Applications Need Caching?",
      paragraphs: [
        "Without caching, a typical Spring Boot request may execute a database query every time a user opens a page. Under heavy traffic, repeated queries consume database connections, CPU, memory, and disk I/O.",
        "Caching can reduce repeated database work and external API calls. It may also reduce response latency because reading an in-memory value is often much faster than accessing a remote database or service.",
        "Consider a product endpoint that receives 1,000 requests per minute for the same product. Without caching, the application might execute 1,000 database reads. With a warm cache, many of those requests can reuse one cached value, depending on the cache policy and update frequency.",
        "Caching does not automatically make every application faster. If the data changes constantly, requests rarely repeat, or cache lookup and maintenance costs exceed the savings, caching may provide little benefit."
      ],
      bullets: [
        "Reduce repeated database queries.",
        "Reduce requests to external services.",
        "Improve response latency for repeated reads.",
        "Reduce load on shared infrastructure.",
        "Increase throughput when the original data source is a bottleneck.",
        "Measure performance before and after introducing a cache."
      ]
    },
    {
      id: "how-caching-works",
      title: "3. How Does Caching Work?",
      paragraphs: [
        "A common caching flow is called cache-aside, or lazy loading. The application first checks the cache. If the requested value exists and is valid, it returns that value. If the value is missing, the application loads it from the source of truth, stores it in the cache, and returns it.",
        "On the first request for product 101, the cache may not contain the product. The application queries MySQL, receives the product, and caches the result. A later request for product 101 can return the cached value without executing the same database query.",
        "The cache lookup and the database operation are separate steps. Concurrent requests can sometimes miss the cache simultaneously and perform duplicate database reads. This is known as a cache stampede or, in some situations, a thundering herd problem."
      ],
      bullets: [
        "Step 1: Receive a request.",
        "Step 2: Build the cache key.",
        "Step 3: Look up the value in the cache.",
        "Step 4: Return the cached value on a hit.",
        "Step 5: On a miss, load the value from the database or another source.",
        "Step 6: Store the result in the cache according to the policy.",
        "Step 7: Return the result to the caller."
      ],
      code: {
        language: "java",
        code: "public Product getProduct(Long id) {\n    Product cached = cache.get(id);\n\n    if (cached != null) {\n        return cached;\n    }\n\n    Product product = productRepository.findById(id)\n        .orElseThrow(() -> new RuntimeException(\"Product not found\"));\n\n    cache.put(id, product);\n    return product;\n}"
      }
    },
    {
      id: "cache-hit-and-miss",
      title: "4. Cache Hit vs Cache Miss",
      paragraphs: [
        "A cache hit occurs when the requested key has a usable value in the cache. The application can return the cached value without repeating the expensive operation.",
        "A cache miss occurs when the key is absent, the entry has expired, the entry has been evicted, or the requested value is otherwise unavailable. The application must then load or calculate the value.",
        "The cache hit ratio measures how often lookups succeed. It is commonly calculated as cache hits divided by total cache lookups. A high hit ratio can indicate effective reuse, but it does not guarantee correctness or a worthwhile performance improvement.",
        "For example, 900 hits out of 1,000 lookups produce a 90% hit ratio. This metric should be considered alongside latency, memory usage, database load, and the cost of refreshing cached data."
      ],
      bullets: [
        "Hit ratio = cache hits / total cache lookups.",
        "Miss ratio = cache misses / total cache lookups.",
        "Cold cache: a cache that has few or no useful entries.",
        "Warm cache: a cache containing entries frequently requested by the application.",
        "A miss is not necessarily a failure; loading the original data is the normal fallback.",
        "A high hit ratio is useful only if the cached values remain sufficiently fresh."
      ]
    },
    {
      id: "cache-eviction-and-expiration",
      title: "5. Cache Eviction vs Expiration",
      paragraphs: [
        "Eviction is the removal of an entry from a cache. A provider may evict entries because the cache has reached a memory limit, because an entry is rarely used, or because an application explicitly removes it.",
        "Expiration means that an entry is no longer considered valid after a configured time or under another expiration rule. For example, a product category list might expire after five minutes.",
        "Expiration and eviction are related but different. An entry can be evicted before its expiration time because of memory pressure. An expired entry may be removed immediately or only when the provider next checks it.",
        "TTL means time to live. A TTL of five minutes limits how long an entry remains eligible for reuse, subject to the provider's implementation. TTL alone does not guarantee that a value cannot become stale before that period ends."
      ],
      bullets: [
        "Explicit eviction: application code removes a particular key.",
        "Time-based expiration: an entry becomes invalid after a duration.",
        "Size-based eviction: entries are removed to respect a capacity limit.",
        "LRU: least recently used entries are selected for eviction by an LRU policy.",
        "LFU: least frequently used entries are selected by an LFU policy.",
        "Provider-specific behavior determines the actual eviction algorithm and cleanup timing."
      ],
      code: {
        language: "java",
        code: "// Conceptual cache operations\ncache.put(\"product:101\", product);\nProduct value = cache.get(\"product:101\");\ncache.remove(\"product:101\");\n\n// Example TTL policy: expire an entry after five minutes.\n// The exact configuration depends on the cache provider."
      }
    },
    {
      id: "cache-consistency-and-stale-data",
      title: "6. Cache Consistency and Stale Data",
      paragraphs: [
        "Cached data can become stale when the source of truth changes but the cached copy is not refreshed or invalidated. For example, if a product price changes in MySQL from 500 to 600 while the cache still contains 500, users may temporarily see the old price.",
        "A common cache-aside update pattern is to update the database first and then invalidate the corresponding cache entry. The next read loads the latest committed value and repopulates the cache.",
        "Updating the cache before the database can create problems if the database transaction fails. Even when the database is updated first, a process failure between the database commit and cache invalidation can leave stale data behind. The application must choose a strategy based on its consistency requirements.",
        "For some data, a short period of staleness is acceptable. For inventory reservations, financial balances, permissions, and other critical decisions, the database or an authoritative transactional service should enforce the business rules rather than trusting a potentially stale cached copy."
      ],
      bullets: [
        "Define how writes affect cached entries.",
        "Invalidate only the keys affected by a change when practical.",
        "Use TTL as a safety net, not as a complete consistency strategy.",
        "Use versioning, event-based invalidation, or refresh strategies when appropriate.",
        "Do not use cached values as the sole authority for critical transactional decisions.",
        "Document the maximum acceptable staleness for important data."
      ]
    },
    {
      id: "cache-aside-write-through-write-behind",
      title: "7. Common Caching Strategies",
      paragraphs: [
        "Cache-aside: the application checks the cache, loads missing data from the source, and populates the cache. The application typically invalidates the cache after writes. This is a common strategy for read-heavy Spring Boot applications.",
        "Read-through: the application asks the cache for a value, and the cache provider or configured loader retrieves missing values from the source. The cache abstraction handles loading according to the provider's capabilities.",
        "Write-through: a write is sent through a caching layer that updates the cache and the backing store as part of the configured write operation. The exact consistency guarantees depend on the implementation.",
        "Write-behind, also called write-back: changes are first recorded in the cache and propagated to the backing store later. This can improve write performance but introduces durability and recovery risks if pending writes are lost.",
        "No single strategy is best for every application. Cache-aside is often easier to introduce into an existing Spring Boot service, while write-through and write-behind require more deliberate coordination with the backing store."
      ],
      bullets: [
        "Cache-aside: application manages cache lookup, loading, and invalidation.",
        "Read-through: cache layer loads missing values.",
        "Write-through: cache and backing store are updated through a coordinated write path.",
        "Write-behind: backing-store updates are deferred and require reliable recovery.",
        "Choose based on freshness requirements, read/write patterns, and failure behavior."
      ]
    },
    {
      id: "cache-keys-and-data-isolation",
      title: "8. Cache Keys and Data Isolation",
      paragraphs: [
        "A cache key must uniquely identify the result being requested. If the result depends only on a product ID, product:101 may be sufficient. If it also depends on locale, tenant, currency, or user permissions, those dimensions may need to be included in the key.",
        "For example, caching a user-specific dashboard only under dashboard may accidentally return one user's data to another user. A safer key might include a user identifier and tenant identifier, provided access control is still enforced independently.",
        "Poor key design causes incorrect cache reuse, low hit rates, or security issues. Keys should be predictable, bounded in size, and consistent across all operations that read, update, or invalidate the entry."
      ],
      bullets: [
        "Include every input that changes the result.",
        "Include tenant or user scope when the data is scoped to that identity.",
        "Consider locale, currency, filters, sorting, and pagination.",
        "Do not treat a cache key as an authorization mechanism.",
        "Avoid putting passwords, access tokens, or unnecessary personal data in cache keys.",
        "Use a consistent key naming convention such as product:101 or catalog:en-IN."
      ],
      code: {
        language: "java",
        code: "String productKey = \"product:\" + productId;\nString catalogKey = \"catalog:\" + locale;\nString dashboardKey = \"dashboard:\" + tenantId + \":\" + userId;"
      }
    },
    {
      id: "spring-boot-caching-overview",
      title: "9. Caching in Spring Boot",
      paragraphs: [
        "Spring Boot supports declarative caching through Spring's cache abstraction. Instead of manually writing cache lookup logic in every service method, developers can use annotations such as @Cacheable, @CachePut, and @CacheEvict.",
        "The cache abstraction separates application code from the cache provider. Depending on the dependencies and configuration, a Spring application can use providers such as Caffeine, Redis, or a simple in-memory concurrent map cache.",
        "The abstraction does not make every provider behave identically. Features such as TTL, distributed storage, serialization, maximum size, and eviction policy depend on the chosen provider and its configuration.",
        "Caching annotations commonly use Spring AOP proxies. Calls made through the Spring-managed proxy are intercepted; direct self-invocation within the same object generally bypasses the caching advice."
      ],
      bullets: [
        "@EnableCaching: enables Spring's annotation-driven cache support.",
        "@Cacheable: checks the cache and stores the result after a successful cache miss.",
        "@CachePut: executes the method and updates the cache with its result.",
        "@CacheEvict: removes entries from a cache.",
        "CacheManager: provides access to configured caches.",
        "Cache provider: implements the underlying storage and provider-specific policies."
      ],
      code: {
        language: "java",
        code: "import org.springframework.cache.annotation.EnableCaching;\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\n@EnableCaching\npublic class CodeForgeApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(CodeForgeApplication.class, args);\n    }\n}"
      }
    },
    {
      id: "cacheable-annotation",
      title: "10. Using @Cacheable",
      paragraphs: [
        "@Cacheable is used when a method's result can be reused for the same cache key. Spring checks the configured cache before invoking the method. If a matching entry exists, the cached result is returned. Otherwise, the method executes and its successful result is stored.",
        "For example, a product service can cache the result of findProductById. Repeated calls with the same product ID can avoid repeated repository queries while the cache entry remains valid.",
        "By default, Spring derives a key from the method arguments. Explicit key expressions can make the intention clearer and help avoid collisions when a cache contains results from different operations.",
        "A missing product represented by an exception is not normally cached as a successful method result. Caching null values, exceptions, or negative lookup results requires deliberate configuration and provider-specific consideration."
      ],
      bullets: [
        "Use @Cacheable for repeatable read operations.",
        "Specify a cache name and a suitable key.",
        "Ensure method arguments contain all information that affects the result.",
        "Do not cache results that must always be recalculated unless the consistency model permits it.",
        "Remember that cache annotations normally require calls through the Spring proxy."
      ],
      code: {
        language: "java",
        code: "import org.springframework.cache.annotation.Cacheable;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class ProductService {\n    private final ProductRepository productRepository;\n\n    public ProductService(ProductRepository productRepository) {\n        this.productRepository = productRepository;\n    }\n\n    @Cacheable(cacheNames = \"products\", key = \"#id\")\n    public Product findProductById(Long id) {\n        return productRepository.findById(id)\n            .orElseThrow(() -> new IllegalArgumentException(\"Product not found: \" + id));\n    }\n}"
      }
    },
    {
      id: "cacheput-and-cacheevict",
      title: "11. Using @CachePut and @CacheEvict",
      paragraphs: [
        "@CachePut always invokes the annotated method and stores its returned value in the cache. It is useful when an update operation should refresh a cached representation. Unlike @Cacheable, it does not skip method execution just because a cache entry already exists.",
        "@CacheEvict removes one or more cached entries. It is useful after updating or deleting data so that later reads can load the latest state from the source of truth.",
        "Use the same cache name and compatible key expressions across read, update, and delete operations. A key mismatch can leave the old entry untouched, causing stale results.",
        "The ordering of database commits and cache operations matters. An annotation alone does not create an atomic transaction across MySQL and a separate Redis cache. Design for failure cases and use TTL or a reliable invalidation mechanism as a safety net."
      ],
      bullets: [
        "@CachePut: always runs the method and updates the cache with the result.",
        "@CacheEvict: removes the specified entry after the method succeeds by default.",
        "allEntries = true: evicts every entry in the named cache.",
        "beforeInvocation = true: evicts before method execution, even if the method fails.",
        "Choose beforeInvocation carefully because a failed update may still remove the cached entry."
      ],
      code: {
        language: "java",
        code: "import org.springframework.cache.annotation.CacheEvict;\nimport org.springframework.cache.annotation.CachePut;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class ProductCommandService {\n    private final ProductRepository productRepository;\n\n    public ProductCommandService(ProductRepository productRepository) {\n        this.productRepository = productRepository;\n    }\n\n    @CachePut(cacheNames = \"products\", key = \"#result.id\")\n    public Product updateProduct(Product product) {\n        return productRepository.save(product);\n    }\n\n    @CacheEvict(cacheNames = \"products\", key = \"#id\")\n    public void deleteProduct(Long id) {\n        productRepository.deleteById(id);\n    }\n}"
      }
    },
    {
      id: "cache-conditions-and-spel",
      title: "12. Cache Conditions and Key Expressions",
      paragraphs: [
        "Spring caching annotations support expressions through Spring Expression Language, commonly called SpEL. These expressions can reference method arguments, the returned result, and other supported context variables.",
        "The key attribute controls which cache entry is read or written. The condition attribute determines whether caching applies before method execution. The unless attribute can prevent a successful result from being stored after the method has executed.",
        "For example, a service may cache products only when the ID is positive or skip caching results that are too large. Use conditions that are easy to understand and avoid expressions that depend on hidden or unstable state."
      ],
      bullets: [
        "key = \"#id\": use the method argument named id.",
        "key = \"#p0\": refer to the first method argument by position.",
        "condition = \"#id > 0\": evaluate whether caching should apply.",
        "unless = \"#result == null\": avoid storing a null result when supported by the cache configuration.",
        "Keep expressions simple, test them, and ensure cache keys match invalidation keys."
      ],
      code: {
        language: "java",
        code: "@Cacheable(\n    cacheNames = \"products\",\n    key = \"#id\",\n    condition = \"#id != null && #id > 0\",\n    unless = \"#result == null\"\n)\npublic Product findProductById(Long id) {\n    return productRepository.findById(id).orElse(null);\n}"
      }
    },
    {
      id: "local-vs-distributed-cache",
      title: "13. Local Cache vs Distributed Cache",
      paragraphs: [
        "A local cache lives inside one application process. An in-memory cache such as Caffeine is often fast and simple to operate, but each application instance maintains its own entries.",
        "A distributed cache, such as Redis, is accessed by multiple application instances through a shared cache service. It can improve reuse across instances, but introduces network latency, serialization, deployment dependencies, and additional failure modes.",
        "Suppose CodeForge runs three Spring Boot instances behind a load balancer. If each instance has its own local cache, a product update on one instance may not immediately invalidate the corresponding entries on the other instances. A shared Redis cache can provide a common cache location, but consistency and invalidation still need to be designed.",
        "Some systems use both local and distributed caches. This can reduce network calls, but introduces another consistency layer because the local copies must be kept reasonably fresh."
      ],
      bullets: [
        "Local cache: low latency, process-local, separately populated per instance.",
        "Distributed cache: shared across instances, network-dependent, separately operated.",
        "Caffeine: common choice for high-performance local caching.",
        "Redis: common choice for shared cache storage.",
        "A distributed cache is not automatically durable or transactionally consistent with the database.",
        "Choose based on deployment topology, latency, consistency, and operational requirements."
      ]
    },
    {
      id: "ttl-and-cache-provider",
      title: "14. TTL, Memory Limits, and Cache Provider Configuration",
      paragraphs: [
        "Cache configuration should define how long entries may remain usable and how much memory the cache can consume. A cache without a capacity policy can grow unexpectedly, while a TTL that is too short can cause frequent misses and additional database load.",
        "For local caching, Caffeine supports policies such as maximum size and expiration after access or write. The exact configuration depends on the dependency version and how the cache manager is created.",
        "For Redis, TTL can be configured for keys or through the cache manager's entry expiration settings. Redis key expiration is separate from Spring's @Cacheable annotation, so the provider configuration must be understood and tested.",
        "There is no universal TTL. Product descriptions might tolerate several minutes of staleness, while frequently changing inventory or account information may need a different strategy. Set policies based on measured access patterns and business requirements."
      ],
      bullets: [
        "Choose a provider intentionally rather than assuming all caches support the same features.",
        "Set a capacity limit for local caches where appropriate.",
        "Set TTL according to freshness requirements and update frequency.",
        "Monitor cache size, evictions, hit ratio, and backend load.",
        "Test expiration and invalidation behavior using the actual provider.",
        "Avoid using an arbitrary long TTL as a substitute for a consistency design."
      ]
    },
    {
      id: "cache-stampede-and-concurrency",
      title: "15. Cache Stampede and Concurrent Requests",
      paragraphs: [
        "A cache stampede occurs when many requests attempt to load the same missing or expired value at nearly the same time. Each request may query the database, causing a sudden spike in load exactly when the cache should be helping.",
        "Possible mitigations include per-key request coalescing, synchronized loading where supported, staggered expiration, background refresh, and short-lived negative caching when it is safe. The right approach depends on the provider and the application's traffic patterns.",
        "Concurrent writes can also create races. One request might read an old database value while another request updates the database and invalidates the cache. The first request may then write stale data back into the cache. Stronger designs can use version checks, coordinated updates, or provider-specific synchronization where the business requires it.",
        "Do not assume that a cache annotation guarantees only one database load across all threads or application instances. Verify the behavior of the selected provider and design for concurrent access."
      ],
      bullets: [
        "Use single-flight or synchronized loading when appropriate.",
        "Consider jittered TTLs to reduce synchronized expiration across many keys.",
        "Use background refresh for data that benefits from proactive refresh.",
        "Use negative caching only with a deliberate short lifetime and invalidation strategy.",
        "Make update operations safe under concurrent requests.",
        "Test cache behavior under load rather than only with sequential unit tests."
      ]
    },
    {
      id: "cache-failure-and-fallback",
      title: "16. Cache Failure and Fallback Behavior",
      paragraphs: [
        "A cache is an optimization, but its failure can still affect an application. If a Redis server becomes unavailable, a cache operation may throw an exception and prevent a request from reaching the database unless failure behavior is designed appropriately.",
        "Whether the application should bypass a failed cache depends on the system. Falling back to MySQL may preserve functionality, but can create a database traffic spike if many requests bypass the cache simultaneously.",
        "Define timeout, fallback, alerting, and load-shedding behavior for cache failures. A fallback must not silently hide persistent infrastructure problems, and the application should not return fabricated business data merely because a cache is unavailable.",
        "Test cache failure explicitly. A robust system should have a documented behavior for cache timeouts, Redis outages, serialization errors, and sudden loss of cached entries."
      ],
      "bullets": [
        "Define whether cache failure should fail the request or fall back to the source.",
        "Set reasonable network timeouts for remote cache operations.",
        "Protect the database from sudden fallback traffic.",
        "Monitor cache exceptions and provider connectivity.",
        "Do not confuse a cache outage with a database outage.",
        "Validate recovery behavior after the cache becomes available again."
      ]
    },
    {
      id: "cache-security",
      title: "17. Security and Sensitive Data",
      paragraphs: [
        "Caching can create security problems when entries are shared across users or tenants incorrectly. A user-specific result must not be stored under a key that another user can reuse.",
        "Authorization must be checked independently of cache lookup. Possession of a cache key must never grant access to a resource, and cached responses must not bypass required permission checks.",
        "Consider what happens when a user's role, permissions, account status, or tenant membership changes. Cached authorization-sensitive data may need prompt invalidation or a design that performs critical authorization checks against an authoritative source.",
        "Avoid storing secrets or unnecessary sensitive information in cache keys and values. Apply appropriate access controls, network protection, retention policies, and serialization safeguards to the chosen provider."
      ],
      "bullets": [
        "Include the appropriate tenant and user scope in cache keys.",
        "Perform authorization checks even when the requested data is cached.",
        "Invalidate permission-sensitive entries when access changes.",
        "Protect shared cache infrastructure with authentication and network controls.",
        "Minimize sensitive data stored in cache values.",
        "Never treat cache contents as trusted authorization evidence."
      ]
    },
    {
      id: "cache-monitoring-and-testing",
      title: "18. Cache Monitoring and Testing",
      paragraphs: [
        "Caching should be measured in production-like conditions. Useful metrics include hit and miss counts, hit ratio, evictions, entry count, memory usage, load time, backend query volume, cache errors, and endpoint latency.",
        "A high hit ratio is not sufficient on its own. The application might have high latency from serialization, network calls, large values, lock contention, or an overloaded source of truth after a burst of misses.",
        "Test that the underlying method is skipped on a cache hit, executed on a miss, and executed again after invalidation or expiration. Also test update and delete flows, cache key separation, concurrent requests, and provider failures.",
        "Spring Boot Actuator and Micrometer can help expose application and cache-related metrics, depending on the provider and configuration. Avoid exposing sensitive cache keys or user data in logs and metric labels."
      ],
      bullets: [
        "Measure hit ratio together with latency and backend load.",
        "Test hits, misses, updates, eviction, and expiration.",
        "Verify behavior for different keys and different users.",
        "Test concurrency and provider failure paths.",
        "Use metrics and logs without exposing sensitive values.",
        "Compare performance before and after introducing caching."
      ],
      code: {
        language: "java",
        code: "import static org.mockito.Mockito.times;\nimport static org.mockito.Mockito.verify;\nimport static org.mockito.Mockito.when;\n\nimport java.util.Optional;\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.context.SpringBootTest;\nimport org.springframework.cache.CacheManager;\n\n@SpringBootTest\nclass ProductCacheIntegrationTest {\n    @Autowired\n    private ProductService productService;\n\n    @Autowired\n    private CacheManager cacheManager;\n\n    @Test\n    void cachedResultCanBeReused() {\n        cacheManager.getCache(\"products\").clear();\n\n        Product first = productService.findProductById(101L);\n        Product second = productService.findProductById(101L);\n\n        // Assert that both calls return the expected product.\n        // Verify repository invocation count with a test spy or mock\n        // when the test configuration provides one.\n    }\n}"
      }
    },
    {
      id: "common-caching-mistakes",
      title: "19. Common Caching Mistakes",
      paragraphs: [
        "A cache can make an incorrect design faster without making it correct. Many caching bugs result from stale entries, incomplete keys, missing invalidation, or assumptions about provider behavior.",
        "A common Spring mistake is calling an @Cacheable method from another method within the same object. That self-invocation typically bypasses the Spring proxy, so the cache advice does not run.",
        "Another mistake is caching mutable entities with lazy-loaded relationships. The cached object may outlive the persistence context, contain stale state, or behave unexpectedly when serialized. Consider caching stable DTOs or purpose-built read models instead.",
        "Avoid caching every method without measuring the workload. Unnecessary caches increase memory consumption and make updates, testing, and incident diagnosis more complicated."
      ],
      bullets: [
        "Do not forget to invalidate cached values after relevant writes.",
        "Do not use incomplete or user-unsafe cache keys.",
        "Do not assume @Cacheable works on self-invocation.",
        "Do not cache large or highly variable objects without a memory plan.",
        "Do not assume a local cache is shared across application instances.",
        "Do not assume TTL guarantees perfectly fresh data.",
        "Do not cache every query without measuring the benefit."
      ]
    },
    {
      id: "caching-best-practices",
      title: "20. Caching Best Practices",
      paragraphs: [
        "Start with a measured bottleneck, such as a frequently repeated database query or a slow external service. Identify the data's freshness requirements before selecting a cache strategy.",
        "Design cache keys and invalidation rules together. If a write changes the value represented by a key, define how that key will be updated or removed and what happens if invalidation fails.",
        "Use a cache provider with appropriate capacity, expiration, and observability features. Keep cached values reasonably small, prefer stable read models, and avoid sharing entries across incompatible security contexts.",
        "Roll out caching gradually and compare response latency, database load, memory use, and error rates. Document cache failure behavior so that an outage does not unexpectedly overload the database."
      ],
      bullets: [
        "Measure first and cache a specific bottleneck.",
        "Document freshness and consistency requirements.",
        "Use stable, complete cache keys.",
        "Keep read, update, and invalidation behavior aligned.",
        "Set capacity and TTL policies intentionally.",
        "Test provider failures and concurrent requests.",
        "Monitor both cache metrics and end-to-end application performance."
      ]
    },
    {
      id: "interview",
      title: "21. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is caching?",
          answer: "Caching stores reusable results so repeated requests can avoid expensive operations such as database queries, calculations, or remote service calls."
        },
        {
          question: "What is a cache hit?",
          answer: "A cache hit occurs when a requested key has a usable cached value, allowing the application to return it without repeating the underlying operation."
        },
        {
          question: "What is a cache miss?",
          answer: "A cache miss occurs when the requested entry is unavailable, so the application must load or calculate the value from its source."
        },
        {
          question: "What is cache invalidation?",
          answer: "Cache invalidation removes or marks cached data as unusable when the underlying information changes or is no longer valid."
        },
        {
          question: "What is TTL?",
          answer: "TTL stands for time to live. It defines how long a cache entry may remain eligible for reuse before it expires, according to the provider's policy."
        },
        {
          question: "What is the difference between eviction and expiration?",
          answer: "Expiration makes an entry invalid according to a time or expiration rule. Eviction is the removal of an entry, which may occur because of expiration, memory pressure, or an explicit operation."
        },
        {
          question: "What is a cache hit ratio?",
          answer: "It is the number of cache hits divided by total cache lookups. It helps evaluate reuse, but should be considered alongside latency, backend load, and freshness."
        },
        {
          question: "What is cache-aside?",
          answer: "In cache-aside, the application checks the cache first. On a miss, it loads data from the source, stores the result in the cache, and returns it."
        },
        {
          question: "What is the difference between cache-aside and write-through?",
          answer: "Cache-aside makes the application manage cache reads and invalidation around the source of truth. Write-through coordinates cache and backing-store updates through a configured write path."
        },
        {
          question: "What is write-behind caching?",
          answer: "Write-behind records changes in the cache and propagates them to the backing store later. It can improve write performance but requires reliable persistence, retry, and recovery behavior."
        },
        {
          question: "Why can caching cause stale data?",
          answer: "The source of truth may change while the cached copy remains unchanged. Invalidation, refresh, TTL, and coordinated update strategies reduce this risk."
        },
        {
          question: "What is a cache stampede?",
          answer: "A cache stampede occurs when many concurrent requests attempt to load the same missing or expired entry, creating a burst of expensive backend operations."
        },
        {
          question: "What is the difference between a local cache and a distributed cache?",
          answer: "A local cache resides in one application process and is usually very fast. A distributed cache is shared through a service such as Redis, allowing multiple application instances to reuse entries."
        },
        {
          question: "What is Spring's cache abstraction?",
          answer: "It is a common API that lets Spring applications use caching annotations and cache managers without tying business code directly to one provider."
        },
        {
          question: "What does @EnableCaching do?",
          answer: "It enables Spring's annotation-driven cache infrastructure so annotations such as @Cacheable, @CachePut, and @CacheEvict can be processed."
        },
        {
          question: "What does @Cacheable do?",
          answer: "It checks the configured cache before invoking the method. On a miss, the method executes and its successful result is cached according to the configured rules."
        },
        {
          question: "What is the difference between @Cacheable and @CachePut?",
          answer: "@Cacheable can skip method execution on a cache hit. @CachePut always executes the method and stores its returned result in the cache."
        },
        {
          question: "What does @CacheEvict do?",
          answer: "It removes one or more entries from a named cache, commonly after data is updated or deleted."
        },
        {
          question: "What is the difference between condition and unless in @Cacheable?",
          answer: "condition is evaluated before method execution to decide whether caching applies. unless is evaluated after successful execution and can prevent the result from being cached."
        },
        {
          question: "Why might @Cacheable not work during self-invocation?",
          answer: "Spring commonly applies caching through a proxy. A method call made directly from another method in the same object bypasses that proxy and its caching advice."
        },
        {
          question: "Should every database query be cached?",
          answer: "No. Cache queries only when repeated access provides a measurable benefit and the freshness, invalidation, memory, and operational requirements can be met."
        },
        {
          question: "Can a cache replace a database?",
          answer: "Usually not. A cache is commonly a performance layer, while the database remains the authoritative source of durable business data. Some specialized systems use caches differently, but their durability guarantees must be explicit."
        },
        {
          question: "How can a cache improve scalability?",
          answer: "By reducing repeated work and pressure on shared resources, a cache can allow an application to serve more requests with the same database or service capacity."
        },
        {
          question: "How should cache failures be handled?",
          answer: "Define timeouts and fallback behavior, protect the source of truth from traffic spikes, monitor failures, and test recovery. Whether to bypass a failed cache depends on the system's requirements."
        },
        {
          question: "How do you measure whether caching is effective?",
          answer: "Compare latency, cache hit and miss rates, backend query volume, throughput, memory usage, eviction counts, and error rates before and after the change."
        }
      ]
    },
    {
      id: "quick-revision",
      title: "22. Quick Revision Notes",
      paragraphs: [
        "Caching stores reusable results to avoid repeated expensive work. A hit returns a usable cached value; a miss requires the application to load or calculate the value. Expiration limits reuse according to a policy, while eviction removes entries.",
        "Spring Boot supports declarative caching through @EnableCaching, @Cacheable, @CachePut, and @CacheEvict. The selected provider determines important operational features such as TTL, capacity, serialization, and distributed sharing.",
        "A reliable caching design needs correct keys, invalidation rules, capacity limits, monitoring, and explicit behavior for stale data and provider failures. Caching is a performance optimization, not a replacement for business correctness or authorization."
      ],
      bullets: [
        "Cache hit = return a usable cached value.",
        "Cache miss = load or calculate the value.",
        "TTL = time to live.",
        "Eviction = removal of a cache entry.",
        "@Cacheable = reuse results when a valid entry exists.",
        "@CachePut = execute the method and update the cache.",
        "@CacheEvict = remove cached entries.",
        "Local cache = per application process.",
        "Distributed cache = shared cache service such as Redis.",
        "Always consider stale data, key design, memory limits, concurrency, and failure handling."
      ]
    }
  ]
};
