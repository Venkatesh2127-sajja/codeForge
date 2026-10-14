
export const joinMistakesPerformance = {
  id: 2064,
  title: "Common JOIN Mistakes and Performance Basics",
  slug: "join-mistakes-performance",
  topicTitle: "SQL Joins",
  description:
    "Avoid incorrect join conditions, unintended row multiplication, outer-join filtering mistakes, and common performance problems.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "missing-condition",
      title: "1. Missing the JOIN Condition",
      paragraphs: [
        "A JOIN combines rows from multiple tables according to a relationship or combination rule. If the query does not restrict which rows match, it may produce far more rows than expected.",
        "A CROSS JOIN deliberately returns every possible combination of rows from its two input tables. If one table has M rows and the other has N rows, the result contains M multiplied by N rows.",
        "For example, joining 100 customers to 500 orders with a CROSS JOIN produces 50,000 combinations. This is correct only when every combination is actually required."
      ],
      codeExamples: [
        {
          title: "Intentional Cartesian product",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
CROSS JOIN orders AS o;`
        },
        {
          title: "Match customers to their orders",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id;`
        }
      ],
      bullets: [
        "CROSS JOIN deliberately returns every combination.",
        "INNER JOIN returns matching records only.",
        "LEFT JOIN preserves all rows from the left table and includes matching right-side rows.",
        "Always verify whether the intended relationship is one-to-one, one-to-many, or many-to-many.",
        "Do not add an arbitrary ON condition just to reduce the row count; use the actual relationship between the tables."
      ],
      notes: [
        "Some SQL dialects permit an INNER JOIN without an ON clause, effectively creating a Cartesian product. Other dialects may reject that syntax.",
        "A missing relationship condition can be a correctness problem even if the query executes successfully."
      ]
    },
    {
      id: "wrong-condition",
      title: "2. Using the Wrong JOIN Condition",
      paragraphs: [
        "A query can contain a JOIN condition and still return incorrect data if it connects unrelated columns or uses the wrong keys.",
        "For a customer-to-orders relationship, the expected match is normally customers.customer_id = orders.customer_id. Joining customer_id to an unrelated column, such as order_id, can associate incorrect records or omit valid ones.",
        "Column names alone do not prove that two columns represent the same relationship. Confirm the schema, key definitions, and business rules."
      ],
      codeExamples: [
        {
          title: "Correct relationship",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id;`
        },
        {
          title: "Potentially incorrect relationship",
          language: "sql",
          code: `-- Do not join these columns unless the schema
-- explicitly defines this relationship.
SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.order_id;`
        }
      ],
      bullets: [
        "Check the primary key of the parent table.",
        "Check the foreign key of the child table.",
        "Qualify columns with table aliases to avoid ambiguity.",
        "Test the query with known records whose relationships are understood.",
        "Compare the number of returned rows with the expected cardinality."
      ],
      notes: [
        "The second query is an example of a potentially incorrect relationship, not a universally invalid SQL expression.",
        "The actual correctness of a join condition depends on the schema and the meaning of the columns."
      ]
    },
    {
      id: "duplicate-rows",
      title: "3. Understanding Row Multiplication",
      paragraphs: [
        "A customer with multiple orders appears multiple times in a customer-to-orders join. This is normal for a one-to-many relationship, not necessarily a duplicate-data problem.",
        "Suppose Ravi has two orders. Joining Ravi to orders produces two result rows because each row represents a different order.",
        "Unexpected multiplication becomes a problem when a query assumes one result row per customer or calculates totals using measures that are repeated by a join."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_id;`
      },
      bullets: [
        "One customer can match many order rows.",
        "One order can match many order-item rows.",
        "Joining orders to order_items repeats order-level columns for each matching item.",
        "A many-to-many relationship can create several result rows for each row on either side.",
        "Use DISTINCT only when removing duplicate result rows is part of the actual requirement."
      ],
      codeExamples: [
        {
          title: "Count orders rather than joined item rows",
          language: "sql",
          code: `SELECT
    o.customer_id,
    COUNT(DISTINCT o.order_id) AS order_count
FROM orders AS o
INNER JOIN order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY o.customer_id;`
        }
      ],
      notes: [
        "COUNT(DISTINCT o.order_id) is appropriate when the goal is to count distinct orders after joining to order items.",
        "Do not automatically apply DISTINCT to every query. First determine which entity each result row should represent."
      ]
    },
    {
      id: "aggregate-inflation",
      title: "4. Prevent Inflated Totals After Multiple Joins",
      paragraphs: [
        "Aggregates can become incorrect when a query joins multiple one-to-many relationships. If an order has several items, the order total can appear on multiple joined rows. Summing that repeated order total counts it more than once.",
        "Joining two independent child collections can multiply rows even further. For example, an order with three items and two payments can produce six joined combinations.",
        "A reliable solution is to aggregate each child dataset to the intended reporting level before joining those summaries. This keeps the number of rows aligned with the meaning of each measure."
      ],
      codeExamples: [
        {
          title: "Risk of inflated order totals",
          language: "sql",
          code: `-- An order total may be repeated for each order item.
SELECT
    o.customer_id,
    SUM(o.order_total) AS possibly_inflated_total
FROM orders AS o
INNER JOIN order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY o.customer_id;`
        },
        {
          title: "Aggregate orders before joining customers",
          language: "sql",
          code: `WITH customer_order_summary AS (
    SELECT
        customer_id,
        COUNT(*) AS order_count,
        SUM(order_total) AS total_spending
    FROM orders
    GROUP BY customer_id
)
SELECT
    c.customer_id,
    c.customer_name,
    COALESCE(s.order_count, 0) AS order_count,
    COALESCE(s.total_spending, 0) AS total_spending
FROM customers AS c
LEFT JOIN customer_order_summary AS s
    ON c.customer_id = s.customer_id
ORDER BY total_spending DESC, c.customer_id ASC;`
        }
      ],
      bullets: [
        "Identify the grain of each measure: customer, order, order item, or payment.",
        "Aggregate each dataset at the correct grain before combining independent one-to-many relationships.",
        "Do not use SUM(DISTINCT order_total) as a general repair; different orders may legitimately have the same total.",
        "Validate aggregate results against a simpler query that calculates the same measure without the multiplying join."
      ]
    },
    {
      id: "outer-where",
      title: "5. Filtering an Outer JOIN Incorrectly",
      paragraphs: [
        "A LEFT JOIN preserves all rows from its left table when there is no matching right-side record. In those unmatched rows, the right-side columns are NULL.",
        "If a WHERE condition requires a right-side value, such as o.order_total > 2000, unmatched rows do not satisfy that condition and are removed. The result behaves like an INNER JOIN with respect to that condition.",
        "If every customer must remain in the result, even customers without a qualifying order, place the order qualification in the ON clause."
      ],
      codeExamples: [
        {
          title: "Preserve all customers",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
   AND o.order_total > 2000
ORDER BY c.customer_id;`
        },
        {
          title: "Return only customers with qualifying orders",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total > 2000
ORDER BY c.customer_id;`
        }
      ],
      bullets: [
        "Use ON to define matching rows and, where appropriate, which right-side rows qualify as matches.",
        "Use WHERE to filter the result after the join's logical matching stage.",
        "A right-side WHERE condition can remove unmatched left-side rows.",
        "The correct placement depends on whether unmatched left-side records must remain."
      ],
      notes: [
        "The two queries intentionally have different meanings.",
        "Moving a condition between ON and WHERE is not always a safe optimization because it can change the result."
      ]
    },
    {
      id: "null-checks",
      title: "6. Use NULL Checks Correctly",
      paragraphs: [
        "NULL represents missing or unknown data. SQL comparisons involving NULL generally evaluate to UNKNOWN rather than TRUE or FALSE.",
        "When finding unmatched rows after a LEFT JOIN, check a right-side column that cannot be NULL in a real matching row, such as its primary key.",
        "Checking a nullable business column can incorrectly classify an existing matching record as unmatched."
      ],
      codeExamples: [
        {
          title: "Correct unmatched-customer check",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
        },
        {
          title: "Incorrect NULL comparison",
          language: "sql",
          code: `-- Incorrect way to test for NULL.
SELECT order_id
FROM orders
WHERE customer_id = NULL;`
        },
        {
          title: "Correct NULL comparison",
          language: "sql",
          code: `SELECT order_id
FROM orders
WHERE customer_id IS NULL;`
        }
      ],
      bullets: [
        "Use IS NULL to find NULL values.",
        "Use IS NOT NULL to find non-NULL values.",
        "Do not assume a nullable column is NULL only when a joined row is missing.",
        "Use primary keys or other guaranteed non-NULL columns to detect missing matches."
      ]
    },
    {
      id: "unnecessary-distinct",
      title: "7. Avoid Unnecessary DISTINCT",
      paragraphs: [
        "DISTINCT removes duplicate result rows based on all selected columns. It does not fix an incorrect join relationship or repair an aggregate calculated at the wrong grain.",
        "If a customer has two different orders, selecting customer_name alone with DISTINCT may hide the fact that the join produced two order matches. If the task is to count orders, use an appropriate aggregate instead."
      ],
      codeExamples: [
        {
          title: "Return each customer who has at least one order",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);`
        },
        {
          title: "Count the customer's orders",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
        }
      ],
      bullets: [
        "Use EXISTS when you only need to know whether a matching row exists.",
        "Use GROUP BY and COUNT when you need a count.",
        "Use DISTINCT when the requirement genuinely calls for unique selected rows.",
        "Investigate the join cardinality before removing repeated-looking rows."
      ]
    },
    {
      id: "join-types",
      title: "8. Choose the Correct JOIN Type",
      paragraphs: [
        "The selected join type determines which rows survive when matching records are missing. Choosing the wrong type can silently omit required records or introduce unwanted combinations."
      ],
      bullets: [
        "INNER JOIN returns only rows with matching records on both sides.",
        "LEFT JOIN preserves all left-side rows and includes matching right-side data where available.",
        "RIGHT JOIN preserves all right-side rows; it can often be rewritten as a LEFT JOIN by reversing the table order.",
        "FULL OUTER JOIN preserves matching and unmatched rows from both sides where supported.",
        "CROSS JOIN produces every combination of rows from both inputs.",
        "SELF JOIN uses separate aliases to compare rows from the same table."
      ],
      codeExamples: [
        {
          title: "Find customers who have orders",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id;`
        },
        {
          title: "Keep all customers, including those without orders",
          language: "sql",
          code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id;`
        }
      ]
    },
    {
      id: "performance",
      title: "9. JOIN Performance Basics",
      paragraphs: [
        "JOIN performance depends on table size, data distribution, join cardinality, indexes, available memory, database configuration, and the execution plan chosen by the optimizer.",
        "An index can help locate matching rows, but it is not guaranteed to make every query faster. For large scans or low-selectivity conditions, the database may correctly choose a table scan.",
        "Start by verifying the query's correctness, then inspect the execution plan and measure performance before changing indexes or query structure."
      ],
      bullets: [
        "Index columns frequently used in join conditions when the workload benefits from those indexes.",
        "Use EXPLAIN or the database's execution-plan tool to inspect scans, joins, estimated rows, and sorting operations.",
        "Select only the columns the application needs instead of using SELECT * unnecessarily.",
        "Apply selective filters where logically correct, allowing the optimizer to consider them when planning execution.",
        "Check join cardinality and confirm that relationships match the intended data model.",
        "Avoid applying functions or implicit type conversions to join keys when they prevent effective index use.",
        "Do not assume a particular join type or syntax is always faster.",
        "Measure changes with representative data and realistic query parameters."
      ],
      code: {
        language: "sql",
        code: `-- Check whether an equivalent index already exists.
CREATE INDEX idx_orders_customer_id
    ON orders (customer_id);

-- Inspect the execution plan; details vary by database.
EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800
ORDER BY o.order_total DESC;`
      },
      notes: [
        "Index syntax and EXPLAIN output vary by database.",
        "Indexes consume storage and can increase the cost of INSERT, UPDATE, and DELETE operations.",
        "A composite index may help certain filter-and-sort patterns, but index order should be selected based on the workload and execution plan."
      ]
    },
    {
      id: "execution-plan",
      title: "10. Read an Execution Plan at a High Level",
      paragraphs: [
        "An execution plan describes how the database intends to retrieve, match, filter, aggregate, and sort rows. It can help explain why a query is slow or processes more rows than expected.",
        "The exact plan format depends on the database. Look for expensive scans, unexpectedly large intermediate results, repeated operations, expensive sorts, and estimates that differ substantially from actual row counts when actual execution statistics are available."
      ],
      bullets: [
        "Check whether join keys are used as expected.",
        "Compare estimated rows with actual rows when the database provides both.",
        "Look for large intermediate results caused by many-to-many joins or incorrect conditions.",
        "Determine whether filtering happens effectively.",
        "Check whether a sort or aggregation is consuming substantial resources.",
        "Re-test after each meaningful change instead of making multiple unmeasured changes at once."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800;`
      },
      notes: [
        "EXPLAIN commonly shows a planned execution strategy. Some database systems also provide commands or options for collecting actual runtime statistics.",
        "Use production-safe procedures when examining expensive queries on live systems."
      ]
    },
    {
      id: "common-mistakes-checklist",
      title: "11. JOIN Debugging Checklist",
      bullets: [
        "Confirm that each ON condition uses the intended relationship keys.",
        "Check whether the relationship is one-to-one, one-to-many, or many-to-many.",
        "Verify the expected number of result rows.",
        "Check whether a LEFT JOIN must preserve unmatched left-side rows.",
        "Review right-side conditions in WHERE that could remove NULL-extended rows.",
        "Verify NULL handling with IS NULL and IS NOT NULL.",
        "Check whether aggregates are being calculated after unintended row multiplication.",
        "Avoid using DISTINCT to conceal incorrect joins.",
        "Inspect indexes and the execution plan.",
        "Compare the final result with known records or a simpler reference query."
      ]
    },
    {
      id: "practice-beginner",
      title: "12. Practice Exercise: Find Customers Without Orders",
      paragraphs: [
        "Task: Return all customers who have never placed an order. Try solving it with a LEFT JOIN and then with NOT EXISTS."
      ],
      codeExamples: [
        {
          title: "Solution using LEFT JOIN",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
        },
        {
          title: "Solution using NOT EXISTS",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);`
        }
      ],
      notes: [
        "Both queries express the same unmatched-customer requirement.",
        "The actual output depends on the data in customers and orders."
      ]
    },
    {
      id: "practice-intermediate",
      title: "13. Practice Exercise: Count Orders Correctly",
      paragraphs: [
        "Task: Display every customer and their order count. Customers without orders must appear with a count of zero."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      bullets: [
        "Why is LEFT JOIN required?",
        "Why is COUNT(o.order_id) more appropriate than COUNT(*)?",
        "What would happen if the query used INNER JOIN instead?"
      ],
      notes: [
        "COUNT(o.order_id) returns zero for a customer with no matching order.",
        "INNER JOIN would omit customers without orders."
      ]
    },
    {
      id: "practice-advanced",
      title: "14. Practice Exercise: Diagnose Inflated Totals",
      paragraphs: [
        "Task: An order total appears too large after joining orders with order_items. Explain the likely cause and write a query that calculates customer totals without multiplying order-level amounts."
      ],
      code: {
        language: "sql",
        code: `WITH customer_order_summary AS (
    SELECT
        customer_id,
        SUM(order_total) AS total_spending
    FROM orders
    GROUP BY customer_id
)
SELECT
    c.customer_id,
    c.customer_name,
    COALESCE(s.total_spending, 0) AS total_spending
FROM customers AS c
LEFT JOIN customer_order_summary AS s
    ON c.customer_id = s.customer_id
ORDER BY total_spending DESC, c.customer_id ASC;`
      },
      bullets: [
        "The original join may repeat an order's total for every order item.",
        "The CTE calculates one total per customer before joining customers.",
        "If item-level revenue is required instead, aggregate the appropriate item-level amount rather than the repeated order-level total."
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision Notes",
      bullets: [
        "Use the correct join condition to match related records.",
        "CROSS JOIN deliberately creates every combination of input rows.",
        "Repeated-looking rows may be valid results of a one-to-many relationship.",
        "Multiple one-to-many joins can multiply rows and inflate aggregates.",
        "Aggregate measures at the correct grain before combining independent child collections.",
        "A WHERE condition on a right-side column can remove unmatched LEFT JOIN rows.",
        "Use IS NULL to check NULL values.",
        "Use DISTINCT only when unique selected rows are genuinely required.",
        "Indexes can help joins, but their value depends on the query and workload.",
        "Use EXPLAIN to investigate execution plans.",
        "Measure performance changes with representative data."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Why can a JOIN produce duplicate-looking rows?",
          answer:
            "A one-to-many or many-to-many relationship can produce multiple valid matching rows for a single record. The rows may represent different related records rather than accidental duplicates."
        },
        {
          question: "How do you investigate a slow JOIN?",
          answer:
            "Inspect the execution plan with EXPLAIN, verify join conditions, review indexes, and examine the number of rows processed and the cost of sorting or aggregation."
        },
        {
          question: "Why can a LEFT JOIN unexpectedly remove rows?",
          answer:
            "A WHERE condition on the right table can filter out rows where right-side columns are NULL. If unmatched left-side rows must remain, evaluate whether the condition belongs in ON instead."
        },
        {
          question: "Does adding an index always make a JOIN faster?",
          answer:
            "No. The benefit depends on the query, data distribution, table size, indexes, write workload, and optimizer's execution plan."
        },
        {
          question: "Why can totals be inflated after multiple joins?",
          answer:
            "Joining one-to-many relationships can repeat measures from a parent table. Aggregate the relevant data at the correct grain before joining when necessary."
        },
        {
          question: "What is a Cartesian product?",
          answer:
            "It contains every possible combination of rows from two input tables. If the tables contain M and N rows, the result contains M multiplied by N rows."
        },
        {
          question: "How do you find customers without orders?",
          answer:
            "Use LEFT JOIN followed by WHERE o.order_id IS NULL, or use a correlated NOT EXISTS subquery."
        },
        {
          question: "When should you use EXISTS instead of JOIN?",
          answer:
            "Use EXISTS when the requirement is to test whether at least one matching row exists without needing columns from the matching table. It avoids multiplying the outer rows due to multiple matches."
        },
        {
          question: "Why should DISTINCT not be used to fix every duplicate?",
          answer:
            "DISTINCT removes duplicate selected result rows but does not correct a wrong relationship or an aggregate calculated at the wrong grain."
        },
        {
          question: "What is join cardinality?",
          answer:
            "Join cardinality describes how many rows are expected to result from matching the input tables. It depends on table sizes, relationships, key uniqueness, and data distribution."
        },
        {
          question: "What is the difference between a primary key and a foreign key?",
          answer:
            "A primary key uniquely identifies a row in its table. A foreign key represents a relationship to a key in another table and can enforce referential integrity when the constraint is defined."
        },
        {
          question: "How do indexes improve JOIN performance?",
          answer:
            "An appropriate index can help the database locate matching rows without scanning an entire table. Whether it improves the query depends on selectivity, the execution plan, and the workload."
        }
      ]
    }
  ]
};
