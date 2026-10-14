
export const innerJoinMultipleTables = {
  id: 2054,
  title: "INNER JOIN with Multiple Tables",
  slug: "inner-join-multiple-tables",
  topicTitle: "SQL Joins",
  description:
    "Combine three or more related tables using multiple INNER JOIN conditions.",
  estimatedTime: "25 min",
  sections: [
    {
      id: "three-tables",
      title: "1. Joining Three Tables",
      paragraphs: [
        "Suppose customers place orders and each order contains order items. Joining all three tables lets you retrieve the customer, order, and item details together.",
        "The customers table stores customer information. The orders table stores order records and the customer_id of the customer who placed each order. The order_items table stores individual items belonging to each order.",
        "A multi-table JOIN connects these relationships one step at a time. First, customers are matched to orders using customer_id. Next, each order is matched to its order items using order_id.",
        "Because INNER JOIN keeps only matching rows at every join step, a customer must have a matching order, and that order must have at least one matching item to appear in the final result."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.product_name,
    oi.quantity
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN order_items AS oi
    ON o.order_id = oi.order_id
ORDER BY o.order_id;`
      },
      bullets: [
        "c is the alias for customers.",
        "o is the alias for orders.",
        "oi is the alias for order_items.",
        "The first ON condition connects customers and orders.",
        "The second ON condition connects orders and order items.",
        "Each matching order item produces a result row."
      ]
    },
    {
      id: "setup",
      title: "2. Example Data for Three Tables",
      paragraphs: [
        "The following compact dataset illustrates how the tables are related. Run it in a separate practice database or use different table names if your existing tables have different definitions.",
        "The example uses separate table names prefixed with join_ so it can coexist with earlier customers and orders lessons.",
        "The tables intentionally omit foreign key constraints to keep the setup short. In a production database, foreign keys can enforce the relationships between customers, orders, and order items."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE join_customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE join_orders (
    order_id INT PRIMARY KEY,
    customer_id INT
);

CREATE TABLE join_order_items (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_name VARCHAR(100),
    quantity INT
);

INSERT INTO join_customers VALUES
    (1, 'Ravi'),
    (2, 'Priya');

INSERT INTO join_orders VALUES
    (101, 1),
    (102, 2);

INSERT INTO join_order_items VALUES
    (1, 101, 'Keyboard', 2),
    (2, 101, 'Mouse', 1),
    (3, 102, 'Monitor', 1);

SELECT * FROM join_customers ORDER BY customer_id;
SELECT * FROM join_orders ORDER BY order_id;
SELECT * FROM join_order_items ORDER BY item_id;`
      },
      output: `join_customers
customer_id  customer_name
-----------  -------------
1            Ravi
2            Priya

join_orders
order_id  customer_id
--------  -----------
101       1
102       2

join_order_items
item_id  order_id  product_name  quantity
-------  --------  ------------  --------
1        101       Keyboard      2
2        101       Mouse         1
3        102       Monitor      1`,
      bullets: [
        "Ravi placed order 101.",
        "Priya placed order 102.",
        "Order 101 contains a keyboard and a mouse.",
        "Order 102 contains a monitor.",
        "The item_id column uniquely identifies each order-item row."
      ]
    },
    {
      id: "three-tables-query",
      title: "3. Run the Three-Table JOIN",
      paragraphs: [
        "Now join the three tables to display the customer name, order ID, product name, and quantity.",
        "SQL matches join_customers to join_orders using customer_id. It then matches join_orders to join_order_items using order_id.",
        "Ravi appears twice because order 101 contains two items. Priya appears once because order 102 contains one item. This is the expected result of joining an order to its individual item rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.product_name,
    oi.quantity
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2
Ravi           101       Mouse         1
Priya          102       Monitor       1`
    },
    {
      id: "join-chain",
      title: "4. Understand the Join Chain",
      paragraphs: [
        "A join chain is a sequence of joins that connects multiple related tables. Every JOIN should have a condition that represents the relationship between the tables.",
        "Think of the query as following a path from the customer to the order and then from the order to its items. The final result contains only records that successfully follow this relationship path."
      ],
      bullets: [
        "First, customers are matched to orders by customer_id.",
        "Next, orders are matched to order_items by order_id.",
        "Each matching item produces a row containing customer, order, and item information.",
        "If a row has no match at an INNER JOIN step, that row is excluded from the result.",
        "If an order has three matching items, it can appear in three result rows.",
        "The order of joins can often be rearranged by the optimizer, but the join conditions and required result semantics must remain correct."
      ]
    },
    {
      id: "four-tables",
      title: "5. Joining Four Tables",
      paragraphs: [
        "The same approach works with four or more tables. For example, a products table may store product IDs, names, and prices, while order_items stores the product_id purchased in each order.",
        "Joining customers, orders, order_items, and products provides a detailed report with the customer, order, product, quantity, and product price.",
        "This example assumes that join_order_items has a product_id column and that join_products has product_id, product_name, and unit_price columns. These are additional tables and columns, so create the matching schema before running this query."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity,
    p.unit_price,
    oi.quantity * p.unit_price AS line_total
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN join_products AS p
    ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.item_id;`
      },
      bullets: [
        "The products table supplies product details.",
        "order_items.product_id identifies the product associated with an item row.",
        "quantity multiplied by unit_price calculates a line total before discounts, taxes, or other adjustments.",
        "All joins are INNER JOINs, so only rows with matching records at every step appear.",
        "If a product is missing from the product table, its order item will not appear in this result."
      ]
    },
    {
      id: "join-filter",
      title: "6. Filtering Results from Multiple Tables",
      paragraphs: [
        "WHERE can filter columns from any table in the joined query, provided those columns are available in the query's input.",
        "For example, you can display only order items whose quantity is at least two. The join conditions connect the tables, and the WHERE condition restricts the final matching rows to qualifying items.",
        "This example uses the three-table sample dataset. Only Ravi's keyboard item has a quantity of two."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.product_name,
    oi.quantity
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
WHERE oi.quantity >= 2
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2`,
      bullets: [
        "The join conditions establish the relationships.",
        "WHERE oi.quantity >= 2 filters item rows.",
        "Items with quantity one are excluded.",
        "The comparison is inclusive, so a quantity of exactly two qualifies."
      ]
    },
    {
      id: "join-aggregate",
      title: "7. Aggregate Results After Joining Multiple Tables",
      paragraphs: [
        "Multi-table joins can be combined with aggregate functions to produce summaries. For example, you can count the number of item rows in each order.",
        "COUNT(oi.item_id) counts the matching item rows. GROUP BY creates one summary group for each order and its customer.",
        "Be careful about what is being counted. COUNT(oi.item_id) counts order-item rows, not the total quantity of individual units. To count units, use SUM(oi.quantity)."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    COUNT(oi.item_id) AS item_line_count,
    SUM(oi.quantity) AS total_units
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY
    c.customer_id,
    c.customer_name,
    o.order_id
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id  item_line_count  total_units
-------------  --------  ---------------  -----------
Ravi           101       2                3
Priya          102       1                1`,
      bullets: [
        "Order 101 has two item lines: Keyboard and Mouse.",
        "Order 101 contains three units in total: two keyboards and one mouse.",
        "Order 102 has one item line and one unit.",
        "Grouping by order_id creates a separate summary for each order."
      ]
    },
    {
      id: "join-having",
      title: "8. Filtering Grouped Results with HAVING",
      paragraphs: [
        "HAVING filters groups after aggregate calculations. For example, a business may want to display only orders containing more than one unit in total.",
        "The query first joins the three tables, groups item rows by order, and calculates SUM(oi.quantity). HAVING then retains orders whose total quantity exceeds one."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    c.customer_name,
    SUM(oi.quantity) AS total_units
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    c.customer_id,
    c.customer_name
HAVING SUM(oi.quantity) > 1
ORDER BY o.order_id;`
      },
      output: `order_id  customer_name  total_units
--------  -------------  -----------
101       Ravi           3`,
      bullets: [
        "WHERE filters input rows before grouping.",
        "HAVING filters completed groups using aggregate conditions.",
        "Order 101 qualifies because its total quantity is three.",
        "Order 102 is excluded because its total quantity is one."
      ]
    },
    {
      id: "join-duplicates",
      title: "9. Understanding Row Multiplication",
      paragraphs: [
        "A multi-table JOIN can return more rows than any individual table because one record may match multiple records in another table.",
        "For example, one order can contain several order items. Joining an order to its items repeats order-level values once for each matching item.",
        "This behavior matters when calculating totals. If an order has a total of 400 and three item rows, summing the order total after joining to items could produce 1200 rather than 400.",
        "When you need order-level totals, calculate them at the order level or aggregate the order data before joining it to the item details."
      ],
      code: {
        language: "sql",
        code: `-- Count item rows per order
SELECT
    o.order_id,
    COUNT(oi.item_id) AS item_line_count
FROM join_orders AS o
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY o.order_id
ORDER BY o.order_id;`
      },
      output: `order_id  item_line_count
--------  ---------------
101       2
102       1`,
      bullets: [
        "Repeated order IDs in the result are not necessarily duplicate data.",
        "COUNT(DISTINCT o.order_id) can count unique orders after a join, but it does not automatically fix incorrect SUM calculations.",
        "Aggregate each table at the correct business level before combining summaries when one-to-many joins would multiply values."
      ]
    },
    {
      id: "join-common-mistakes",
      title: "10. Common Mistakes in Multi-Table JOINs",
      paragraphs: [
        "Correct join conditions and a clear understanding of table relationships are essential when joining three or more tables."
      ],
      bullets: [
        "Missing a join condition: every relationship should use the correct ON condition.",
        "Joining the wrong columns: customer_id connects customers to orders, while order_id connects orders to order items in this example.",
        "Using ambiguous column names: qualify columns with aliases such as c.customer_id or o.order_id.",
        "Expecting one row per order: an order with several items naturally produces several rows.",
        "Counting the wrong thing: COUNT(item_id) counts item lines, while SUM(quantity) counts the total units represented by those lines.",
        "Overcounting order totals: joining order-level amounts to multiple item rows can repeat the same order amount.",
        "Using DISTINCT to hide incorrect joins: identify the cause of unexpected row multiplication instead of removing output rows blindly.",
        "Assuming every table has matching records: INNER JOIN excludes records without matches at any join step."
      ]
    },
    {
      id: "practice-beginner",
      title: "11. Practice Exercise: Display Customer and Product Details",
      paragraphs: [
        "Question: Display the customer name, order ID, product name, and quantity for all matching order items.",
        "Use the three-table dataset and connect each table with its appropriate key."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.product_name,
    oi.quantity
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2
Ravi           101       Mouse         1
Priya          102       Monitor       1`
    },
    {
      id: "practice-intermediate",
      title: "12. Practice Exercise: Count Item Lines per Customer",
      paragraphs: [
        "Question: Display each customer who has order items and the number of item lines associated with that customer's orders.",
        "Join all three tables, group by the customer key and name, and count the item primary key."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(oi.item_id) AS item_line_count
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name  item_line_count
-----------  -------------  ---------------
1            Ravi           2
2            Priya          1`,
      bullets: [
        "Ravi has two item lines across his order.",
        "Priya has one item line.",
        "This query counts item rows, not the sum of quantities."
      ]
    },
    {
      id: "practice-advanced",
      title: "13. Practice Exercise: Find Orders with at Least Two Units",
      paragraphs: [
        "Question: Display the order ID, customer name, and total quantity for orders that contain at least two units.",
        "Use SUM() to calculate the total quantity per order and HAVING to filter the grouped results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    c.customer_name,
    SUM(oi.quantity) AS total_units
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    c.customer_id,
    c.customer_name
HAVING SUM(oi.quantity) >= 2
ORDER BY o.order_id;`
      },
      output: `order_id  customer_name  total_units
--------  -------------  -----------
101       Ravi           3`
    },
    {
      id: "performance",
      title: "14. Performance Tips",
      paragraphs: [
        "The performance of multi-table JOINs depends on table sizes, indexes, filter selectivity, data distribution, and the execution plan."
      ],
      bullets: [
        "Create appropriate primary keys and foreign keys to model relationships and enforce data integrity.",
        "Consider indexes on columns used in join conditions, such as customer_id and order_id.",
        "Select only the columns needed by the application or report instead of using SELECT *.",
        "Apply filters that match the business requirement to reduce unnecessary input rows when possible.",
        "Use EXPLAIN to inspect how the database plans the joins.",
        "Avoid joining large tables unnecessarily when a smaller pre-aggregated result is sufficient.",
        "Check for row multiplication before applying SUM() or COUNT() across multiple one-to-many relationships.",
        "Do not assume the written join order is the exact physical execution order; optimizers can choose a different plan while preserving the required result."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    oi.product_name,
    oi.quantity
FROM join_customers AS c
INNER JOIN join_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN join_order_items AS oi
    ON o.order_id = oi.order_id
WHERE oi.quantity >= 2;`
      },
      paragraphs: [
        "EXPLAIN shows the execution plan in a database-specific format. Use it to investigate access paths, join strategies, and estimated row counts."
      ]
    },
    {
      id: "interview",
      title: "15. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can we join more than two tables?",
          answer:
            "Yes. Add another JOIN with its own ON condition for each additional table."
        },
        {
          question: "Why are aliases useful in multi-table joins?",
          answer:
            "They shorten table names and make it clear which table each column belongs to."
        },
        {
          question: "What happens if an order has three matching items?",
          answer:
            "The order can appear in three result rows, one for each matching item."
        },
        {
          question: "How do you avoid ambiguous column names?",
          answer:
            "Qualify columns with their table name or alias, such as c.customer_id."
        },
        {
          question: "What is the role of each join in the three-table example?",
          answer:
            "The first join connects customers to orders using customer_id. The second connects orders to order_items using order_id."
        },
        {
          question: "Why can INNER JOIN remove an order from the result?",
          answer:
            "If an order has no matching customer or no matching order item at the relevant join step, the order's row combination is excluded."
        },
        {
          question: "What is the difference between COUNT(item_id) and SUM(quantity)?",
          answer:
            "COUNT(item_id) counts item rows, while SUM(quantity) adds the quantities represented by those rows."
        },
        {
          question: "How can a multi-table JOIN cause incorrect totals?",
          answer:
            "Joining an order to several item rows repeats order-level values. Summing those repeated values can overcount the order total."
        },
        {
          question: "How do WHERE and HAVING differ in a multi-table report?",
          answer:
            "WHERE filters input rows before grouping. HAVING filters groups after aggregate calculations."
        },
        {
          question: "How do you improve a slow multi-table JOIN?",
          answer:
            "Review the execution plan, consider suitable indexes, select only necessary columns, and reduce unnecessary rows or joins without changing the intended result."
        }
      ]
    },
    {
      id: "revision",
      title: "16. Quick Revision Notes",
      paragraphs: [
        "A multi-table INNER JOIN follows the relationships between tables and returns only matching combinations."
      ],
      bullets: [
        "Use the correct key columns in every ON condition.",
        "Aliases make multi-table queries easier to read.",
        "One order can produce multiple rows when it contains multiple items.",
        "COUNT(item_id) counts item rows; SUM(quantity) calculates total units.",
        "WHERE filters rows before grouping.",
        "HAVING filters grouped results.",
        "One-to-many joins can multiply rows and cause incorrect aggregate totals.",
        "Use EXPLAIN and suitable indexes to investigate performance.",
        "Verify sample outputs against the data and every join condition."
      ]
    }
  ]
};
