
export const sqlJoinsExercises = {
  id: 2065,
  title: "SQL Joins Exercises",
  slug: "sql-joins-exercises",
  topicTitle: "SQL Joins",
  description:
    "Practice INNER JOIN, LEFT JOIN, multiple-table joins, aggregation, unmatched-record queries, and JOIN problem-solving techniques.",
  estimatedTime: "45 min",
  sections: [
    {
      id: "setup",
      title: "1. Create the Practice Dataset",
      paragraphs: [
        "Use these separate practice tables so the exercises do not conflict with the customers and orders tables from earlier lessons.",
        "The dataset contains three customers and three orders. Ravi has two orders, Priya has one order, and Anu has no orders. These relationships will help demonstrate matching rows, unmatched rows, aggregation, and filtering grouped results.",
        "The examples use standard SQL constructs supported by many relational databases. Some details, such as data types and pagination syntax, can vary between database products."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE practice_customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE practice_orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2)
);

INSERT INTO practice_customers VALUES
    (1, 'Ravi'),
    (2, 'Priya'),
    (3, 'Anu');

INSERT INTO practice_orders VALUES
    (101, 1, 1500.00),
    (102, 1, 2500.00),
    (103, 2, 1800.00);`
      },
      bullets: [
        "practice_customers stores customer details.",
        "practice_orders stores order details and the customer ID associated with each order.",
        "customer_id is the primary key in practice_customers.",
        "order_id is the primary key in practice_orders.",
        "The matching relationship is practice_customers.customer_id = practice_orders.customer_id."
      ],
      notes: [
        "The exercise schema does not declare customer_id in practice_orders as a foreign key. The examples use it as the logical relationship between the tables.",
        "Ravi's total is 4000.00, Priya's total is 1800.00, and Anu's total is zero."
      ]
    },
    {
      id: "exercise-inner",
      title: "2. Exercise: Match Customers and Orders",
      paragraphs: [
        "Question: Display the customer name and order ID for every matching customer-order pair.",
        "Use INNER JOIN when you want records that have a matching row in both tables. Customers without orders are excluded from the result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id
-------------  --------
Ravi           101
Ravi           102
Priya          103`,
      bullets: [
        "Ravi appears twice because he has two orders.",
        "Priya appears once because she has one order.",
        "Anu does not appear because no order matches her customer ID.",
        "ORDER BY o.order_id sorts the output by order ID."
      ],
      notes: [
        "Multiple rows for one customer are expected in a customer-to-orders join because the relationship is one-to-many."
      ]
    },
    {
      id: "exercise-left",
      title: "3. Exercise: Include Customers Without Orders",
      paragraphs: [
        "Question: Display all customers and any matching order IDs.",
        "Use LEFT JOIN when every row from the left table must appear, even when no corresponding row exists in the right table."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id
FROM practice_customers AS c
LEFT JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id
-------------  --------
Ravi           101
Ravi           102
Priya          103
Anu            NULL`,
      bullets: [
        "All three customers are preserved.",
        "Ravi produces two rows because two orders match.",
        "Anu appears with NULL for order_id because no order matches.",
        "NULL here represents the missing right-side match, not an actual order ID."
      ]
    },
    {
      id: "exercise-unmatched",
      title: "4. Exercise: Find Customers Without Orders",
      paragraphs: [
        "Question: Return only customers who have no matching order.",
        "Combine LEFT JOIN with a NULL check on the right table's primary key. The LEFT JOIN preserves unmatched customers, and the WHERE clause selects those unmatched rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM practice_customers AS c
LEFT JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "The join checks whether each customer has an order.",
        "The WHERE clause retains only rows without a matching order.",
        "Checking o.order_id is reliable because order_id is a primary key and cannot be NULL for a real matching order."
      ],
      codeExamples: [
        {
          title: "Alternative solution using NOT EXISTS",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name
FROM practice_customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM practice_orders AS o
    WHERE o.customer_id = c.customer_id
);`
        }
      ]
    },
    {
      id: "exercise-aggregate",
      title: "5. Exercise: Calculate Spending per Customer",
      paragraphs: [
        "Question: Display every customer and their total order value. Customers without orders should have a total of zero.",
        "Use LEFT JOIN to preserve customers without orders, GROUP BY to create one group per customer, and SUM to calculate each customer's total. COALESCE replaces a NULL total with zero."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COALESCE(SUM(o.order_total), 0) AS total_spending
FROM practice_customers AS c
LEFT JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  total_spending
-------------  --------------
Ravi           4000.00
Priya          1800.00
Anu            0.00`,
      bullets: [
        "SUM(o.order_total) adds the order totals within each customer group.",
        "COALESCE(SUM(o.order_total), 0) displays zero for a customer without orders.",
        "GROUP BY uses both customer_id and customer_name.",
        "The query returns one summary row per customer."
      ],
      notes: [
        "For a customer with no orders, SUM(o.order_total) is NULL because there are no non-NULL order totals to add.",
        "COUNT(o.order_id) would return zero for Anu, while COUNT(*) would count the NULL-extended joined row."
      ]
    },
    {
      id: "exercise-having",
      title: "6. Exercise: Find Customers with Multiple Orders",
      paragraphs: [
        "Question: Find customers who have placed at least two orders.",
        "Use GROUP BY to group orders by customer and HAVING to filter the groups based on their order counts."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) >= 2
ORDER BY c.customer_name;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2`,
      bullets: [
        "COUNT(o.order_id) counts the matching orders.",
        "HAVING COUNT(o.order_id) >= 2 keeps customers with at least two orders.",
        "Anu is excluded because she has no matching orders.",
        "Priya is excluded because she has only one order."
      ]
    },
    {
      id: "exercise-filter",
      title: "7. Exercise: Filter Orders by Amount",
      paragraphs: [
        "Question: Display customer names, order IDs, and order totals for orders worth at least 1800. Sort the highest-value orders first.",
        "Use WHERE to filter individual orders and ORDER BY to sort the qualifying results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800
ORDER BY o.order_total DESC, o.order_id ASC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "Ravi's order 102 qualifies because its total is 2500.00.",
        "Priya's order 103 qualifies because its total is exactly 1800.00.",
        "Ravi's order 101 is excluded because its total is 1500.00.",
        "The >= operator includes values equal to the threshold."
      ]
    },
    {
      id: "exercise-sorting",
      title: "8. Exercise: Sort Orders by Customer and Amount",
      paragraphs: [
        "Question: Display every matching customer-order pair, sorted alphabetically by customer name and then by order total from highest to lowest.",
        "Multiple ORDER BY expressions allow you to define a primary sort key and additional sort keys."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
ORDER BY
    c.customer_name ASC,
    o.order_total DESC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Priya          103       1800.00
Ravi           102       2500.00
Ravi           101       1500.00`,
      bullets: [
        "Customer name is the primary sort key.",
        "Order total is the secondary sort key.",
        "Ravi's larger order appears before his smaller order.",
        "Anu is absent because the query uses INNER JOIN."
      ]
    },
    {
      id: "exercise-where-having",
      title: "9. Exercise: Combine WHERE and HAVING",
      paragraphs: [
        "Question: Consider only orders worth at least 1500, then return customers whose qualifying order total exceeds 3000.",
        "WHERE determines which individual orders contribute to the aggregates. HAVING filters the customer groups after their totals are calculated."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS qualifying_orders,
    SUM(o.order_total) AS qualifying_total
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 3000
ORDER BY qualifying_total DESC;`
      },
      output: `customer_name  qualifying_orders  qualifying_total
-------------  -----------------  ----------------
Ravi           2                  4000.00`,
      bullets: [
        "All three sample orders meet the WHERE threshold of 1500.",
        "Ravi's qualifying total is 1500 + 2500 = 4000.",
        "Priya's total is 1800, so she does not satisfy the HAVING condition.",
        "Anu has no matching orders and is excluded by INNER JOIN."
      ]
    },
    {
      id: "exercise-multiple-conditions",
      title: "10. Exercise: Find Customers with High-Value Orders",
      paragraphs: [
        "Question: Find customers who have at least one order of 2000 or more.",
        "When the requirement is simply to determine whether a matching row exists, EXISTS can express the requirement without returning one outer row for every matching order."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM practice_customers AS c
WHERE EXISTS (
    SELECT 1
    FROM practice_orders AS o
    WHERE o.customer_id = c.customer_id
      AND o.order_total >= 2000
)
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
1            Ravi`,
      bullets: [
        "Ravi qualifies because order 102 is worth 2500.",
        "Priya does not qualify because her order is worth 1800.",
        "Anu does not qualify because she has no orders.",
        "EXISTS tests whether at least one matching row is present."
      ]
    },
    {
      id: "exercise-left-filter",
      title: "11. Exercise: Preserve Customers with No High-Value Orders",
      paragraphs: [
        "Question: Display every customer and any order worth at least 2000. Customers without a qualifying order must still appear.",
        "Place the amount condition in the ON clause. This restricts which orders match without removing customers who have no qualifying order."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM practice_customers AS c
LEFT JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
   AND o.order_total >= 2000
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          NULL      NULL
Anu            NULL      NULL`,
      bullets: [
        "Ravi has one order that meets the threshold.",
        "Priya's order does not meet the threshold, so she has no qualifying match.",
        "Anu has no orders at all.",
        "Both Priya and Anu remain because LEFT JOIN preserves every customer."
      ],
      notes: [
        "Moving o.order_total >= 2000 into WHERE would remove Priya and Anu from this result."
      ]
    },
    {
      id: "exercise-count-distinct",
      title: "12. Exercise: Count Distinct Orders After a Detail Join",
      paragraphs: [
        "Question: Suppose an order_items table contains several rows for one order. How can you count orders without counting the same order once for every item?",
        "Use COUNT(DISTINCT o.order_id) when the intended metric is the number of unique orders in the joined result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.customer_id,
    COUNT(DISTINCT o.order_id) AS order_count
FROM practice_orders AS o
GROUP BY o.customer_id
ORDER BY o.customer_id;`
      },
      output: `customer_id  order_count
-----------  -----------
1            2
2            1`,
      bullets: [
        "Ravi has two distinct orders.",
        "Priya has one distinct order.",
        "Anu does not appear because the query groups rows from practice_orders only.",
        "COUNT(DISTINCT ...) is useful when the join can repeat an entity, but it should match the metric being calculated."
      ],
      notes: [
        "This query counts orders directly and does not require an order_items table. The exercise illustrates the distinct-order metric without requiring an additional table."
      ]
    },
    {
      id: "exercise-limit",
      title: "13. Exercise: Return the Two Largest Orders",
      paragraphs: [
        "Question: Return the two largest orders with their customer names.",
        "Use ORDER BY to rank orders by amount and LIMIT to restrict the result. LIMIT is supported by MySQL and PostgreSQL, among other databases; other systems may use different pagination syntax."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM practice_customers AS c
INNER JOIN practice_orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_total DESC, o.order_id ASC
LIMIT 2;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "ORDER BY sorts the orders before the row limit is applied.",
        "The highest order total is 2500.00.",
        "The second-highest order total is 1800.00.",
        "The secondary order_id sort makes ties deterministic."
      ]
    },
    {
      id: "exercise-not-exists",
      title: "14. Exercise: Use NOT EXISTS",
      paragraphs: [
        "Question: Find customers who have never placed an order using NOT EXISTS instead of LEFT JOIN.",
        "The correlated subquery checks for orders belonging to the current customer. A customer is returned only when that subquery finds no matching rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM practice_customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM practice_orders AS o
    WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`,
      bullets: [
        "NOT EXISTS is true for Anu because no order matches customer_id 3.",
        "NOT EXISTS is false for Ravi and Priya because they each have matching orders.",
        "The query expresses the absence of a matching relationship directly."
      ]
    },
    {
      id: "exercise-solutions",
      title: "15. Exercise Answer Review",
      paragraphs: [
        "Use this checklist to verify your solutions and identify the SQL concept each exercise tests."
      ],
      bullets: [
        "Match customers and orders: INNER JOIN with the customer key.",
        "Include all customers: LEFT JOIN.",
        "Find customers without orders: LEFT JOIN with IS NULL or NOT EXISTS.",
        "Calculate spending: LEFT JOIN, GROUP BY, SUM, and COALESCE.",
        "Find multiple orders: GROUP BY with HAVING COUNT(...) >= 2.",
        "Filter individual orders: WHERE.",
        "Sort the output: ORDER BY.",
        "Preserve customers without qualifying orders: put the right-side qualification in ON.",
        "Find customers with at least one qualifying order: EXISTS.",
        "Count unique orders after a detail join: COUNT(DISTINCT order_id), when appropriate.",
        "Return the largest orders: ORDER BY followed by a row-limiting clause."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Which JOIN returns only matching rows?",
          answer:
            "INNER JOIN returns rows for which the join condition finds a match on both sides."
        },
        {
          question: "Which JOIN preserves all rows from the left table?",
          answer:
            "LEFT JOIN preserves every left-side row and supplies NULL for right-side columns when no match exists."
        },
        {
          question: "How do you find customers without orders?",
          answer:
            "Use LEFT JOIN and WHERE o.order_id IS NULL, or use NOT EXISTS with a correlated subquery."
        },
        {
          question: "How do you calculate total spending for each customer?",
          answer:
            "Use LEFT JOIN, GROUP BY customer, and SUM(order_total). COALESCE can display zero for customers without orders."
        },
        {
          question: "How do you find customers with at least two orders?",
          answer:
            "Group by customer and use HAVING COUNT(o.order_id) >= 2."
        },
        {
          question: "What should you check when a JOIN returns unexpected results?",
          answer:
            "Verify the join condition, relationship cardinality, filters, NULL handling, and whether multiple matching rows are expected."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping, while HAVING filters groups after aggregation."
        },
        {
          question: "Why use COUNT(o.order_id) instead of COUNT(*) with a LEFT JOIN?",
          answer:
            "COUNT(o.order_id) counts non-NULL order IDs, so a customer without orders gets zero. COUNT(*) counts the NULL-extended row as well."
        },
        {
          question: "What is the difference between EXISTS and JOIN?",
          answer:
            "JOIN combines columns from matching rows and may return multiple rows for multiple matches. EXISTS tests whether at least one matching row exists without multiplying the outer rows."
        },
        {
          question: "How do you prevent inflated totals after multiple joins?",
          answer:
            "Identify the grain of each measure and aggregate one-to-many child data at the appropriate level before joining summaries when necessary."
        },
        {
          question: "Can a LEFT JOIN condition be placed in ON or WHERE?",
          answer:
            "Yes, but placement can change the result. A right-side condition in ON restricts matching rows while preserving left-side rows; a right-side condition in WHERE may remove unmatched left-side rows."
        },
        {
          question: "What is an anti-join?",
          answer:
            "An anti-join returns rows that have no match on the other side. LEFT JOIN with an IS NULL filter and NOT EXISTS are common ways to express it."
        },
        {
          question: "What is a Cartesian product?",
          answer:
            "It contains every combination of rows from two tables. If the tables have M and N rows, the result contains M multiplied by N rows."
        },
        {
          question: "Why can DISTINCT be a poor fix for repeated rows?",
          answer:
            "DISTINCT removes duplicate selected result rows but does not fix incorrect join relationships or aggregates calculated at the wrong grain."
        },
        {
          question: "How can you investigate a slow JOIN?",
          answer:
            "Inspect the execution plan, verify join keys, evaluate indexes, check row estimates and actual row counts where available, and measure the query on representative data."
        }
      ]
    },
    {
      id: "revision",
      title: "17. Quick Revision Notes",
      bullets: [
        "INNER JOIN returns matching rows.",
        "LEFT JOIN preserves all left-side rows.",
        "Use IS NULL or NOT EXISTS to find unmatched records.",
        "Use GROUP BY and aggregate functions for summaries.",
        "Use HAVING to filter aggregate groups.",
        "Use WHERE to filter individual rows.",
        "Use ORDER BY to sort query results.",
        "Use LIMIT or the database's equivalent to restrict the number of returned rows.",
        "Use EXISTS when you only need to test whether a related row exists.",
        "Understand one-to-many relationships before interpreting repeated-looking rows.",
        "Check aggregate grain to prevent inflated totals.",
        "Use EXPLAIN and workload-based measurements to investigate performance."
      ],
      notes: [
        "Core SQL query order: SELECT, FROM/JOIN, WHERE, GROUP BY, HAVING, ORDER BY, followed by a database-specific row limit or pagination clause."
      ]
    }
  ]
};
