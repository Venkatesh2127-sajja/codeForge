
export const unmatchedRecordsJoins = {
  id: 2063,
  title: "Finding Unmatched Records with JOINs",
  slug: "unmatched-records-joins",
  topicTitle: "SQL Joins",
  description:
    "Find records without matching rows using LEFT JOIN, NULL checks, NOT EXISTS, and anti-join patterns.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "customers-without-orders",
      title: "1. Find Customers Without Orders",
      paragraphs: [
        "In a relational database, a customer can exist without placing an order. Finding these customers is a common reporting and data-validation task.",
        "A LEFT JOIN preserves every row from the left table, even when there is no matching row in the right table. When no matching order exists, the columns selected from orders contain NULL.",
        "Filtering on o.order_id IS NULL identifies customers without a matching order, provided order_id is a non-nullable key such as a primary key."
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
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "customers is the left table.",
        "orders is the right table.",
        "ON matches customers to orders using customer_id.",
        "WHERE o.order_id IS NULL keeps only customers without a matching order.",
        "The result includes Anu because customer 3 has no order."
      ],
      notes: [
        "The output assumes the supplied sample data contains customers Ravi, Priya, and Anu, with no orders for Anu.",
        "This query finds customers without any matching order. It does not find customers whose orders merely fail a particular business condition."
      ]
    },
    {
      id: "orders-without-customers",
      title: "2. Find Orders Without Matching Customers",
      paragraphs: [
        "The unmatched-record search can also work in the opposite direction. Sometimes an orders table contains a customer_id that does not correspond to any row in customers.",
        "This can happen in legacy systems, imported data, or databases where referential integrity is not enforced. If a foreign key is correctly enforced, an invalid non-NULL customer reference should normally be prevented.",
        "Start with orders and LEFT JOIN customers. A NULL value for the customer's primary key indicates that the order has no matching customer."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    o.customer_id
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;`
      },
      bullets: [
        "orders is the left table, so every order is initially preserved.",
        "customers is the right table.",
        "A matching customer supplies a non-NULL customer primary key.",
        "An unmatched order has NULL in c.customer_id.",
        "The query returns only the orders without a matching customer."
      ],
      notes: [
        "No output is specified because the original lesson does not provide an example of an order with an invalid customer reference.",
        "If orders.customer_id itself is nullable, a NULL customer_id will also fail to match an ordinary equality condition. Decide whether such orders should be included in the data-quality report."
      ]
    },
    {
      id: "not-exists",
      title: "3. Find Unmatched Rows with NOT EXISTS",
      paragraphs: [
        "NOT EXISTS is another way to find records that have no related record in another table. It tests whether a correlated subquery returns zero rows for the current outer row.",
        "The subquery references c.customer_id from the outer customers query. If no order has that customer_id, NOT EXISTS evaluates to true and the customer is returned.",
        "This approach expresses the absence of a relationship directly and is commonly used for anti-join queries."
      ],
      code: {
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
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "The outer query examines customers one at a time logically.",
        "The subquery searches for an order belonging to the current customer.",
        "SELECT 1 is a conventional way to express that only the existence of a row matters.",
        "If at least one matching order exists, NOT EXISTS is false.",
        "If no matching order exists, NOT EXISTS is true."
      ],
      notes: [
        "The database optimizer may transform this query into an efficient anti-join plan.",
        "The result assumes the same sample data as the LEFT JOIN example."
      ]
    },
    {
      id: "anti-join-warning",
      title: "4. Avoid Incorrect NULL Checks",
      paragraphs: [
        "When finding unmatched records with LEFT JOIN, check a right-side column that cannot be NULL for a real matching row, such as its primary key.",
        "A nullable business column can contain NULL even when a matching row exists. Checking that column could incorrectly classify a matched record as unmatched.",
        "For example, if a customer's order exists but its optional notes column is NULL, checking o.notes IS NULL does not prove that the customer has no orders."
      ],
      codeExamples: [
        {
          title: "Incorrect when the checked column is nullable",
          language: "sql",
          code: `-- An existing order can have NULL notes.
-- This may incorrectly classify a customer as unmatched.
SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.notes IS NULL;`
        },
        {
          title: "Correct unmatched-order check",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
        }
      ],
      bullets: [
        "Prefer a primary key or another guaranteed non-NULL column from the right table.",
        "IS NULL tests for a NULL value; = NULL does not correctly test for NULL.",
        "A NULL in a nullable data column is not the same as the absence of a matching row."
      ]
    },
    {
      id: "not-exists-vs-left-join",
      title: "5. Compare NOT EXISTS and LEFT JOIN",
      paragraphs: [
        "Both NOT EXISTS and LEFT JOIN with an IS NULL filter can find rows without a match. The best expression depends on the task, the query structure, and readability.",
        "NOT EXISTS is often concise when the only question is whether a related row exists. LEFT JOIN can be convenient when the query already uses joins or when unmatched rows need to be understood alongside other joined data.",
        "Modern database optimizers may produce similar execution plans for equivalent queries. Do not assume one is always faster without checking the actual plan and workload."
      ],
      codeExamples: [
        {
          title: "Using LEFT JOIN",
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
          title: "Using NOT EXISTS",
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
      bullets: [
        "Both examples return customers who have no matching order.",
        "LEFT JOIN makes the unmatched row visible through NULL values in the right-side columns.",
        "NOT EXISTS directly expresses that no related row exists.",
        "For equivalent conditions, the expected results should agree."
      ]
    },
    {
      id: "not-in-warning",
      title: "6. Why NOT IN Can Be Risky with NULL",
      paragraphs: [
        "NOT IN is sometimes used to find values absent from another query. However, if the subquery returns NULL, SQL's three-valued logic can make the comparison UNKNOWN rather than TRUE, causing rows to be excluded unexpectedly.",
        "NOT EXISTS avoids this particular problem because it checks whether a matching row exists rather than comparing a value against a set that may contain NULL."
      ],
      codeExamples: [
        {
          title: "Potentially surprising NOT IN query",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE c.customer_id NOT IN (
    SELECT o.customer_id
    FROM orders AS o
);`
        },
        {
          title: "Safer existence-based alternative",
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
      bullets: [
        "NOT IN is safe from this specific issue when the subquery's returned values are guaranteed not to contain NULL.",
        "If orders.customer_id can be NULL, the NOT IN query may return no customers even when unmatched customers exist.",
        "NOT EXISTS is usually a straightforward choice for expressing a missing relationship."
      ]
    },
    {
      id: "unmatched-with-condition",
      title: "7. Find Customers Without Recent Orders",
      paragraphs: [
        "Sometimes a business needs records without a matching row that satisfies a particular condition, rather than records without any related row at all.",
        "For example, to find customers who have not placed an order since a particular date, put the date condition inside the NOT EXISTS subquery. A customer may have older orders and still qualify."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
      AND o.order_date >= '2026-01-01'
)
ORDER BY c.customer_id;`
      },
      bullets: [
        "The subquery looks only for orders dated on or after January 1, 2026.",
        "A customer is returned if no order satisfies both the customer match and date condition.",
        "Older orders do not disqualify a customer.",
        "Use a date literal and comparison appropriate to the database and the data type."
      ],
      notes: [
        "This example assumes orders has an order_date column.",
        "The result depends on the actual order dates and is not specified by the original sample."
      ]
    },
    {
      id: "unmatched-specific-items",
      title: "8. Find Customers Without Orders Above a Threshold",
      paragraphs: [
        "A common variation is to find customers who have no order meeting a minimum total. This is different from finding customers who have no orders at all.",
        "Place the amount condition inside NOT EXISTS so that only orders meeting the threshold count as matches."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
      AND o.order_total >= 1800
)
ORDER BY c.customer_id;`
      },
      bullets: [
        "Customers with an order of 1800 or more are excluded.",
        "Customers with only smaller orders are included.",
        "Customers with no orders are also included.",
        "Change >= to > if an order worth exactly 1800 should not count as a qualifying match."
      ],
      notes: [
        "This example assumes orders contains an order_total column.",
        "The result depends on the actual data in the orders table."
      ]
    },
    {
      id: "unmatched-data-quality",
      title: "9. Use Unmatched Queries for Data Quality",
      paragraphs: [
        "Unmatched-record queries are useful for validating imported data, detecting broken relationships, identifying incomplete workflows, and checking whether related business records exist.",
        "For example, orders that refer to nonexistent customers may indicate an import issue or missing referential integrity. Customers without orders may simply be new customers, so the meaning of an unmatched record depends on the business requirement."
      ],
      codeExamples: [
        {
          title: "Detect orders referencing missing customers",
          language: "sql",
          code: `SELECT
    o.order_id,
    o.customer_id
FROM orders AS o
WHERE NOT EXISTS (
    SELECT 1
    FROM customers AS c
    WHERE c.customer_id = o.customer_id
);`
        },
        {
          title: "Find products that have never been ordered",
          language: "sql",
          code: `SELECT
    p.product_id,
    p.product_name
FROM products AS p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items AS oi
    WHERE oi.product_id = p.product_id
);`
        }
      ],
      bullets: [
        "Validate foreign-key relationships after data imports.",
        "Find catalog records that have never been used in a transaction.",
        "Identify customers without activity for a specified period.",
        "Investigate unmatched rows before deleting or changing data.",
        "Use database constraints to prevent invalid relationships where appropriate."
      ],
      notes: [
        "The products example assumes products and order_items tables with the indicated columns.",
        "An unmatched row is not necessarily an error; interpret it using the business rules."
      ]
    },
    {
      id: "unmatched-performance",
      title: "10. Performance and Indexing",
      paragraphs: [
        "Unmatched-record queries often search for related rows using a key such as customer_id. Indexes on these relationship columns can help the database check whether a match exists efficiently.",
        "The best plan depends on table size, indexes, data distribution, database engine, and query conditions. Inspect the actual execution plan rather than assuming one syntax is always faster."
      ],
      bullets: [
        "Make sure relationship columns use compatible data types.",
        "Consider an index on orders.customer_id for frequent customer-to-order existence checks.",
        "If filtering by a date as well as customer ID, evaluate indexes based on the real query workload.",
        "Use EXPLAIN or the database's execution-plan tools.",
        "Avoid returning unnecessary columns from diagnostic queries.",
        "Use foreign-key constraints when the data model requires every order to reference a valid customer."
      ],
      code: {
        language: "sql",
        code: `-- Check for an existing equivalent index first.
CREATE INDEX idx_orders_customer_id
    ON orders (customer_id);

-- Inspect the query plan; output varies by database.
EXPLAIN
SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);`
      },
      notes: [
        "Index creation syntax and EXPLAIN behavior vary by database.",
        "Indexes require storage and can increase the cost of writes.",
        "An optimizer may choose a scan instead of an index when it estimates that the scan is cheaper."
      ]
    },
    {
      id: "unmatched-common-mistakes",
      title: "11. Common Mistakes and Fixes",
      bullets: [
        "Mistake: checking a nullable right-side business column for NULL. Fix: check the right-side primary key or another guaranteed non-NULL column.",
        "Mistake: using = NULL. Fix: use IS NULL or IS NOT NULL.",
        "Mistake: using NOT IN with a subquery that can return NULL. Fix: consider NOT EXISTS.",
        "Mistake: assuming a customer without a recent order has never ordered. Fix: put the date condition inside the existence test and interpret the result correctly.",
        "Mistake: reversing the LEFT JOIN tables without changing the NULL check. Fix: identify which table must be preserved and which table is being tested for a match.",
        "Mistake: treating every unmatched record as corrupt data. Fix: distinguish legitimate missing relationships from data-quality problems.",
        "Mistake: assuming NOT EXISTS is always faster than LEFT JOIN. Fix: compare equivalent query plans on representative data."
      ]
    },
    {
      id: "unmatched-practice-beginner",
      title: "12. Practice Exercise: Find Customers Without Orders",
      paragraphs: [
        "Task: Return the IDs and names of all customers who have never placed an order.",
        "Try writing the query with LEFT JOIN first, then solve the same problem using NOT EXISTS."
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
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      notes: [
        "Both solutions should return the same customers for these equivalent conditions.",
        "The sample assumes customer 3 has no orders."
      ]
    },
    {
      id: "unmatched-practice-intermediate",
      title: "13. Practice Exercise: Find Products Never Ordered",
      paragraphs: [
        "Task: Find products that do not appear in any order_items row.",
        "Assume products has product_id and product_name, while order_items has product_id."
      ],
      code: {
        language: "sql",
        code: `SELECT
    p.product_id,
    p.product_name
FROM products AS p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items AS oi
    WHERE oi.product_id = p.product_id
)
ORDER BY p.product_id;`
      },
      bullets: [
        "Why is NOT EXISTS suitable for this task?",
        "How could a LEFT JOIN and IS NULL express the same requirement?",
        "What index might help the database check order_items.product_id?"
      ],
      notes: [
        "The expected result depends on the products and order_items data, which is not supplied here."
      ]
    },
    {
      id: "unmatched-practice-advanced",
      title: "14. Practice Exercise: Find Customers Without Qualifying Orders",
      paragraphs: [
        "Task: Find customers who have no orders with a total greater than or equal to 1800. Customers with smaller orders should still be included."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
      AND o.order_total >= 1800
)
ORDER BY c.customer_id;`
      },
      bullets: [
        "The amount condition belongs inside the subquery.",
        "Customers with no orders qualify because no order meets the threshold.",
        "Customers whose orders are all below 1800 also qualify.",
        "Customers with at least one order of 1800 or more do not qualify."
      ],
      notes: [
        "The expected result depends on the complete customer and order datasets."
      ]
    },
    {
      id: "unmatched-revision",
      title: "15. Quick Revision Notes",
      bullets: [
        "An unmatched record has no related row satisfying the specified join condition.",
        "LEFT JOIN preserves every row from the left table.",
        "WHERE right_table.primary_key IS NULL finds rows without a right-side match.",
        "NOT EXISTS checks whether a related row is absent.",
        "Use a guaranteed non-NULL right-side key for an unmatched-row NULL check.",
        "NOT IN can behave unexpectedly if its subquery returns NULL.",
        "Conditions inside NOT EXISTS define which related records count as matches.",
        "Unmatched data may be valid or invalid depending on business rules.",
        "Indexes on relationship columns can help existence checks.",
        "Use EXPLAIN to investigate performance rather than assuming one syntax is always faster."
      ],
      notes: [
        "Interview shortcut: LEFT JOIN plus IS NULL and NOT EXISTS are two common ways to express an anti-join."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "How do you find customers without orders?",
          answer:
            "Use LEFT JOIN and WHERE o.order_id IS NULL, or use NOT EXISTS with a correlated subquery."
        },
        {
          question: "What is an anti-join?",
          answer:
            "An anti-join returns rows from one side that have no matching row on the other side. LEFT JOIN with an IS NULL filter and NOT EXISTS are common ways to express it."
        },
        {
          question: "Why check the right table's primary key for NULL?",
          answer:
            "A primary key cannot be NULL for a real matching row, so NULL in the LEFT JOIN result indicates that no matching row was found."
        },
        {
          question: "What does NOT EXISTS do?",
          answer:
            "It tests whether a subquery returns no rows for the current outer row."
        },
        {
          question: "What is the difference between LEFT JOIN IS NULL and NOT EXISTS?",
          answer:
            "Both can express the same unmatched-record requirement. LEFT JOIN exposes unmatched rows through NULL-extended columns, while NOT EXISTS directly tests for the absence of a match."
        },
        {
          question: "Why can NOT IN fail when NULL values are present?",
          answer:
            "If the subquery returns NULL, comparisons can evaluate to UNKNOWN under SQL's three-valued logic. This may cause expected rows to be excluded."
        },
        {
          question: "Can NOT EXISTS find customers without recent orders?",
          answer:
            "Yes. Put the date condition inside the correlated subquery so only orders within the specified period count as matches."
        },
        {
          question: "Does a customer without orders always indicate bad data?",
          answer:
            "No. It may be a valid new customer or an inactive customer. Whether it is an error depends on the business rules."
        },
        {
          question: "Can an order reference a nonexistent customer?",
          answer:
            "It can happen when referential integrity is not enforced or data is imported incorrectly. A properly enforced foreign key normally prevents an invalid non-NULL reference."
        },
        {
          question: "Which is faster: LEFT JOIN IS NULL or NOT EXISTS?",
          answer:
            "Neither is universally faster. Modern optimizers may produce equivalent plans. Compare execution plans and performance on representative data."
        },
        {
          question: "Which index can help find customers without orders?",
          answer:
            "An index on orders.customer_id can help the database check for matching orders, depending on the workload and execution plan."
        },
        {
          question: "What is the difference between no related rows and no qualifying related rows?",
          answer:
            "No related rows means no row matches the relationship. No qualifying related rows means no related row satisfies all the additional conditions, even though other related rows may exist."
        }
      ]
    }
  ]
};
