
export const springCacheAnnotations = {
  id: 1504,
  title: "Spring Cache Annotations",
  slug: "spring-cache-annotations",
  topicTitle: "Spring Boot Advanced",
  description:
    "Master @Cacheable, @CachePut, and @CacheEvict, including cache keys, conditional caching, cache consistency, and production best practices.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "enable-caching",
      title: "1. Enable Spring Caching",
      paragraphs: [
        "Spring Cache is an abstraction that reduces repeated method execution by storing and reusing results. Instead of repeatedly querying a database for the same product, customer, or configuration, an application can return a previously cached result.",
        "Spring's cache abstraction separates caching logic from the underlying cache implementation. Depending on the dependencies and configuration, Spring can work with providers such as Caffeine, Redis, and other supported cache implementations.",
        "To activate annotation-driven caching, use @EnableCaching in a configuration class. You must also configure a suitable cache provider. Adding @EnableCaching alone does not automatically provide every production caching feature, such as distributed storage or configurable expiration.",
        "Caching is especially useful for frequently accessed data that changes less frequently than it is read. It is less suitable for data that must always reflect the latest committed state unless a reliable consistency strategy is implemented."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableCaching
public class CacheConfig {
}`
      },
      bullets: [
        "Cache: a storage area containing reusable results.",
        "Cache key: the identifier used to locate a cached entry.",
        "Cache hit: a requested entry is already available.",
        "Cache miss: the requested entry is not available, so the operation usually executes.",
        "Cache provider: the implementation that stores and retrieves cached values."
      ]
    },
    {
      id: "why-caching-matters",
      title: "2. Why Do We Need Caching?",
      paragraphs: [
        "Consider an e-commerce application where hundreds of users request the same product details. Without caching, each request might execute a database query. With caching, the first request can load the product from the database, while subsequent requests reuse the cached result until the entry is invalidated or expires.",
        "Caching can reduce database load and improve response time. However, it introduces memory usage, expiration policies, invalidation requirements, and the possibility of serving stale data."
      ],
      code: {
        language: "java",
        code: `// Without caching
public ProductDto findById(Long id) {
    return productRepository.findById(id)
        .map(this::toDto)
        .orElseThrow();
}

// With caching
@Cacheable(cacheNames = "products", key = "#id")
public ProductDto findById(Long id) {
    return productRepository.findById(id)
        .map(this::toDto)
        .orElseThrow();
}`
      },
      bullets: [
        "Repeated database reads can be avoided for cache hits.",
        "Response times may improve when cached data is inexpensive to retrieve.",
        "Database connection and query pressure can decrease.",
        "Caching does not replace database indexing, query optimization, or a good data model.",
        "Cache memory and stale-data behavior must be monitored."
      ]
    },
    {
      id: "cacheable-annotation",
      title: "3. Understanding @Cacheable",
      paragraphs: [
        "@Cacheable checks the configured cache using a key derived from the method arguments or an explicitly supplied key. If a usable entry exists, Spring returns its value without executing the target method. If no entry exists, the method executes and its result is normally stored.",
        "This annotation is suitable for read operations such as finding products by ID, loading customer profiles, or retrieving relatively stable reference data.",
        "The cache name identifies the logical cache, while key defines the entry identifier. Without an explicit key, Spring uses its default key-generation strategy based on the method arguments."
      ],
      code: {
        language: "java",
        code: `@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Cacheable(cacheNames = "products", key = "#id")
    public ProductDto findById(Long id) {
        System.out.println("Loading product from database");

        Product product = productRepository.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException("Product not found"));

        return new ProductDto(
            product.getId(),
            product.getName(),
            product.getPrice()
        );
    }
}`
      },
      paragraphs: [
        "Suppose findById(10L) is called twice. If the first invocation completes successfully and the result is cached, the second invocation can return the cached ProductDto without repeating the repository lookup.",
        "Caching behavior depends on the provider, cache configuration, method result, and interception path. A cache hit does not mean the database is checked again to confirm that the value remains current."
      ],
      bullets: [
        "@Cacheable is primarily used for read-heavy operations.",
        "By default, null results are generally cacheable when the provider supports them and the cache configuration permits them.",
        "The sync attribute can request synchronized loading for a key, subject to provider and cache-manager limitations.",
        "Avoid caching results that depend on unrepresented arguments or user-specific context."
      ]
    },
    {
      id: "cacheput-annotation",
      title: "4. Understanding @CachePut",
      paragraphs: [
        "@CachePut always invokes the target method rather than skipping execution because an entry already exists. After successful method execution, Spring places the returned result into the selected cache using the configured key.",
        "Use @CachePut when a method changes data and returns the updated representation that should be cached. The database operation must be implemented correctly, and the returned result must represent the value you intend to cache.",
        "Unlike @Cacheable, @CachePut does not serve the existing cached result instead of executing the method."
      ],
      code: {
        language: "java",
        code: `@CachePut(cacheNames = "products", key = "#id")
public ProductDto update(Long id, ProductDto request) {
    Product product = productRepository.findById(id)
        .orElseThrow(() ->
            new IllegalArgumentException("Product not found"));

    product.setName(request.name());
    product.setPrice(request.price());

    Product saved = productRepository.save(product);

    return new ProductDto(
        saved.getId(),
        saved.getName(),
        saved.getPrice()
    );
}`
      },
      paragraphs: [
        "The example assumes ProductDto is a record with name and price components and that the entity has corresponding setters. Adapt the mapping to your project.",
        "For transactional updates, remember that a cache operation is not automatically an atomic transaction with the database. Consider when the database commit occurs and whether a failed transaction could leave an incorrect cache entry."
      ]
    },
    {
      id: "cacheevict-annotation",
      title: "5. Understanding @CacheEvict",
      paragraphs: [
        "@CacheEvict removes an entry from a cache. It is useful when a product, customer, or other record is deleted or when an update should force a future read to reload data from the source.",
        "Use key to remove a particular entry. Use allEntries = true to clear the entire selected cache. When allEntries is enabled, a specific key is not used to select an individual entry.",
        "By default, eviction occurs after successful method execution. The beforeInvocation attribute can request eviction before the target method runs, including when that method subsequently fails."
      ],
      code: {
        language: "java",
        code: `@CacheEvict(cacheNames = "products", key = "#id")
public void delete(Long id) {
    if (!productRepository.existsById(id)) {
        throw new IllegalArgumentException("Product not found");
    }

    productRepository.deleteById(id);
}

@CacheEvict(cacheNames = "products", allEntries = true)
public void clearProductCache() {
    // The method body may perform other application work.
    // Spring clears the selected cache after successful execution
    // by default.
}`
      },
      bullets: [
        "Use key to evict one cached record.",
        "Use allEntries = true to evict every entry in a named cache.",
        "Use beforeInvocation = true only when early eviction is intentional.",
        "Cache eviction does not delete the corresponding database record by itself.",
        "Evict or refresh related caches when data is available through multiple cached queries."
      ]
    },
    {
      id: "cache-annotation-comparison",
      title: "6. @Cacheable vs @CachePut vs @CacheEvict",
      paragraphs: [
        "These three annotations serve different purposes. Choose the annotation based on whether the operation reads cached data, refreshes a cached result, or invalidates an entry."
      ],
      bullets: [
        "@Cacheable: checks the cache first and normally executes the method only on a cache miss.",
        "@CachePut: always executes the method and stores its returned result under the selected cache key.",
        "@CacheEvict: removes an entry or clears the selected cache.",
        "Do not casually combine @Cacheable and @CachePut on the same method because their execution semantics can conflict with the intended behavior."
      ],
      code: {
        language: "java",
        code: `// Read: reuse an existing cached value.
@Cacheable(cacheNames = "products", key = "#id")
public ProductDto findById(Long id) {
    return loadFromDatabase(id);
}

// Update: execute and refresh the cached representation.
@CachePut(cacheNames = "products", key = "#id")
public ProductDto update(Long id, ProductDto request) {
    return updateDatabaseRecord(id, request);
}

// Delete: execute the deletion and invalidate the entry.
@CacheEvict(cacheNames = "products", key = "#id")
public void delete(Long id) {
    deleteDatabaseRecord(id);
}`
      }
    },
    {
      id: "cache-keys-and-spel",
      title: "7. Cache Keys and SpEL Expressions",
      paragraphs: [
        "Spring cache annotations support Spring Expression Language (SpEL) for defining keys and evaluating conditions. The available expression context includes method arguments and other supported metadata.",
        "A cache key must distinguish inputs that can produce different results. For example, if a method retrieves a product by both tenant ID and product ID, using only the product ID may return another tenant's cached result if IDs are not globally unique.",
        "Simple parameter expressions such as #id are convenient when compiler parameter-name metadata or the framework's parameter discovery makes the name available. In cases where parameter names are unavailable, indexed arguments such as #p0 or #a0 can be used."
      ],
      code: {
        language: "java",
        code: `@Cacheable(cacheNames = "products", key = "#p0")
public ProductDto findById(Long id) {
    return loadFromDatabase(id);
}

@Cacheable(
    cacheNames = "productsByTenant",
    key = "#p0 + ':' + #p1"
)
public ProductDto findForTenant(Long tenantId, Long productId) {
    return loadForTenant(tenantId, productId);
}

@Cacheable(
    cacheNames = "products",
    key = "#id",
    condition = "#id > 0"
)
public ProductDto findPositiveId(Long id) {
    return loadFromDatabase(id);
}`
      },
      bullets: [
        "#id refers to the named id parameter when it can be resolved.",
        "#p0 and #a0 refer to the first method argument.",
        "Use composite keys when multiple inputs affect the result.",
        "Do not include sensitive personal data directly in cache keys unless required and appropriately protected.",
        "Keep key construction consistent between reads, updates, and evictions."
      ]
    },
    {
      id: "condition-vs-unless",
      title: "8. condition vs unless",
      paragraphs: [
        "The condition attribute determines whether caching should be attempted based on an expression evaluated before method execution. If the condition is false, the method executes without the normal cache lookup and storage behavior for that operation.",
        "The unless attribute is evaluated after the method returns and can prevent the returned result from being stored. It is particularly useful when the result itself must be inspected.",
        "Understanding the timing difference is important: condition can prevent a cache hit from being used, while unless can reject a newly calculated result from being cached."
      ],
      code: {
        language: "java",
        code: `@Cacheable(
    cacheNames = "products",
    key = "#id",
    condition = "#id > 0"
)
public ProductDto findById(Long id) {
    return loadFromDatabase(id);
}

@Cacheable(
    cacheNames = "products",
    key = "#id",
    unless = "#result == null"
)
public ProductDto findIfAvailable(Long id) {
    return findOptionalProduct(id);
}`
      },
      paragraphs: [
        "The second example illustrates result-based filtering conceptually. Ensure your actual return type, null-handling strategy, and cache provider support match the expression. Optional return types and null values need special care when designing caching behavior."
      ],
      bullets: [
        "condition: evaluated before invocation; determines whether the caching operation applies.",
        "unless: evaluated after a successful result is available; can veto storing that result.",
        "Use condition for input-based rules.",
        "Use unless for result-based rules.",
        "Test the expression against the actual method return type."
      ]
    },
    {
      id: "cache-name-and-cachemanager",
      title: "9. Cache Names and CacheManager",
      paragraphs: [
        "A cache name identifies a logical cache, such as products, customers, or categories. Multiple methods can use the same cache name when they share a compatible key and value model.",
        "Spring's CacheManager provides access to named caches. Depending on the configured provider, cache creation may be automatic or require explicit configuration.",
        "When the application uses multiple cache managers, select the appropriate manager deliberately. The cache name alone does not define expiration, storage capacity, eviction policy, or distributed behavior."
      ],
      code: {
        language: "java",
        code: `@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager(
            "products",
            "customers",
            "categories"
        );
    }
}`
      },
      paragraphs: [
        "ConcurrentMapCacheManager is useful for a simple demonstration and local development. It is not a complete production caching solution: this example does not provide a configured TTL, bounded cache size, or shared distributed state across application instances.",
        "If another CacheManager is already auto-configured by Spring Boot, avoid defining conflicting configuration unintentionally."
      ]
    },
    {
      id: "ttl-and-cache-providers",
      title: "10. TTL and Cache Providers",
      paragraphs: [
        "TTL means time to live. It defines how long a cached entry can remain valid before it expires according to the provider's policy. Expiration is important when data changes outside the application or when stale values must not remain indefinitely.",
        "Spring's cache annotations do not provide a universal TTL attribute. TTL, maximum size, eviction policy, serialization, and distributed invalidation are generally configured through the selected provider or its integration.",
        "Caffeine is a popular in-process cache that can provide expiration and size-based eviction. Redis is often used when multiple application instances need to share cached data, although network latency, serialization, availability, and invalidation must also be considered."
      ],
      code: {
        language: "java",
        code: `// Example Caffeine configuration.
// Add a compatible Spring cache integration and
// Caffeine dependency to the project.

@Configuration
@EnableCaching
public class CaffeineCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager =
            new CaffeineCacheManager("products", "categories");

        manager.setCaffeine(
            Caffeine.newBuilder()
                .maximumSize(1_000)
                .expireAfterWrite(Duration.ofMinutes(10))
        );

        return manager;
    }
}`
      },
      paragraphs: [
        "This example requires the Caffeine and Spring cache integration dependencies, along with imports for Caffeine, CacheManager, configuration annotations, and Duration. Confirm that the chosen Spring Boot and provider versions are compatible.",
        "expireAfterWrite measures expiry from the most recent write. It is not the same as expireAfterAccess, which measures inactivity since the most recent access. Select the policy that fits the application's data freshness requirements."
      ],
      bullets: [
        "In-process cache: simple and fast, but generally isolated to one application instance.",
        "Distributed cache: can share values across instances, but adds network and operational dependencies.",
        "TTL is a safety mechanism, not a complete replacement for correct invalidation.",
        "Choose cache capacity and expiry based on observed workload and memory limits."
      ]
    },
    {
      id: "proxy-and-self-invocation",
      title: "11. Proxy Behavior and Self-Invocation",
      paragraphs: [
        "In Spring's default proxy-based caching mode, Spring intercepts eligible calls that pass through the configured proxy. Calling a cache-annotated method from another method on the same object normally bypasses that proxy interception.",
        "As a result, an annotation may appear correct while the expected cache lookup or update never occurs for a self-invocation.",
        "A common design improvement is to place the cached operation in a separate Spring-managed service and call that service through its injected bean. This keeps the behavior clear and easier to test."
      ],
      code: {
        language: "java",
        code: `@Service
public class ProductLookupService {

    @Cacheable(cacheNames = "products", key = "#id")
    public ProductDto findById(Long id) {
        return loadFromDatabase(id);
    }

    private ProductDto loadFromDatabase(Long id) {
        // Replace with repository and mapping logic.
        throw new UnsupportedOperationException(
            "Connect your repository here"
        );
    }
}

@Service
public class ProductReportService {

    private final ProductLookupService productLookupService;

    public ProductReportService(
            ProductLookupService productLookupService) {
        this.productLookupService = productLookupService;
    }

    public ProductDto loadProductForReport(Long id) {
        return productLookupService.findById(id);
    }
}`
      },
      bullets: [
        "Default proxy mode intercepts external calls through the Spring proxy.",
        "Self-invocation can bypass cache interception.",
        "The object must be managed by Spring for its caching annotations to be applied.",
        "AspectJ-based interception is another option but requires additional configuration.",
        "Avoid relying on private or otherwise non-interceptable methods as ordinary proxy entry points."
      ]
    },
    {
      id: "transactions-and-cache-consistency",
      title: "12. Transactions and Cache Consistency",
      paragraphs: [
        "Database transactions and cache operations are separate concerns unless a specifically configured integration provides stronger coordination. A successful cache operation does not automatically prove that the associated database transaction has committed.",
        "For example, an update method may change the cache before the database transaction commits. If the transaction later rolls back, the cache may temporarily contain data that was never committed. The exact behavior depends on annotation ordering, transaction configuration, cache provider, and synchronization.",
        "A common strategy is to invalidate the relevant cache after a successful database commit so that the next read reloads committed data. More demanding systems may use transaction-aware cache integration, application events, or an outbox-based invalidation process.",
        "When multiple application instances have local caches, invalidating one instance does not automatically invalidate every other instance. A shared cache or reliable invalidation mechanism may be required."
      ],
      code: {
        language: "java",
        code: `@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    @CacheEvict(
        cacheNames = "products",
        key = "#id",
        beforeInvocation = false
    )
    public void updatePrice(Long id, BigDecimal price) {
        Product product = productRepository.findById(id)
            .orElseThrow();

        product.setPrice(price);
        productRepository.save(product);
    }
}`
      },
      paragraphs: [
        "The annotation combination above illustrates an invalidation-oriented approach, but it should not be treated as a universal guarantee of post-commit eviction. Transaction and cache advice ordering can affect the actual timing. For strict post-commit behavior, implement and test an explicit after-commit invalidation strategy appropriate to the application.",
        "Use a deliberate consistency model: decide how much staleness is acceptable, which operations invalidate which entries, and how invalidation failures are retried."
      ]
    },
    {
      id: "testing-cache-behavior",
      title: "13. Testing Cache Behavior",
      paragraphs: [
        "Caching should be tested through observable behavior rather than by assuming an annotation is working. A useful unit or integration test verifies that repeated reads avoid repeated source calls, updates refresh or invalidate entries, and deletion prevents stale results from being served.",
        "Use a predictable test cache manager and clear caches between tests. Otherwise, values left by an earlier test can make the results misleading.",
        "When testing transactions, include successful commits and rollbacks. When using multiple application instances, test the invalidation strategy across instances if shared consistency is required."
      ],
      code: {
        language: "java",
        code: `@SpringBootTest
class ProductCacheTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private CacheManager cacheManager;

    @BeforeEach
    void clearCache() {
        Cache cache = cacheManager.getCache("products");

        if (cache != null) {
            cache.clear();
        }
    }

    @Test
    void cacheShouldContainProductAfterSuccessfulRead() {
        productService.findById(1L);

        Cache cache = cacheManager.getCache("products");

        assertNotNull(cache);
        assertNotNull(cache.get(1L));
    }
}`
      },
      paragraphs: [
        "This test assumes that product ID 1 exists, that findById returns successfully, and that the products cache is configured. Add the necessary JUnit assertions and imports. For a deterministic test of database call counts, use a mocked repository or a dedicated integration-test fixture."
      ],
      bullets: [
        "Verify cache entries after successful reads.",
        "Verify that repeated reads reduce repository invocations.",
        "Verify that updates refresh or invalidate the expected key.",
        "Verify that deletion removes stale cached data.",
        "Verify rollback behavior and concurrent access where they matter."
      ]
    },
    {
      id: "common-mistakes",
      title: "14. Common Mistakes and Best Practices",
      paragraphs: [
        "A cache can make an application faster, but incorrect keys and incomplete invalidation can introduce subtle data bugs. Review caching decisions whenever a method's inputs, output, transaction behavior, or data ownership changes.",
        "Cache immutable DTOs or carefully controlled values where practical. Caching mutable entity objects can allow one caller to modify an object that another caller later receives, especially with in-memory providers that retain object references.",
        "Avoid caching highly volatile data without a clear freshness policy. Also consider what happens when the cache provider becomes unavailable, memory pressure increases, or a large number of requests miss the cache simultaneously."
      ],
      bullets: [
        "Do not cache a method result using a key that omits important method arguments.",
        "Do not assume cache eviction is automatically propagated across every application instance.",
        "Do not confuse clearing a cache with deleting database data.",
        "Do not cache mutable entities without understanding reference-sharing behavior.",
        "Do not assume TTL is available through the same annotation syntax for every provider.",
        "Consider cache stampedes when many requests simultaneously miss the same key.",
        "Avoid storing sensitive information in shared caches without suitable access controls and protection.",
        "Measure cache hit rate, misses, eviction rate, latency, and provider health."
      ]
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is Spring Cache?",
          answer: "Spring Cache is an abstraction that lets applications cache method results using annotations and a CacheManager without coupling business logic directly to one cache provider."
        },
        {
          question: "What does @Cacheable do?",
          answer: "It checks the configured cache for a matching key. On a cache hit, it normally returns the cached result; on a cache miss, it executes the method and stores the result when permitted."
        },
        {
          question: "What is the difference between @CachePut and @Cacheable?",
          answer: "@Cacheable can skip method execution when a usable cached value exists. @CachePut always executes the method and stores its returned result in the selected cache."
        },
        {
          question: "What is @CacheEvict used for?",
          answer: "It removes a particular cache entry or clears all entries in a named cache. It is commonly used after deleting or changing data."
        },
        {
          question: "What does @EnableCaching do?",
          answer: "It enables Spring's annotation-driven cache interception. A suitable cache manager and provider configuration are still needed."
        },
        {
          question: "What is a cache hit?",
          answer: "A cache hit occurs when the requested key has a usable cached entry, allowing the application to reuse that value instead of executing the underlying operation."
        },
        {
          question: "What is a cache miss?",
          answer: "A cache miss occurs when the requested value is unavailable. The application normally executes the target method and may store its result."
        },
        {
          question: "What is the purpose of the key attribute?",
          answer: "The key attribute defines which cache entry an invocation reads, updates, or evicts. The key must distinguish calls that can produce different results."
        },
        {
          question: "What is the difference between condition and unless?",
          answer: "Condition is evaluated before invocation and determines whether caching applies. Unless is evaluated after a successful result is available and can prevent that result from being cached."
        },
        {
          question: "What does allEntries = true mean?",
          answer: "It requests eviction of all entries in the selected cache instead of removing just one key."
        },
        {
          question: "What does beforeInvocation = true do?",
          answer: "It requests cache eviction before the annotated method executes, so the eviction can happen even if the method later throws an exception."
        },
        {
          question: "What is TTL in caching?",
          answer: "TTL means time to live. It controls how long an entry remains valid under the cache provider's expiration policy."
        },
        {
          question: "Does Spring Cache provide a universal TTL annotation attribute?",
          answer: "No. TTL is generally configured through the cache provider or cache integration rather than through a portable attribute on @Cacheable."
        },
        {
          question: "What is CacheManager?",
          answer: "CacheManager is the Spring abstraction used to obtain named Cache instances. It connects annotation-driven operations to the configured cache implementation."
        },
        {
          question: "Why might @Cacheable not work during self-invocation?",
          answer: "In default proxy-based mode, a method calling another cached method on the same object can bypass the Spring proxy and therefore bypass cache interception."
        },
        {
          question: "Can @Cacheable cache null values?",
          answer: "Null caching depends on the method result, Spring's cache semantics, and the provider's capabilities and configuration. Check the selected provider before relying on it."
        },
        {
          question: "What is the difference between local and distributed caching?",
          answer: "A local cache usually resides in one application's memory. A distributed cache can be shared across instances but introduces network latency, serialization, and additional operational concerns."
        },
        {
          question: "How can stale cache data be prevented?",
          answer: "Use appropriate eviction or refresh rules, provider-supported expiration, and reliable invalidation after committed changes. The strategy should match the application's consistency requirements."
        },
        {
          question: "Does @CacheEvict delete a database record?",
          answer: "No. It removes cached data only. Database deletion must be performed separately by repository or other persistence logic."
        },
        {
          question: "What is a cache stampede?",
          answer: "A cache stampede occurs when many concurrent requests miss the same key and all attempt to load the same expensive data. Synchronized loading, request coalescing, or provider-specific strategies can help."
        },
        {
          question: "How should caching interact with database transactions?",
          answer: "The application must account for commit and rollback timing. For stronger consistency, consider after-commit invalidation, transaction-aware integration, or reliable event-based invalidation."
        },
        {
          question: "How do you test whether caching is working?",
          answer: "Verify cached values and repository invocation counts, clear caches between tests, and test update, deletion, rollback, and concurrency behavior where relevant."
        }
      ]
    },
    {
      id: "revision-notes",
      title: "16. Quick Revision Notes",
      bullets: [
        "@EnableCaching activates annotation-driven caching.",
        "@Cacheable reads a cached value when available and normally stores successful results after a cache miss.",
        "@CachePut always invokes the method and stores its returned result.",
        "@CacheEvict removes one entry or clears the selected cache.",
        "key identifies the entry; condition controls caching before invocation; unless can reject the returned result.",
        "TTL and maximum cache size are provider-specific configuration concerns.",
        "Proxy-based self-invocation can bypass cache interception.",
        "Cache updates and database transactions require deliberate consistency handling.",
        "Local caches are not automatically synchronized across application instances.",
        "Test cache hits, misses, updates, evictions, and transaction failure behavior."
      ],
      paragraphs: [
        "Interview summary: Spring Cache improves application performance by storing reusable method results behind a provider-independent abstraction. @Cacheable is used primarily for reads, @CachePut for refreshing entries after execution, and @CacheEvict for invalidation. Production caching requires appropriate keys, expiration, consistency, and testing strategies."
      ]
    }
  ]
};
