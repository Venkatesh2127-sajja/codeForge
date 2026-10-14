
export const leftJoin = {
  id: 2055,
  title: "LEFT JOIN",
  slug: "left-join",
  topicTitle: "SQL Joins",
  description:
    "Learn how LEFT JOIN preserves all rows from the left table and returns matching rows from the right table, including unmatched records, NULL values, anti-joins, counting, filtering, and practical reporting.",
  estimatedTime: "35 min",
  sections: [
    {
      id: "left-intro",
      title: "1. What Is LEFT JOIN?",
      paragraphs: [
        "LEFT JOIN, also called LEFT OUTER JOIN, combines rows from two tables based on a matching condition. It preserves every row from the left table, even when no matching row exists in the right table.",
        "When a left-side row has one or more matches, SQL returns a result row for each matching combination. When no match exists, SQL still returns the left-side row and fills the right-side columns with NULL.",
        "The table written immediately after FROM is the left table. The table written after LEFT JOIN is the right table.",
        "LEFT JOIN is useful when reports must include every customer, employee, department, product, or other primary record, regardless of whether a related record exists."
      ],
      bullets: [
        "LEFT table: all its rows are preserved.",
        "Right table: matching rows are included.",
        "No right-side match: right-side columns contain NULL.",
        "One left row with multiple right matches: multiple result rows are produced.",
        "LEFT JOIN and LEFT OUTER JOIN mean the same thing."
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
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           101       1500.00
Ravi           102       2500.00
Priya          103       1800.00
Anu            NULL      NULL`,
      paragraphs: [
        "In this result, Ravi appears twice because he has two orders. Priya appears once because she has one order. Anu appears even though she has no order; the order columns are NULL.",
        "The result demonstrates that LEFT JOIN preserves the left-side customer records rather than requiring every customer to have an order."
      ]
    },
    {
      id: "left-unmatched",
      title: "2. Find Customers Without Orders",
      paragraphs: [
        "A LEFT JOIN is commonly used to find rows in one table that have no matching rows in another table. This pattern is called an anti-join.",
        "After joining customers to orders, customers without orders have NULL in the right-side order columns. Filtering a guaranteed non-NULL order identifier with IS NULL identifies those customers.",
        "Use a right-side primary key or another right-side column that cannot be NULL for an existing order. Testing a nullable business column can incorrectly classify a real order as missing."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "FROM customers selects the complete customer population.",
        "LEFT JOIN attempts to match each customer with an order.",
        "WHERE o.order_id IS NULL keeps only customers without a matching order.",
        "If several customers have no orders, every such customer is returned."
      ],
      code: {
        language: "sql",
        code: `-- Alternative: use NOT EXISTS
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
      },
      paragraphs: [
        "NOT EXISTS expresses the same business question directly: return a customer when no matching order exists. It can be a clear alternative to LEFT JOIN ... IS NULL.",
        "Database optimizers can often transform these equivalent patterns into efficient plans. Choose the version that communicates the intended logic clearly, then inspect performance if the query is important."
      ]
    },
    {
      id: "left-count",
      title: "3. Count Orders Including Customers with Zero Orders",
      paragraphs: [
        "LEFT JOIN is important in reports that must show every customer, including customers who have never placed an order.",
        "COUNT(o.order_id) counts only non-NULL order identifiers. For a customer without orders, the LEFT JOIN produces a preserved row with a NULL order identifier, so the count is zero.",
        "COUNT(*) counts result rows, including the NULL-extended row produced for a customer without orders. Therefore, COUNT(*) would return one for Anu in this example instead of zero.",
        "Group by the customer identifier and any selected customer columns that are not aggregated. Grouping by the primary key identifies each customer separately."
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
      output: `customer_id  customer_name  order_count
-----------  -------------  -----------
1            Ravi           2
2            Priya          1
3            Anu            0`,
      bullets: [
        "COUNT(*) counts all rows in the joined result.",
        "COUNT(o.order_id) counts matched orders when order_id is a non-NULL primary key.",
        "SUM(o.order_total) returns NULL when a customer has no non-NULL order totals; use COALESCE if the report should display zero.",
        "Use the right-side identifier rather than a nullable descriptive field when counting matches."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_order_value
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  order_count  total_order_value
-------------  -----------  -----------------
Ravi           2            4000.00
Priya          1            1800.00
Anu            0            0.00`,
      paragraphs: [
        "COALESCE(expression, 0) returns zero when the expression evaluates to NULL. It is useful for display and reporting, but remember that zero and an unknown value have different meanings."
      ]
    },
    {
      id: "left-filter",
      title: "4. ON Conditions and WHERE Conditions",
      paragraphs: [
        "The ON clause defines which right-side rows match a left-side row. A condition in WHERE filters the result after the join has been formed.",
        "For an outer join, the placement of a condition matters. A condition on the right table inside ON can prevent certain orders from matching while preserving the customer. The same condition inside WHERE can eliminate customers whose joined order values are NULL.",
        "Suppose the requirement is to show every customer but attach only orders whose total is greater than 2000. Put the order-total condition in ON."
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
   AND o.order_total > 2000
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          NULL      NULL
Anu            NULL      NULL`,
      paragraphs: [
        "Ravi has one order above 2000, so that order appears. His order worth 1500 does not match the ON condition. Priya's order is also below 2000, and Anu has no orders, so both customers remain with NULL order columns."
      ],
      code: {
        language: "sql",
        code: `-- This WHERE condition removes unmatched rows
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total > 2000
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00`,
      paragraphs: [
        "The WHERE version returns only Ravi's qualifying order. For an unmatched row, o.order_total is NULL, and NULL > 2000 is not TRUE, so the row is filtered out.",
        "A WHERE condition on the right table does not always turn a LEFT JOIN into an INNER JOIN, but a condition that rejects NULL-extended rows often has that effect. If you need all left-side rows, consider whether the condition belongs in ON."
      ]
    },
    {
      id: "left-where-left",
      title: "5. Filtering the Left Table Without Losing Its Rows",
      paragraphs: [
        "A WHERE condition on the left table filters which left-side rows are included. It does not by itself remove unmatched right-side rows for the remaining left-side records.",
        "For example, a report can list customers whose IDs are at least 2 and show their matching orders when they exist."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id >= 2
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_id  customer_name  order_id
-----------  -------------  --------
2            Priya          103
3            Anu            NULL`,
      bullets: [
        "The left-side filter determines which customers qualify.",
        "The LEFT JOIN still preserves qualifying customers who have no orders.",
        "Do not confuse filtering the customer population with filtering the matching orders."
      ]
    },
    {
      id: "left-multiple-matches",
      title: "6. One-to-Many Relationships and Duplicate-Looking Rows",
      paragraphs: [
        "A LEFT JOIN does not guarantee one result row per customer. If a customer has multiple orders, SQL returns one row for each matching order.",
        "Repeated customer names are not necessarily duplicate records. Each row may represent a different order. Include the order identifier when you need to distinguish order-level results.",
        "If a customer has no orders, that customer contributes one NULL-extended result row. If a customer has three matching orders, that customer contributes three result rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_id  customer_name  order_id
-----------  -------------  --------
1            Ravi           101
1            Ravi           102
2            Priya          103
3            Anu            NULL`,
      bullets: [
        "One customer to zero orders: one preserved result row.",
        "One customer to one order: one result row.",
        "One customer to several orders: several result rows.",
        "DISTINCT should not be used automatically to hide repeated parent columns; first decide what one result row is supposed to represent."
      ]
    },
    {
      id: "left-null-values",
      title: "7. Understanding NULL Values in LEFT JOIN",
      paragraphs: [
        "NULL in a right-side column can mean that no matching row was found. It does not mean that SQL has inserted a real order whose values are NULL.",
        "A NULL can also exist in a nullable column of a real matching row. To determine whether a match exists, test a right-side primary key or another column guaranteed to be non-NULL for actual records.",
        "Use IS NULL and IS NOT NULL to test NULL values. Expressions such as o.order_id = NULL do not correctly test for NULL."
      ],
      code: {
        language: "sql",
        code: `-- Find customers for whom no order matched
SELECT c.customer_id, c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Find customers who have at least one matched order
SELECT DISTINCT c.customer_id, c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NOT NULL;`
      },
      paragraphs: [
        "The first query finds customers without orders. The second returns customers with at least one matching order. DISTINCT prevents a customer with multiple orders from appearing multiple times in this customer-level list.",
        "When the goal is only to check whether a match exists, EXISTS or NOT EXISTS may communicate the requirement more directly."
      ]
    },
    {
      id: "left-aggregate",
      title: "8. LEFT JOIN with SUM and Other Aggregate Functions",
      paragraphs: [
        "LEFT JOIN can be combined with aggregate functions to build customer-level reports such as order counts, total spending, and average order value.",
        "COUNT of a non-NULL right-side key returns zero for a customer without orders. SUM and AVG generally return NULL when there are no non-NULL input values, so COALESCE may be appropriate for presentation.",
        "Be careful when joining multiple one-to-many tables before aggregating. A customer with two orders and three related support tickets can produce six joined combinations. Summing order totals after that join may count each order more than once."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_spending,
    AVG(o.order_total) AS average_order_value
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name  order_count  total_spending  average_order_value
-----------  -------------  -----------  --------------  -------------------
1            Ravi           2            4000.00         2000.00
2            Priya          1            1800.00         1800.00
3            Anu            0            0.00            NULL`,
      paragraphs: [
        "Ravi's total spending is 1500 + 2500 = 4000, and his average order value is 4000 / 2 = 2000. Anu has no orders, so her count is zero and her displayed total is zero. Her average remains NULL because there are no order values to average.",
        "If the report requires average spending of zero for customers without orders, use COALESCE(AVG(o.order_total), 0) explicitly. Decide whether zero is an appropriate business representation of no observations."
      ]
    },
    {
      id: "left-join-exists",
      title: "9. LEFT JOIN Versus EXISTS",
      paragraphs: [
        "LEFT JOIN is useful when you need columns from both tables. EXISTS is useful when you only need to know whether a matching row exists.",
        "If the right table contains multiple matches, a normal join can produce multiple rows for the same customer. EXISTS evaluates whether at least one match is present without multiplying the outer customer rows.",
        "NOT EXISTS is especially useful for finding customers with no matching orders."
      ],
      code: {
        language: "sql",
        code: `-- Customers with at least one order
SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;

-- Customers with no orders
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
      },
      bullets: [
        "Use LEFT JOIN when related columns are required in the output.",
        "Use EXISTS when testing whether at least one matching record exists.",
        "Use NOT EXISTS when testing that no matching record exists.",
        "Check query plans and indexes for performance-sensitive queries instead of assuming one syntax is always faster."
      ]
    },
    {
      id: "left-common-mistakes",
      title: "10. Common LEFT JOIN Mistakes",
      paragraphs: [
        "LEFT JOIN queries often produce unexpected results when filters, NULL values, or one-to-many relationships are misunderstood."
      ],
      bullets: [
        "Mistake: using WHERE o.order_total > 2000 when all customers must remain. Fix: place the right-side matching condition in ON when appropriate.",
        "Mistake: using COUNT(*) to count orders after a LEFT JOIN. Fix: use COUNT(o.order_id) when order_id is a non-NULL primary key.",
        "Mistake: checking o.order_id = NULL. Fix: use o.order_id IS NULL.",
        "Mistake: joining tables without a correct ON condition. Fix: match the intended relationship, such as customer_id to customer_id.",
        "Mistake: assuming each customer appears only once. Fix: understand the one-to-many relationship and choose the required output grain.",
        "Mistake: adding DISTINCT to remove repeated-looking rows without understanding them. Fix: inspect the keys and decide whether the report is customer-level or order-level.",
        "Mistake: summing order values after joining another one-to-many table. Fix: aggregate each child table to the correct level before combining the aggregates.",
        "Mistake: assuming a foreign key is required to write a JOIN. Fix: remember that JOIN syntax uses the specified matching condition, though foreign keys help enforce data integrity."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect for counting orders when customers with no orders
-- must receive zero:
SELECT c.customer_name, COUNT(*) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;

-- Correct:
SELECT c.customer_name, COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;`
      },
      paragraphs: [
        "The incorrect version counts the NULL-extended row for Anu, so it reports one. The corrected version counts only non-NULL order identifiers and reports zero."
      ]
    },
    {
      id: "left-real-world",
      title: "11. Real-World Applications of LEFT JOIN",
      paragraphs: [
        "LEFT JOIN is used whenever a report must retain the complete set of primary records while optionally including related data."
      ],
      bullets: [
        "E-commerce: list every customer and show their orders, including customers who have never purchased anything.",
        "Inventory: list all products and their sales, including products with no sales.",
        "Education: list all students and their submitted assignments, including students who have not submitted an assignment.",
        "HR: list all employees and their assigned projects, including employees who are not currently assigned.",
        "Banking: list every account and its transactions, including accounts with no transactions during the selected period.",
        "Customer support: list every customer and any support ticket that matches a specified condition.",
        "Reporting dashboards: calculate activity totals while keeping inactive users or products visible."
      ],
      paragraphs: [
        "A useful design question is: which table represents the complete population that the report must preserve? Put that table on the left side of the LEFT JOIN."
      ]
    },
    {
      id: "left-performance",
      title: "12. Performance and Indexing",
      paragraphs: [
        "LEFT JOIN performance depends on table size, data distribution, indexes, join conditions, filters, and the database optimizer. A LEFT JOIN is not automatically slower than an INNER JOIN, and a particular query plan depends on the database and available statistics.",
        "For customer-to-order queries, indexes on the columns used to match records can help. A primary key on customers.customer_id and an index on orders.customer_id are common choices for this relationship.",
        "Use EXPLAIN or the database's equivalent execution-plan tool to inspect how the database accesses tables and performs the join.",
        "Select only the columns required by the report. Avoid SELECT * in large production joins when it transfers unnecessary data.",
        "Filter conditions should reflect the intended result. Moving a condition between ON and WHERE solely to improve performance can change the query's meaning."
      ],
      bullets: [
        "Index the columns used frequently in join predicates when justified by the workload.",
        "Use primary keys and foreign keys to model relationships correctly.",
        "Check whether a one-to-many join multiplies rows before aggregating.",
        "Inspect execution plans for important or slow queries.",
        "Keep statistics current according to the database's maintenance practices.",
        "Indexes consume storage and can slow inserts and updates, so create them based on query needs."
      ],
      code: {
        language: "sql",
        code: `-- MySQL example: inspect the query plan
EXPLAIN
SELECT
    c.customer_id,
    c.customer_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE c.customer_id >= 2;`
      },
      paragraphs: [
        "In MySQL, EXPLAIN shows the optimizer's planned access strategy. The exact output depends on the server version, schema, indexes, and statistics."
      ]
    },
    {
      id: "left-practice-beginner",
      title: "13. Practice Exercise 1: Find Customers with No Orders",
      paragraphs: [
        "Task: return the IDs and names of every customer who has never placed an order. The query should still work when the database contains many customers and orders."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "Why use LEFT JOIN? It preserves customers without orders.",
        "Why test order_id? It is the identifier of a matching order and is assumed to be a non-NULL primary key.",
        "What does the result mean? Anu has no matching order in the sample data."
      ]
    },
    {
      id: "left-practice-intermediate",
      title: "14. Practice Exercise 2: Show Every Customer and Order Count",
      paragraphs: [
        "Task: produce one row per customer and count their orders. Customers without orders must show zero rather than one."
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
      output: `customer_id  customer_name  order_count
-----------  -------------  -----------
1            Ravi           2
2            Priya          1
3            Anu            0`,
      bullets: [
        "The GROUP BY produces one group per customer.",
        "COUNT(o.order_id) ignores NULL values.",
        "Anu's preserved row contains a NULL order ID, so her order count is zero."
      ]
    },
    {
      id: "left-practice-advanced",
      title: "15. Practice Exercise 3: Calculate Spending for Every Customer",
      paragraphs: [
        "Task: display every customer, the number of orders, and total order value. A customer without orders should have an order count and displayed total of zero."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_spending
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name  order_count  total_spending
-----------  -------------  -----------  --------------
1            Ravi           2            4000.00
2            Priya          1            1800.00
3            Anu            0            0.00`,
      bullets: [
        "COUNT(o.order_id) counts matching orders.",
        "SUM(o.order_total) adds the matching order totals.",
        "COALESCE converts a NULL total into zero for display.",
        "The GROUP BY keeps one result row per customer."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does LEFT JOIN do?",
          answer:
            "It preserves all rows from the left table and includes matching rows from the right table. Unmatched right-side columns are returned as NULL."
        },
        {
          question: "What is the difference between LEFT JOIN and LEFT OUTER JOIN?",
          answer:
            "There is no functional difference. OUTER is optional."
        },
        {
          question: "What appears when no right-side row matches?",
          answer:
            "The left-side row remains in the result, and columns supplied by the right table are NULL."
        },
        {
          question: "How do you find customers without orders?",
          answer:
            "Use LEFT JOIN and filter with WHERE orders.order_id IS NULL, assuming order_id is non-NULL for real orders. NOT EXISTS is another option."
        },
        {
          question: "Why use COUNT(right_table.id) instead of COUNT(*)?",
          answer:
            "COUNT(right_table.id) ignores NULL IDs. With a LEFT JOIN, this allows a customer without orders to receive a count of zero."
        },
        {
          question: "Can a WHERE condition change the behavior of LEFT JOIN?",
          answer:
            "Yes. A WHERE condition that rejects NULL-extended right-side rows can remove unmatched left-side rows. Place a right-side condition in ON when unmatched left-side rows must remain."
        },
        {
          question: "Does LEFT JOIN return only one row per left-side record?",
          answer:
            "No. If a left-side record matches several right-side records, it appears in several result rows."
        },
        {
          question: "What is an anti-join?",
          answer:
            "An anti-join identifies rows in one table for which no matching row exists in another table. LEFT JOIN with IS NULL and NOT EXISTS are common ways to express this."
        },
        {
          question: "What is the difference between LEFT JOIN and INNER JOIN?",
          answer:
            "INNER JOIN returns only matching combinations. LEFT JOIN also preserves unmatched rows from the left table."
        },
        {
          question: "Can LEFT JOIN be used with GROUP BY?",
          answer:
            "Yes. It is commonly used to count or aggregate related records while preserving left-side records that have no matches."
        },
        {
          question: "Why can COUNT(*) return one for a customer without orders?",
          answer:
            "The LEFT JOIN produces a NULL-extended result row for that customer, and COUNT(*) counts that row."
        },
        {
          question: "How can you avoid multiplying totals when joining multiple one-to-many tables?",
          answer:
            "Aggregate each child table to the intended reporting level before joining the aggregates, or redesign the query so that each business record is counted only once."
        },
        {
          question: "Does a LEFT JOIN require a foreign key constraint?",
          answer:
            "No. The ON clause defines the match. Foreign keys are useful for enforcing referential integrity but are not required for JOIN syntax."
        },
        {
          question: "How can you improve LEFT JOIN performance?",
          answer:
            "Use appropriate indexes, select only necessary columns, check the execution plan, and ensure the join condition and filtering logic match the intended result."
        }
      ]
    },
    {
      id: "left-revision",
      title: "17. Quick Revision Notes",
      bullets: [
        "LEFT JOIN preserves every row from the left table.",
        "Matching right-side rows are included; unmatched right-side columns become NULL.",
        "LEFT JOIN and LEFT OUTER JOIN are equivalent.",
        "Use LEFT JOIN with WHERE right_table.primary_key IS NULL to find unmatched left-side records.",
        "Use COUNT(right_table.primary_key) to count matches, including zero.",
        "COUNT(*) counts the NULL-extended row created for an unmatched left-side record.",
        "ON controls matching; WHERE filters the resulting rows.",
        "A condition on the right table in WHERE can remove unmatched rows.",
        "One-to-many relationships can produce several rows for one left-side record.",
        "Use IS NULL rather than = NULL.",
        "Use COALESCE when a report should display zero instead of a NULL aggregate.",
        "Watch for inflated sums when joining multiple one-to-many relationships.",
        "Use EXPLAIN and suitable indexes when investigating performance."
      ],
      paragraphs: [
        "Memory trick: LEFT JOIN means keep the LEFT table's rows. Match what you can from the right table; when there is no match, the right-side values are NULL."
      ]
    }
  ]
};
