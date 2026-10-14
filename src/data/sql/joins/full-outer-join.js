
export const fullOuterJoin = {
  id: 2057,
  title: "FULL OUTER JOIN",
  slug: "full-outer-join",
  topicTitle: "SQL Joins",
  description:
    "Understand FULL OUTER JOIN and how to return matching and unmatched rows from both tables, including NULL handling, database compatibility, UNION alternatives, data reconciliation, and practical reporting.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "full-intro",
      title: "1. What Is FULL OUTER JOIN?",
      paragraphs: [
        "FULL OUTER JOIN combines rows from two tables using a matching condition. It returns matching rows, unmatched rows from the left table, and unmatched rows from the right table.",
        "When a left-side row has no matching right-side row, the right-side columns contain NULL. When a right-side row has no matching left-side row, the left-side columns contain NULL.",
        "Unlike INNER JOIN, which keeps only matching combinations, FULL OUTER JOIN preserves unmatched records from both tables. It is useful when you need to compare two datasets without losing records that exist in only one of them.",
        "PostgreSQL supports FULL OUTER JOIN directly. MySQL does not support native FULL OUTER JOIN syntax, so a query can be constructed using LEFT JOIN and an appropriate UNION strategy."
      ],
      bullets: [
        "Matching records: columns from both tables are returned.",
        "Left-only records: left-side values appear and right-side values are NULL.",
        "Right-only records: right-side values appear and left-side values are NULL.",
        "One-to-many matches can produce multiple result rows.",
        "FULL JOIN is a commonly used shorthand for FULL OUTER JOIN."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY c.customer_name, o.order_id;`
      },
      paragraphs: [
        "The query is valid in PostgreSQL and other databases that support native FULL OUTER JOIN syntax. It will not run as written in MySQL.",
        "A full outer join is especially helpful when comparing records from two systems, such as customers in one database and orders in another, where either side may contain unmatched data."
      ]
    },
    {
      id: "full-postgres",
      title: "2. PostgreSQL Example",
      paragraphs: [
        "PostgreSQL can execute FULL OUTER JOIN directly. Suppose the customers table contains Ravi, Priya, and Anu, while the orders table contains orders for Ravi and Priya plus one order that references a nonexistent customer.",
        "The result contains every customer and every order. Anu appears without an order, and the unmatched order appears without customer details.",
        "The example assumes the unmatched order is permitted by the schema and has already been inserted. An enforced foreign key may prevent such an inconsistent reference."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id,
    o.order_total
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY
    c.customer_id NULLS LAST,
    o.order_id NULLS LAST;`
      },
      output: `customer_id  customer_name  order_id  order_customer_id  order_total
-----------  -------------  --------  -----------------  -----------
1            Ravi           101       1                  1500.00
1            Ravi           102       1                  2500.00
2            Priya          103       2                  1800.00
3            Anu            NULL      NULL               NULL
NULL         NULL           104       99                 900.00`,
      paragraphs: [
        "Ravi appears twice because he has two orders. Priya appears once because she has one order. Anu is preserved from the customers table, while order 104 is preserved from the orders table.",
        "The order_customer_id column is selected separately from c.customer_id to distinguish an unmatched order's stored customer reference from the missing customer record.",
        "The NULLS LAST syntax in ORDER BY is supported by PostgreSQL. Other databases may use different ordering syntax or defaults."
      ]
    },
    {
      id: "full-mysql",
      title: "3. MySQL Alternative Using UNION",
      paragraphs: [
        "MySQL does not directly support FULL OUTER JOIN. One common alternative is to combine a LEFT JOIN result with a RIGHT JOIN result using UNION.",
        "The LEFT JOIN portion preserves all customers. The RIGHT JOIN portion preserves all orders. UNION combines the results and removes duplicate result rows.",
        "This basic approach is useful for learning and for queries where set-based duplicate removal is appropriate. In production, choose the exact combination strategy based on the intended row identity and duplicate semantics."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id

UNION

SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id,
    o.order_total
FROM customers AS c
RIGHT JOIN orders AS o
    ON c.customer_id = o.customer_id;`
      },
      output: `The combined result contains matching rows, customers without orders, and orders without matching customers. Exact row order is not guaranteed without ORDER BY.`,
      bullets: [
        "UNION combines result sets and removes duplicate complete rows.",
        "Both SELECT statements must return the same number of columns in compatible positions.",
        "UNION can require additional work to identify duplicate rows.",
        "UNION ALL retains duplicate result rows and needs more careful handling.",
        "Add ORDER BY at the end of the combined query if a specific result order is required."
      ],
      paragraphs: [
        "For the sample relationship, a matching customer-order pair appears in both join results, but UNION removes the identical combined row. Left-only and right-only records remain in the final result."
      ]
    },
    {
      id: "full-union-all",
      title: "4. UNION vs UNION ALL",
      paragraphs: [
        "UNION and UNION ALL both combine the results of multiple SELECT statements. The difference is duplicate handling.",
        "UNION removes duplicate complete result rows. UNION ALL preserves all result rows, including duplicates.",
        "When constructing a full outer join manually, using UNION ALL with two unrestricted outer joins can duplicate every matching pair because matched rows appear in both branches.",
        "A common alternative is to use a LEFT JOIN for the first branch and then append only unmatched right-side rows from the second branch. This allows UNION ALL to preserve legitimate duplicate records without repeating the matching rows from both branches."
      ],
      code: {
        language: "sql",
        code: `-- MySQL: FULL OUTER JOIN pattern using UNION ALL
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id

UNION ALL

SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id,
    o.order_total
FROM customers AS c
RIGHT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;`
      },
      paragraphs: [
        "The second branch includes only orders without a matching customer. Because the first branch already includes every customer and every matching order, the unmatched-only second branch adds the remaining right-side records.",
        "This version assumes c.customer_id is a non-NULL primary key. Testing that key with IS NULL correctly identifies the NULL-extended rows created by the RIGHT JOIN.",
        "UNION ALL avoids global duplicate removal. It is often the more precise choice when the two branches are deliberately designed not to overlap and legitimate repeated values must be retained."
      ]
    },
    {
      id: "full-unmatched-left",
      title: "5. Find Records Existing Only in the Left Table",
      paragraphs: [
        "A full outer join can be used to identify left-only records. After joining both tables, unmatched customers have NULL in the right-side order identifier.",
        "Testing a right-side primary key with IS NULL finds customers that have no matching order. This is useful for listing inactive customers or records that do not have a corresponding transaction."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      paragraphs: [
        "This query uses native FULL OUTER JOIN syntax and therefore runs in PostgreSQL, not MySQL. Since the requirement is to return all customers without orders, a simpler LEFT JOIN or NOT EXISTS query may be more appropriate."
      ],
      code: {
        language: "sql",
        code: `-- Simpler alternative
SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;`
      }
    },
    {
      id: "full-unmatched-right",
      title: "6. Find Records Existing Only in the Right Table",
      paragraphs: [
        "A full outer join can also identify right-only records. For example, orders that have no matching customer contain NULL in the customer columns.",
        "This pattern helps find orphaned references, inconsistent imported data, and records that need reconciliation."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    o.customer_id,
    o.order_total
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL
ORDER BY o.order_id;`
      },
      output: `order_id  customer_id  order_total
--------  -----------  -----------
104       99           900.00`,
      paragraphs: [
        "This example assumes order 104 references customer 99 and that no customer with that ID exists. The query uses PostgreSQL's native syntax.",
        "If the task is only to find orders without customers, NOT EXISTS against orders is a direct alternative and works in MySQL as well."
      ]
    },
    {
      id: "full-filter",
      title: "7. ON Conditions and WHERE Conditions",
      paragraphs: [
        "The ON clause controls which rows match between the two tables. The WHERE clause filters the completed join result.",
        "For a FULL OUTER JOIN, moving a condition between ON and WHERE can change which unmatched rows survive. A condition in ON may prevent records from matching while preserving each unmatched row from either side.",
        "A WHERE condition that rejects NULL values from one side can remove unmatched rows from that side, so the final query may no longer behave like a complete full outer join."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL: preserve both sides while matching
-- only customers with customer_id = 1
SELECT
    c.customer_name,
    o.order_id
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
   AND c.customer_id = 1
ORDER BY c.customer_name NULLS LAST, o.order_id NULLS LAST;`
      },
      paragraphs: [
        "With the additional ON condition, orders belonging to other customers do not match the customer table in this query, but those orders are still preserved as unmatched right-side rows. Customers other than Ravi also remain as unmatched left-side rows.",
        "Moving c.customer_id = 1 to WHERE would filter the completed result and remove rows whose customer_id is NULL or is not 1. The result would be different."
      ]
    },
    {
      id: "full-aggregate",
      title: "8. FULL OUTER JOIN with Aggregation",
      paragraphs: [
        "FULL OUTER JOIN can be combined with aggregate functions to compare counts or totals across datasets. The key is to choose a grouping key that identifies the entity being compared.",
        "For a simple customer-to-orders relationship, group by customer_id and count order IDs to count matched orders. However, a full join that includes unmatched orders needs careful treatment because an order without a customer has no matching customer key.",
        "For reconciliation reports, consider using a coalesced key so that the identifier from whichever side exists can be displayed."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL example
SELECT
    COALESCE(c.customer_id, o.customer_id) AS customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_order_value
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY
    COALESCE(c.customer_id, o.customer_id),
    c.customer_name
ORDER BY customer_id;`
      },
      output: `customer_id  customer_name  order_count  total_order_value
-----------  -------------  -----------  -----------------
1            Ravi           2            4000.00
2            Priya          1            1800.00
3            Anu            0            0.00
99           NULL           1            900.00`,
      paragraphs: [
        "COALESCE(c.customer_id, o.customer_id) selects the customer ID when a customer exists; otherwise, it uses the order's stored customer_id. This allows unmatched orders to appear under their referenced ID.",
        "COUNT(o.order_id) counts matched orders when order_id is a non-NULL primary key. COALESCE converts a NULL SUM to zero for display.",
        "The query is PostgreSQL syntax. For MySQL, use the LEFT JOIN plus unmatched-right UNION ALL pattern, then aggregate the resulting dataset carefully."
      ]
    },
    {
      id: "full-null-values",
      title: "9. Understanding NULL Values",
      paragraphs: [
        "NULL in a full outer join result may indicate that a record from the other table does not exist. But a NULL can also be stored in a nullable column of a matching record.",
        "Use a table's non-NULL primary key to determine whether a row matched. Do not infer that a record is missing solely because a nullable descriptive column is NULL.",
        "Use IS NULL and IS NOT NULL to test for NULL values. Comparisons such as column = NULL do not correctly test for NULL."
      ],
      bullets: [
        "Left-side primary key is NULL: often indicates a right-only row created by the join.",
        "Right-side primary key is NULL: often indicates a left-only row created by the join.",
        "Both primary keys are present: the rows matched according to the ON condition.",
        "A nullable name or description alone is not a reliable match indicator.",
        "Use COALESCE when one displayed key should come from whichever side exists."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL: classify the join result
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    CASE
        WHEN c.customer_id IS NULL THEN 'RIGHT ONLY'
        WHEN o.order_id IS NULL THEN 'LEFT ONLY'
        ELSE 'MATCHED'
    END AS match_status
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY match_status, c.customer_id, o.order_id;`
      },
      paragraphs: [
        "The CASE expression labels each result as matched, left-only, or right-only. It assumes customer_id and order_id are non-NULL primary keys for existing records."
      ]
    },
    {
      id: "full-common-mistakes",
      title: "10. Common FULL OUTER JOIN Mistakes",
      paragraphs: [
        "FULL OUTER JOIN queries can be difficult to reason about when unmatched records, duplicate rows, and NULL values are involved."
      ],
      bullets: [
        "Mistake: using FULL OUTER JOIN in MySQL. Fix: use a LEFT JOIN plus an unmatched-right branch, commonly combined with UNION ALL.",
        "Mistake: using two unrestricted outer joins with UNION ALL. Fix: prevent the matching rows from appearing in both branches.",
        "Mistake: assuming UNION ALL removes duplicates. Fix: remember that only UNION removes duplicate complete rows.",
        "Mistake: assuming UNION removes duplicate business records. Fix: understand that it removes identical result rows based on all selected columns.",
        "Mistake: using a nullable column to identify unmatched rows. Fix: test a non-NULL primary key.",
        "Mistake: forgetting ORDER BY when a predictable output order is required. Fix: add a final ORDER BY to the combined query.",
        "Mistake: moving conditions between ON and WHERE without checking the result. Fix: decide whether the condition restricts matching or filters the final rows.",
        "Mistake: aggregating after a join that multiplies rows. Fix: establish the correct reporting grain and pre-aggregate when necessary."
      ],
      code: {
        language: "sql",
        code: `-- MySQL pattern: preserve all customers and all orders
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id

UNION ALL

SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
RIGHT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL
ORDER BY customer_id, order_id;`
      },
      paragraphs: [
        "The unmatched-right filter ensures that matching rows are not repeated in the second branch. The final ORDER BY is applied to the combined result."
      ]
    },
    {
      id: "full-real-world",
      title: "11. Real-World Applications",
      paragraphs: [
        "FULL OUTER JOIN is particularly useful when comparing two populations that may contain records absent from the other population."
      ],
      bullets: [
        "Data migration: compare customer records in a source database with records in a target database.",
        "Financial reconciliation: compare transactions from a bank statement with internal ledger transactions.",
        "Inventory reconciliation: compare physical stock records with the inventory management system.",
        "Reporting: identify customers, products, or accounts present in one dataset but missing from another.",
        "Data integration: combine records from two systems while retaining records that have no counterpart.",
        "Quality checks: classify records as matched, left-only, or right-only for investigation."
      ],
      paragraphs: [
        "For reconciliation tasks, joining on a stable business key is important. If the key is not unique on either side, one record may match several records and create multiple result rows. Validate the key and the expected relationship before interpreting totals."
      ]
    },
    {
      id: "full-performance",
      title: "12. Performance and Indexing",
      paragraphs: [
        "FULL OUTER JOIN can require more work than a simple inner join because the database must preserve matching records and unmatched records from both sides. Actual performance depends on the database engine, table sizes, indexes, predicates, and execution plan.",
        "Index the columns used in the join condition when appropriate, and inspect the execution plan for expensive queries. Avoid selecting unnecessary columns and check whether either side contains repeated join keys.",
        "In MySQL, a manually constructed full outer join has two query branches. UNION may require duplicate elimination, while UNION ALL avoids that operation but requires the second branch to return only unmatched rows when using this pattern."
      ],
      bullets: [
        "Use suitable indexes on join keys.",
        "Use primary keys or other reliable identifiers to detect unmatched rows.",
        "Inspect the execution plan with EXPLAIN or the database's equivalent.",
        "Avoid unnecessary columns in the combined result.",
        "Choose UNION or UNION ALL according to the intended duplicate behavior.",
        "Check for duplicate join keys that can multiply result rows.",
        "Do not assume that one query formulation is always faster across database engines."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL example
EXPLAIN
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id;`
      },
      paragraphs: [
        "PostgreSQL EXPLAIN shows the optimizer's planned execution strategy. MySQL does not accept the native FULL OUTER JOIN query; inspect the plan for the MySQL-compatible UNION ALL formulation instead."
      ]
    },
    {
      id: "full-practice-beginner",
      title: "13. Practice Exercise 1: Return All Customers and Orders",
      paragraphs: [
        "Task: in PostgreSQL, return every customer and every order. Show customer details for matching orders and retain customers or orders that do not have a match."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY
    c.customer_id NULLS LAST,
    o.order_id NULLS LAST;`
      },
      bullets: [
        "Why FULL OUTER JOIN? Both unmatched left-side and right-side records must remain.",
        "What happens to an unmatched customer? The order columns are NULL.",
        "What happens to an unmatched order? The customer columns are NULL.",
        "Which database supports this syntax directly? PostgreSQL does; MySQL does not."
      ]
    },
    {
      id: "full-practice-intermediate",
      title: "14. Practice Exercise 2: Find Only Unmatched Records",
      paragraphs: [
        "Task: find records that exist on only one side of the join. Include unmatched customers and unmatched orders."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id,
    o.customer_id AS order_customer_id
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL
   OR o.order_id IS NULL
ORDER BY
    c.customer_id NULLS LAST,
    o.order_id NULLS LAST;`
      },
      output: `customer_id  customer_name  order_id  order_customer_id
-----------  -------------  --------  -----------------
3            Anu            NULL      NULL
NULL         NULL           104       99`,
      paragraphs: [
        "This output assumes the sample data includes Anu without orders and order 104 referencing customer 99. The condition retains rows where either side's non-NULL primary key is absent."
      ]
    },
    {
      id: "full-practice-advanced",
      title: "15. Practice Exercise 3: Classify Matching Status",
      paragraphs: [
        "Task: classify each joined result as MATCHED, LEFT ONLY, or RIGHT ONLY. Use primary keys to determine whether a row exists on each side."
      ],
      code: {
        language: "sql",
        code: `-- PostgreSQL
SELECT
    COALESCE(c.customer_id, o.customer_id) AS customer_id,
    c.customer_name,
    o.order_id,
    CASE
        WHEN c.customer_id IS NULL THEN 'RIGHT ONLY'
        WHEN o.order_id IS NULL THEN 'LEFT ONLY'
        ELSE 'MATCHED'
    END AS match_status
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY match_status, customer_id, o.order_id;`
      },
      bullets: [
        "MATCHED means both primary keys are present.",
        "LEFT ONLY means a customer exists without a matching order.",
        "RIGHT ONLY means an order exists without a matching customer.",
        "COALESCE returns the first non-NULL customer identifier available from either side."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does FULL OUTER JOIN return?",
          answer:
            "It returns matching rows and unmatched rows from both tables. Missing-side columns are NULL."
        },
        {
          question: "Does MySQL support FULL OUTER JOIN directly?",
          answer:
            "No. A common alternative uses LEFT JOIN to return all left-side rows and a second branch to return only unmatched right-side rows, combined with UNION ALL."
        },
        {
          question: "What is the difference between LEFT JOIN and FULL OUTER JOIN?",
          answer:
            "LEFT JOIN preserves every left-side row, while FULL OUTER JOIN preserves unmatched rows from both sides."
        },
        {
          question: "What is the difference between FULL OUTER JOIN and INNER JOIN?",
          answer:
            "INNER JOIN returns matching combinations only. FULL OUTER JOIN also returns unmatched records from both tables."
        },
        {
          question: "What does UNION do in the MySQL alternative?",
          answer:
            "UNION combines result sets and removes duplicate complete rows."
        },
        {
          question: "Why might UNION ALL be preferable in a manual full join?",
          answer:
            "UNION ALL avoids duplicate elimination. When the second branch returns only unmatched right-side rows, it can preserve the intended records without repeating matched rows."
        },
        {
          question: "Can FULL OUTER JOIN produce duplicate-looking rows?",
          answer:
            "Yes. One-to-many or many-to-many matches can produce multiple result rows. The rows may represent distinct matching combinations."
        },
        {
          question: "How do you identify unmatched left-side records?",
          answer:
            "Use FULL OUTER JOIN and filter for a non-NULL right-side primary key that is NULL in the result. A LEFT JOIN with IS NULL or NOT EXISTS may be simpler if only left-side records are needed."
        },
        {
          question: "How do you identify unmatched right-side records?",
          answer:
            "Use FULL OUTER JOIN and filter for a NULL left-side primary key, or use NOT EXISTS against the right-side table."
        },
        {
          question: "Why should a primary key be used to detect unmatched records?",
          answer:
            "A primary key is non-NULL for every existing record, so a NULL value in the joined output reliably indicates that the corresponding row was not matched."
        },
        {
          question: "What is the difference between ON and WHERE in a full outer join?",
          answer:
            "ON determines which rows match. WHERE filters the completed join result and can remove unmatched records."
        },
        {
          question: "Can FULL OUTER JOIN be used for data reconciliation?",
          answer:
            "Yes. It allows matched records, left-only records, and right-only records to be compared in a single result."
        },
        {
          question: "How can FULL OUTER JOIN performance be improved?",
          answer:
            "Use suitable indexes, avoid unnecessary columns, inspect execution plans, and check whether duplicate join keys multiply the result."
        }
      ]
    },
    {
      id: "full-revision",
      title: "17. Quick Revision Notes",
      bullets: [
        "FULL OUTER JOIN preserves matching rows and unmatched rows from both tables.",
        "Unmatched left-side records have NULL in right-side columns.",
        "Unmatched right-side records have NULL in left-side columns.",
        "PostgreSQL supports FULL OUTER JOIN directly; MySQL does not.",
        "A MySQL-compatible pattern uses LEFT JOIN plus an unmatched-right branch with UNION ALL.",
        "UNION removes duplicate complete rows; UNION ALL retains them.",
        "Two unrestricted outer-join branches with UNION ALL can repeat matched rows.",
        "Use primary keys to identify unmatched records reliably.",
        "Use IS NULL rather than = NULL.",
        "ON determines matching; WHERE filters the joined result.",
        "One-to-many relationships can multiply result rows.",
        "FULL OUTER JOIN is useful for data reconciliation and completeness reports."
      ],
      paragraphs: [
        "Memory trick: FULL OUTER JOIN means keep everything from BOTH tables. Matching rows are combined, and unmatched rows from either side remain with NULL values for the missing side."
      ]
    }
  ]
};
