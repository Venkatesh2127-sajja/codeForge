
export const joinWhereOrderBy = {
  id: 2061,
  title: "JOIN with WHERE and ORDER BY",
  slug: "join-where-order-by",
  topicTitle: "SQL Joins",
  description:
    "Learn how to filter joined records, sort the final results, combine JOIN with WHERE and ORDER BY, and write efficient SQL queries.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "join-where",
      title: "1. Filter Joined Rows with WHERE",
      paragraphs: [
        "A JOIN combines related rows from two or more tables. The WHERE clause filters the resulting row combinations according to a condition.",
        "For an INNER JOIN, only rows satisfying the join condition are returned. WHERE then determines which of those joined rows qualify for the final result. Database optimizers may apply suitable filters earlier when doing so preserves the query's meaning.",
        "In an order-management system, you might join customers with their orders and display only orders whose total is at least 1800."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "FROM identifies the first table.",
        "INNER JOIN connects customers to their matching orders.",
        "ON defines the relationship between customer_id columns.",
        "WHERE keeps orders with a total greater than or equal to 1800.",
        "The SELECT list controls which columns appear in the output."
      ],
      notes: [
        "The example assumes customer_id is the relationship between customers and orders.",
        "The >= operator includes values exactly equal to 1800.",
        "WHERE filters rows; it does not determine their display order."
      ]
    },
    {
      id: "join-order",
      title: "2. Sort Joined Results",
      paragraphs: [
        "ORDER BY sorts the rows returned by a query. When tables are joined, you can sort using columns from either table, provided those columns are available to the query.",
        "DESC sorts from highest to lowest. ASC sorts from lowest to highest and is the default direction when no direction is specified.",
        "The following query displays the most expensive orders first."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_total DESC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00
Ravi           101       1500.00`,
      bullets: [
        "ORDER BY o.order_total DESC sorts the order totals from highest to lowest.",
        "ORDER BY c.customer_name ASC sorts names alphabetically.",
        "ORDER BY o.order_total DESC, o.order_id ASC sorts by total first and order ID second.",
        "Without ORDER BY, SQL does not guarantee a particular row order."
      ],
      codeExamples: [
        {
          title: "Sort by customer name",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY c.customer_name ASC, o.order_id ASC;`
        },
        {
          title: "Sort by multiple columns",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_total DESC, o.order_id ASC;`
        }
      ]
    },
    {
      id: "join-combined",
      title: "3. Combine JOIN, WHERE, and ORDER BY",
      paragraphs: [
        "JOIN, WHERE, and ORDER BY are frequently used together in reporting and application queries.",
        "JOIN identifies related records, WHERE filters the qualifying joined rows, and ORDER BY arranges the final result. In logical query processing, ORDER BY operates after the filtering stage.",
        "The following query returns orders worth at least 1500 and sorts them by order total in descending order. If two orders have the same total, the smaller order ID appears first."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
ORDER BY o.order_total DESC, o.order_id ASC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00
Ravi           101       1500.00`,
      bullets: [
        "First, match each customer with their orders.",
        "Next, retain orders whose total is at least 1500.",
        "Then, sort the remaining rows by total in descending order.",
        "Finally, use order_id in ascending order to break ties."
      ],
      notes: [
        "The result assumes the sample customers and orders contain the records shown in the original examples.",
        "The secondary sort makes ordering predictable when two orders have the same total."
      ]
    },
    {
      id: "join-filter-customers",
      title: "4. Filter Using Columns from Both Tables",
      paragraphs: [
        "A WHERE clause can contain conditions on columns from either joined table. This allows a query to filter by customer information and order information at the same time.",
        "For example, a business may want to find orders worth at least 1500 placed by a customer named Ravi."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_name = 'Ravi'
  AND o.order_total >= 1500
ORDER BY o.order_total DESC;`
      },
      bullets: [
        "c.customer_name refers to the customer table.",
        "o.order_total refers to the orders table.",
        "AND requires both conditions to be true.",
        "Use table aliases to make column ownership clear."
      ],
      codeExamples: [
        {
          title: "Find orders belonging to selected customers",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_name IN ('Ravi', 'Priya')
ORDER BY c.customer_name ASC, o.order_total DESC;`
        }
      ]
    },
    {
      id: "join-on-vs-where",
      title: "5. Understand ON vs WHERE",
      paragraphs: [
        "ON specifies how rows from joined tables match. WHERE filters rows after the join's logical result has been formed.",
        "With an INNER JOIN, a suitable condition can often be placed in ON or WHERE without changing the result. With an OUTER JOIN, moving a condition between ON and WHERE can change which rows survive.",
        "For a LEFT JOIN, placing a condition on the right table in WHERE can remove unmatched left-side rows because their right-side values are NULL."
      ],
      codeExamples: [
        {
          title: "INNER JOIN with a filter in WHERE",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800;`
        },
        {
          title: "LEFT JOIN that preserves customers without qualifying orders",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
   AND o.order_total >= 1800
ORDER BY c.customer_name ASC;`
        }
      ],
      bullets: [
        "Use ON to define matching relationships and, when appropriate, restrict which right-side rows qualify as matches.",
        "Use WHERE to filter the completed result.",
        "For a LEFT JOIN, conditions on the right table in WHERE may eliminate unmatched left rows.",
        "Choose the clause based on the intended result, not simply on a preference for one style."
      ]
    },
    {
      id: "join-null-filter",
      title: "6. Find Customers Without Qualifying Orders",
      paragraphs: [
        "A LEFT JOIN can identify customers who have no matching order, or no order that meets a particular condition.",
        "When no matching order exists, the joined order columns contain NULL. Checking a right-side primary key with IS NULL is a common anti-join pattern."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
      },
      bullets: [
        "LEFT JOIN preserves every customer row before filtering.",
        "o.order_id is NULL when there is no matching order.",
        "IS NULL is the correct syntax for checking a NULL value.",
        "If you need customers without orders of at least 1800, put that threshold in ON and check o.order_id IS NULL."
      ],
      codeExamples: [
        {
          title: "Customers without orders of at least 1800",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
   AND o.order_total >= 1800
WHERE o.order_id IS NULL;`
        }
      ],
      notes: [
        "The first query means customers with no orders at all.",
        "The second query means customers with no orders that satisfy the threshold; they may still have smaller orders.",
        "The results depend on the actual rows in the customers and orders tables."
      ]
    },
    {
      id: "join-filter-execution",
      title: "7. Logical Query Processing Order",
      paragraphs: [
        "SQL is written in a different order from the usual logical processing sequence. Understanding that sequence helps explain why WHERE comes before ORDER BY in query syntax.",
        "A simplified logical order for this lesson is FROM and JOIN, WHERE, SELECT, then ORDER BY. Actual database execution plans may reorder operations when it is safe and beneficial."
      ],
      bullets: [
        "FROM and JOIN: identify the source tables and combine matching rows.",
        "WHERE: filter joined rows.",
        "SELECT: determine the output columns and expressions.",
        "ORDER BY: sort the result using the requested sort keys.",
        "LIMIT or FETCH: when supported and included, restrict the number of rows returned after sorting."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
ORDER BY o.order_total DESC
LIMIT 10;`
      },
      notes: [
        "LIMIT is supported by MySQL and PostgreSQL, among other systems, but pagination syntax differs across database products.",
        "The optimizer is free to choose a physical execution plan that differs from the logical explanation."
      ]
    },
    {
      id: "join-aggregate-preview",
      title: "8. Filter and Sort Joined Aggregates",
      paragraphs: [
        "JOIN queries can also group related records and sort the calculated totals. This is useful for customer summaries, sales reports, and order analysis.",
        "When filtering individual orders, use WHERE before GROUP BY. When filtering calculated group totals, use HAVING after GROUP BY."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_order_value
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY
    c.customer_id,
    c.customer_name
HAVING COALESCE(SUM(o.order_total), 0) >= 1800
ORDER BY total_order_value DESC, c.customer_id ASC;`
      },
      bullets: [
        "COUNT(o.order_id) counts matching orders because unmatched rows have a NULL order ID.",
        "COALESCE replaces a NULL aggregate result with zero.",
        "GROUP BY creates one result group per customer.",
        "HAVING filters groups using aggregate values.",
        "ORDER BY sorts the final customer summaries."
      ],
      notes: [
        "This example uses HAVING because the filter is based on a calculated group total.",
        "If the goal is to filter individual orders before calculating each customer's total, use WHERE instead.",
        "When grouping, include the necessary non-aggregated selected columns in GROUP BY for broad SQL compatibility."
      ]
    },
    {
      id: "join-common-mistakes",
      title: "9. Common Mistakes and Fixes",
      bullets: [
        "Mistake: writing WHERE after ORDER BY. Fix: place WHERE before GROUP BY, HAVING, and ORDER BY according to SQL syntax.",
        "Mistake: forgetting the ON condition. Fix: explicitly connect the intended keys unless a deliberate CROSS JOIN is required.",
        "Mistake: using = NULL. Fix: use IS NULL or IS NOT NULL.",
        "Mistake: assuming rows are naturally sorted. Fix: add ORDER BY whenever output order matters.",
        "Mistake: using DISTINCT to hide unexpected repeated rows. Fix: inspect the join keys and one-to-many relationships first.",
        "Mistake: filtering a LEFT JOIN's right-side columns in WHERE when unmatched left rows must remain. Fix: consider moving the condition into ON.",
        "Mistake: using ambiguous column names. Fix: qualify them with aliases such as c.customer_id and o.customer_id.",
        "Mistake: assuming ORDER BY on a non-unique column gives a stable order among ties. Fix: add a unique tie-breaker such as order_id."
      ],
      codeExamples: [
        {
          title: "Incorrect clause order",
          language: "sql",
          code: `-- Incorrect: WHERE cannot follow ORDER BY
SELECT c.customer_name, o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_total DESC
WHERE o.order_total >= 1800;`
        },
        {
          title: "Correct clause order",
          language: "sql",
          code: `SELECT c.customer_name, o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800
ORDER BY o.order_total DESC;`
        }
      ]
    },
    {
      id: "join-performance",
      title: "10. Performance and Indexing",
      paragraphs: [
        "Filtering and sorting joined data can become expensive when tables contain many rows. A good query starts with correct relationships and selects only the columns it needs.",
        "Indexes on join keys and useful filter columns can help the optimizer find matching records efficiently. Whether a particular index helps depends on data distribution, selectivity, table size, and the database execution plan."
      ],
      bullets: [
        "Ensure primary keys and foreign keys represent the intended relationships.",
        "Consider indexes on frequently joined columns, such as orders.customer_id.",
        "For frequent range filtering, evaluate whether an index involving order_total helps the workload.",
        "Avoid SELECT * when the application needs only a few columns.",
        "Use EXPLAIN or the database's execution-plan tool to inspect join strategies, scans, and sort operations.",
        "Do not add indexes blindly; indexes consume storage and add work to INSERT, UPDATE, and DELETE operations.",
        "Use a deterministic ORDER BY when stable pagination is required."
      ],
      code: {
        language: "sql",
        code: `-- Example indexes; verify existing indexes first.
CREATE INDEX idx_orders_customer_id
    ON orders (customer_id);

CREATE INDEX idx_orders_total
    ON orders (order_total);

-- Inspect the execution plan.
EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800
ORDER BY o.order_total DESC, o.order_id ASC;`
      },
      notes: [
        "Index creation syntax and EXPLAIN output vary across database systems.",
        "A composite index may be useful for some filter-and-sort patterns, but the right index depends on the query and workload.",
        "A database may choose a table scan when it estimates that scanning is cheaper than using an index."
      ]
    },
    {
      id: "join-practice-beginner",
      title: "11. Practice Exercise: Filter Orders",
      paragraphs: [
        "Task: Display customer names, order IDs, and order totals for orders greater than 1600. Sort the result from the highest total to the lowest."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total > 1600
ORDER BY o.order_total DESC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "Why is order 101 excluded? Its total is 1500, which is not greater than 1600.",
        "Why does Ravi appear once? Only one of his orders satisfies the filter in the supplied sample.",
        "What changes if > is replaced with >=? Orders totaling exactly 1600 would also qualify."
      ]
    },
    {
      id: "join-practice-intermediate",
      title: "12. Practice Exercise: Multiple Conditions",
      paragraphs: [
        "Task: Return orders with totals between 1500 and 2500 inclusive, sorted by customer name and then order total from highest to lowest."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total BETWEEN 1500 AND 2500
ORDER BY c.customer_name ASC, o.order_total DESC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Priya          103       1800.00
Ravi           102       2500.00
Ravi           101       1500.00`,
      notes: [
        "BETWEEN includes both endpoints.",
        "The primary sort is customer_name. Therefore, Priya appears before Ravi.",
        "Within Ravi's rows, order_total DESC puts 2500 before 1500."
      ]
    },
    {
      id: "join-practice-advanced",
      title: "13. Practice Exercise: LEFT JOIN and Filtering",
      paragraphs: [
        "Task: List every customer and any order with a total of at least 1800. Keep customers even when they have no order that meets the threshold.",
        "The filter is deliberately placed in ON so that customers without a qualifying order remain in the result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
   AND o.order_total >= 1800
ORDER BY c.customer_name ASC, o.order_id ASC;`
      },
      bullets: [
        "Explain why the condition is in ON rather than WHERE.",
        "What values appear in the order columns when a customer has no qualifying order?",
        "How would the result change if the threshold condition moved into WHERE?"
      ],
      notes: [
        "Expected results depend on the complete customers and orders datasets.",
        "Moving o.order_total >= 1800 to WHERE would remove customers whose joined order columns are NULL."
      ]
    },
    {
      id: "join-revision",
      title: "14. Quick Revision Notes",
      bullets: [
        "JOIN combines related rows from multiple tables.",
        "ON defines the matching relationship between joined tables.",
        "WHERE filters qualifying rows.",
        "ORDER BY sorts the final result.",
        "ASC sorts ascending; DESC sorts descending.",
        "Use multiple sort keys to break ties predictably.",
        "Use table aliases to make multi-table queries easier to read.",
        "Use IS NULL to test for NULL values.",
        "For LEFT JOIN queries, consider carefully whether a right-table condition belongs in ON or WHERE.",
        "Indexes and execution plans can help diagnose slow join, filter, and sort operations."
      ],
      notes: [
        "Remember the common syntax order: SELECT, FROM/JOIN, WHERE, GROUP BY, HAVING, ORDER BY, then the database-specific row limit or pagination clause."
      ]
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can WHERE be used with JOIN?",
          answer:
            "Yes. WHERE filters the rows that qualify for the final result after the join's logical result is formed."
        },
        {
          question: "What is the purpose of ORDER BY after a JOIN?",
          answer:
            "It sorts the joined result using one or more columns or expressions."
        },
        {
          question: "Can we sort by columns from either joined table?",
          answer:
            "Yes, provided the columns are available to the query, such as c.customer_name or o.order_total."
        },
        {
          question: "Which clause appears first in query syntax: WHERE or ORDER BY?",
          answer:
            "WHERE appears before ORDER BY."
        },
        {
          question: "What is the difference between ON and WHERE?",
          answer:
            "ON defines matching rows between joined tables. WHERE filters the joined result. Moving conditions between them can change the result of an OUTER JOIN."
        },
        {
          question: "Does ORDER BY guarantee a unique order?",
          answer:
            "Only the specified sort keys determine the ordering. If the keys are not unique, rows tied on all those keys may appear in either order. Add a unique tie-breaker for deterministic ordering."
        },
        {
          question: "What happens if WHERE filters a nullable right-side column after a LEFT JOIN?",
          answer:
            "Rows with no matching right-side record usually have NULL in that column, so a comparison such as right_table.amount >= 100 can evaluate to unknown and remove those rows. Put the condition in ON if unmatched left rows must be preserved."
        },
        {
          question: "Can WHERE use columns that are not in SELECT?",
          answer:
            "Generally yes. A query can filter on a source column without returning that column in the output, subject to the query's grouping and other SQL rules."
        },
        {
          question: "How can you improve a slow JOIN query with filtering and sorting?",
          answer:
            "Check the join conditions and execution plan, select only required columns, evaluate indexes on join and filter keys, and measure the impact of changes against the actual workload."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping. HAVING filters groups, often using aggregate expressions such as SUM or COUNT."
        }
      ]
    }
  ]
};
