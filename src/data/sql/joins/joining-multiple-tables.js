
export const joiningMultipleTables = {
  id: 2060,
  title: "Joining Three or More Tables",
  slug: "joining-multiple-tables",
  topicTitle: "SQL Joins",
  description:
    "Learn how to combine customer, order, order-item, and product data using multiple joins, relationship keys, filtering, aggregation, and practical multi-table query patterns.",
  estimatedTime: "40 min",
  sections: [
    {
      id: "multi-intro",
      title: "1. Why Join Multiple Tables?",
      paragraphs: [
        "Real applications often store customers, orders, products, and order items in separate tables. Each table represents a different entity or relationship, and multiple joins combine related records into a useful result.",
        "For example, a customer places an order, an order contains order items, and each order item refers to a product. To display the customer name, order ID, product name, and quantity together, the query must connect all four tables.",
        "A JOIN does not automatically know how tables are related. Each ON condition specifies how records from the joined tables match.",
        "In a normalized database, storing these details in separate tables reduces repeated data and helps maintain consistency."
      ],
      bullets: [
        "customers stores customer information.",
        "orders stores order information and the customer associated with each order.",
        "order_items stores the products and quantities included in each order.",
        "products stores product information such as product names.",
        "Multiple JOIN clauses combine related data across these tables.",
        "The result can contain multiple rows for one order because an order may contain several items."
      ]
    },
    {
      id: "multi-setup",
      title: "2. Create the Practice Tables",
      paragraphs: [
        "The following script creates four tables and inserts sample data. The demo_ prefix helps separate these practice tables from any existing application tables.",
        "The sample uses primary keys to identify records. The relationship columns are customer_id in demo_orders, order_id and product_id in demo_order_items, and product_id in demo_products.",
        "The example does not declare foreign key constraints, but the JOIN queries still work because their ON conditions define the matching relationships. Foreign keys can be added to enforce referential integrity."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE demo_customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE demo_orders (
    order_id INT PRIMARY KEY,
    customer_id INT
);

CREATE TABLE demo_products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);

CREATE TABLE demo_order_items (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT
);

INSERT INTO demo_customers VALUES
    (1, 'Ravi'),
    (2, 'Priya');

INSERT INTO demo_orders VALUES
    (101, 1),
    (102, 2);

INSERT INTO demo_products VALUES
    (10, 'Keyboard'),
    (20, 'Mouse'),
    (30, 'Monitor');

INSERT INTO demo_order_items VALUES
    (1, 101, 10, 2),
    (2, 101, 20, 1),
    (3, 102, 30, 1);`
      },
      output: `demo_customers
customer_id  customer_name
-----------  -------------
1            Ravi
2            Priya

demo_orders
order_id  customer_id
--------  -----------
101       1
102       2

demo_products
product_id  product_name
----------  ------------
10          Keyboard
20          Mouse
30          Monitor

demo_order_items
item_id  order_id  product_id  quantity
-------  --------  ----------  --------
1        101       10          2
2        101       20          1
3        102       30          1`,
      bullets: [
        "Ravi has order 101.",
        "Priya has order 102.",
        "Order 101 contains a Keyboard and a Mouse.",
        "Order 102 contains a Monitor.",
        "The order_items table connects orders to products and records the quantity for each item."
      ]
    },
    {
      id: "multi-query",
      title: "3. Join All Four Tables",
      paragraphs: [
        "This query connects customers to orders, orders to order items, and order items to products.",
        "Each JOIN adds information from another table. The aliases c, o, oi, and p make the query shorter and clarify which table each column belongs to.",
        "INNER JOIN is used for all relationships, so only records that have matching rows at every join step are included."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2
Ravi           101       Mouse         1
Priya          102       Monitor       1`,
      bullets: [
        "First, customers match orders using customer_id.",
        "Next, orders match order_items using order_id.",
        "Then, order_items match products using product_id.",
        "Finally, ORDER BY sorts the result by order and item.",
        "Ravi appears twice because order 101 contains two items."
      ]
    },
    {
      id: "multi-step",
      title: "4. Understand the Join Chain Step by Step",
      paragraphs: [
        "A useful way to understand a multi-table query is to trace each relationship in order. You do not need to memorize the complete query immediately; first understand how each table connects to the next.",
        "The first join matches Ravi with order 101 and Priya with order 102. The next join expands each order into its order-item rows. The final join adds the name of the product referenced by each item."
      ],
      code: {
        language: "sql",
        code: `-- Step 1: Customers and orders
SELECT
    c.customer_name,
    o.order_id
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_id;

-- Step 2: Add order items
SELECT
    c.customer_name,
    o.order_id,
    oi.product_id,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `Step 1
customer_name  order_id
-------------  --------
Ravi           101
Priya          102

Step 2
customer_name  order_id  product_id  quantity
-------------  --------  ----------  --------
Ravi           101       10          2
Ravi           101       20          1
Priya          102       30          1`,
      paragraphs: [
        "The second query produces more rows because order 101 has two order items. Joining another one-to-many relationship can increase the number of result rows.",
        "Step-by-step queries are useful for debugging because they help identify which relationship causes missing or unexpectedly repeated rows."
      ]
    },
    {
      id: "multi-rules",
      title: "5. Rules for Multiple Joins",
      paragraphs: [
        "A multi-table JOIN should follow the actual relationships in the schema. Each join must connect the appropriate keys and preserve the intended meaning of the query."
      ],
      bullets: [
        "Use an alias for every table, especially when several tables have columns with the same name.",
        "Write a correct ON condition for each relationship.",
        "Qualify ambiguous columns, such as c.customer_id or o.order_id.",
        "Check whether one-to-many relationships will produce multiple result rows.",
        "Use LEFT JOIN when unmatched rows from a particular table must be preserved.",
        "Choose the join type according to the required output, not merely because INNER JOIN is shorter.",
        "Avoid joining unrelated tables without a valid relationship or an intentional Cartesian product.",
        "Use ORDER BY when the result must appear in a predictable order."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.item_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id
ORDER BY c.customer_id, o.order_id, oi.item_id;`
      },
      paragraphs: [
        "Including item_id makes it easier to distinguish separate order-item records when an order contains multiple items or repeated products."
      ]
    },
    {
      id: "multi-left-join",
      title: "6. Using LEFT JOIN in Multi-Table Queries",
      paragraphs: [
        "INNER JOIN removes a row when it has no matching record at a join step. LEFT JOIN preserves rows from its left input and fills the right-side columns with NULL when no match exists.",
        "For example, if the report must include every customer, even customers without orders, start with demo_customers and use LEFT JOIN for the relationship to demo_orders.",
        "The choice of join type matters at each step. A later INNER JOIN can remove rows that an earlier LEFT JOIN preserved."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.item_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
LEFT JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
LEFT JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
LEFT JOIN demo_products AS p
    ON oi.product_id = p.product_id
ORDER BY c.customer_id, o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  item_id  product_name  quantity
-------------  --------  -------  ------------  --------
Ravi           101       1        Keyboard      2
Ravi           101       2        Mouse         1
Priya          102       3        Monitor       1`,
      paragraphs: [
        "The current sample has at least one order and item for each customer, so the LEFT JOIN version returns the same visible rows as the INNER JOIN version.",
        "If a third customer has no order, the LEFT JOIN version preserves that customer with NULL order and item columns. The INNER JOIN version would exclude that customer.",
        "When using LEFT JOIN, place conditions carefully. A WHERE condition on a right-side column can remove rows with NULL values and change the result."
      ]
    },
    {
      id: "multi-filter",
      title: "7. Filter Multi-Table JOIN Results",
      paragraphs: [
        "A multi-table query can filter by values from any joined table. For example, the query can return only order items whose quantity is at least two or only products with a particular name.",
        "WHERE filters the joined result. If a condition refers to a right-side table in a LEFT JOIN, it may remove unmatched rows. When unmatched rows must remain, consider whether the condition belongs in ON instead."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id
WHERE oi.quantity >= 2
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2`,
      bullets: [
        "The joins establish the relationships among customers, orders, items, and products.",
        "WHERE oi.quantity >= 2 keeps only qualifying item rows.",
        "Ravi's Keyboard item qualifies because its quantity is 2.",
        "The Mouse and Monitor items do not qualify because their quantities are 1."
      ]
    },
    {
      id: "multi-aggregate",
      title: "8. Aggregate Data Across Multiple Tables",
      paragraphs: [
        "Multi-table joins can be combined with aggregate functions to calculate order quantities, item counts, and other business metrics.",
        "For example, joining customers, orders, and order items allows you to calculate the total units in each order.",
        "COUNT(oi.item_id) counts order-item records, while SUM(oi.quantity) adds the quantities of the items. These metrics have different meanings: item count measures line records, whereas total units measures the number of units ordered."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    COUNT(oi.item_id) AS item_line_count,
    SUM(oi.quantity) AS total_units
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
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
      paragraphs: [
        "Order 101 contains two item lines: two Keyboards and one Mouse. Its item_line_count is 2 and total_units is 3.",
        "Order 102 contains one item line with one Monitor. Its item_line_count and total_units are both 1.",
        "Be careful when joining multiple one-to-many tables before aggregation. If another joined table multiplies each order-item row, SUM can become inflated. Aggregate at the correct level before combining multiple independent child collections."
      ]
    },
    {
      id: "multi-having",
      title: "9. Filter Groups with HAVING",
      paragraphs: [
        "HAVING filters groups after GROUP BY has formed them. It is useful when the requirement depends on an aggregate, such as finding orders containing more than one item line or more than two total units.",
        "WHERE filters individual rows before grouping, whereas HAVING filters the resulting groups."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    SUM(oi.quantity) AS total_units
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY
    c.customer_id,
    c.customer_name,
    o.order_id
HAVING SUM(oi.quantity) > 2
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id  total_units
-------------  --------  -----------
Ravi           101       3`,
      bullets: [
        "GROUP BY creates one group per customer and order.",
        "SUM(oi.quantity) calculates the total units for each order.",
        "HAVING keeps only groups whose total quantity exceeds 2.",
        "Ravi's order 101 qualifies because its total quantity is 3."
      ]
    },
    {
      id: "multi-count",
      title: "10. Understand Duplicate-Looking Rows",
      paragraphs: [
        "A multi-table join may repeat customer names and order IDs because each order can contain several order-item records. This is normal for a one-to-many relationship.",
        "For example, Ravi appears twice because order 101 contains two different items. Those rows are not duplicates if they represent different order-item records.",
        "Adding DISTINCT can remove identical result rows, but it should not be used automatically to hide repeated rows caused by an incorrect join or an unexpected relationship."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    oi.item_id,
    p.product_name
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  item_id  product_name
-------------  --------  -------  ------------
Ravi           101       1        Keyboard
Ravi           101       2        Mouse
Priya          102       3        Monitor`,
      bullets: [
        "Identify the intended grain of the result: customer, order, item, or product.",
        "Include an appropriate identifier when each result row must be distinguishable.",
        "Check join keys when the result contains more rows than expected.",
        "Use DISTINCT only when removing identical result rows is genuinely part of the requirement."
      ]
    },
    {
      id: "multi-common-mistakes",
      title: "11. Common Multi-Table JOIN Mistakes",
      paragraphs: [
        "Joining several tables increases the importance of correct relationship conditions. A mistake in one ON clause can multiply rows, exclude records, or associate unrelated data."
      ],
      bullets: [
        "Mistake: joining tables on unrelated columns. Fix: follow the actual primary-key and foreign-key relationships.",
        "Mistake: forgetting an ON condition. Fix: provide the intended relationship for every regular JOIN.",
        "Mistake: using unqualified column names when several tables contain the same name. Fix: qualify columns with aliases.",
        "Mistake: assuming each order produces one row. Fix: remember that each order-item record can create another result row.",
        "Mistake: using INNER JOIN when unmatched primary records must remain. Fix: choose LEFT JOIN for the appropriate preserved table.",
        "Mistake: placing a right-side filter in WHERE and unintentionally removing unmatched rows. Fix: examine whether the filter should restrict matching in ON.",
        "Mistake: summing values after joins multiply records. Fix: aggregate at the correct level or pre-aggregate related child data.",
        "Mistake: using DISTINCT to hide an incorrect join. Fix: inspect the join conditions and output grain."
      ],
      code: {
        language: "sql",
        code: `-- Correct relationship chain
SELECT
    c.customer_name,
    o.order_id,
    p.product_name
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id;`
      }
    },
    {
      id: "multi-performance",
      title: "12. Performance and Indexing",
      paragraphs: [
        "The performance of a multi-table query depends on table sizes, indexes, join conditions, data distribution, filtering, and the optimizer's execution plan.",
        "Primary keys on customer_id, order_id, product_id, and item_id help identify records. Indexes on relationship columns such as demo_orders.customer_id, demo_order_items.order_id, and demo_order_items.product_id can help queries that frequently join through those columns.",
        "An index is not automatically beneficial for every query. Index selection should be based on workload and execution-plan evidence.",
        "Selecting only necessary columns can reduce data transfer and processing. Applying selective filters may reduce the number of rows that need to be processed, depending on the execution plan.",
        "For queries involving several one-to-many relationships, check whether joins multiply rows before aggregating."
      ],
      bullets: [
        "Use appropriate indexes on join keys when justified by query patterns.",
        "Use primary keys to identify records reliably.",
        "Inspect query plans with EXPLAIN or the database's equivalent.",
        "Select only the columns required by the report.",
        "Apply appropriate filters and verify that they preserve the intended semantics.",
        "Pre-aggregate independent child tables when joining them together would inflate totals.",
        "Measure important queries with realistic data volumes."
      ],
      code: {
        language: "sql",
        code: `-- MySQL example: inspect the execution plan
EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id;`
      },
      paragraphs: [
        "EXPLAIN displays the optimizer's planned execution strategy in MySQL. The actual plan depends on the database version, table definitions, indexes, statistics, and data distribution."
      ]
    },
    {
      id: "multi-practice-beginner",
      title: "13. Practice Exercise 1: Display Customer and Product Details",
      paragraphs: [
        "Task: display each customer's name, order ID, product name, and quantity using all four practice tables."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN demo_products AS p
    ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.item_id;`
      },
      output: `customer_name  order_id  product_name  quantity
-------------  --------  ------------  --------
Ravi           101       Keyboard      2
Ravi           101       Mouse         1
Priya          102       Monitor       1`,
      bullets: [
        "Connect customers to orders using customer_id.",
        "Connect orders to order items using order_id.",
        "Connect order items to products using product_id.",
        "Sort by order and item identifiers for predictable output."
      ]
    },
    {
      id: "multi-practice-intermediate",
      title: "14. Practice Exercise 2: Find Orders with More Than Two Units",
      paragraphs: [
        "Task: calculate the total units in each order and return only orders containing more than two units."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    c.customer_name,
    SUM(oi.quantity) AS total_units
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    c.customer_id,
    c.customer_name
HAVING SUM(oi.quantity) > 2
ORDER BY o.order_id;`
      },
      output: `order_id  customer_name  total_units
--------  -------------  -----------
101       Ravi           3`,
      bullets: [
        "GROUP BY creates one group for each order and its customer.",
        "SUM(oi.quantity) calculates the total number of units.",
        "HAVING filters groups using the aggregate result."
      ]
    },
    {
      id: "multi-practice-advanced",
      title: "15. Practice Exercise 3: Count Item Lines and Units",
      paragraphs: [
        "Task: produce one row per order, showing the customer name, number of item lines, and total quantity of units."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    COUNT(oi.item_id) AS item_line_count,
    SUM(oi.quantity) AS total_units
FROM demo_customers AS c
INNER JOIN demo_orders AS o
    ON c.customer_id = o.customer_id
INNER JOIN demo_order_items AS oi
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
        "COUNT(oi.item_id) counts order-item records.",
        "SUM(oi.quantity) adds the quantities across the order's item records.",
        "The grouping produces one result row per order.",
        "The item-line count and total unit count are different metrics."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can SQL join four or more tables?",
          answer:
            "Yes. Add each table with a JOIN and its matching ON condition."
        },
        {
          question: "How do you trace a multi-table join?",
          answer:
            "Follow each relationship from one table to the next and verify the keys used in every ON condition."
        },
        {
          question: "Why can multi-table joins produce duplicate-looking rows?",
          answer:
            "One-to-many relationships can produce multiple rows for a parent record. These rows may represent different child records rather than accidental duplicates."
        },
        {
          question: "How do you prevent ambiguous column references?",
          answer:
            "Use qualified names such as c.customer_id and o.order_id."
        },
        {
          question: "What is the purpose of a table alias?",
          answer:
            "An alias shortens table references and makes it clear which table a column belongs to."
        },
        {
          question: "What is the difference between INNER JOIN and LEFT JOIN in a multi-table query?",
          answer:
            "INNER JOIN keeps matching combinations only. LEFT JOIN preserves all rows from its left input, even when no right-side match exists."
        },
        {
          question: "Can a multi-table JOIN include aggregate functions?",
          answer:
            "Yes. Use aggregate functions such as COUNT and SUM with GROUP BY to summarize joined records."
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          answer:
            "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY, often using aggregate conditions."
        },
        {
          question: "How do you avoid inflated totals in multi-table joins?",
          answer:
            "Understand the row multiplication caused by one-to-many relationships and pre-aggregate child data when necessary."
        },
        {
          question: "How do you debug a multi-table JOIN that returns too many rows?",
          answer:
            "Run the joins incrementally, inspect each ON condition, verify key uniqueness, and identify which relationship multiplies the result."
        },
        {
          question: "How can multi-table JOIN performance be improved?",
          answer:
            "Use appropriate indexes, select only required columns, apply suitable filters, and inspect the execution plan."
        },
        {
          question: "Why are primary keys and foreign keys useful in multi-table JOINs?",
          answer:
            "Primary keys identify records uniquely, while foreign keys can enforce valid relationships between tables. JOIN syntax itself uses the specified matching conditions."
        }
      ]
    },
    {
      id: "multi-revision",
      title: "17. Quick Revision Notes",
      bullets: [
        "Multiple JOINs combine related records from three or more tables.",
        "Each ON condition defines a relationship between joined tables.",
        "Aliases improve readability and clarify column ownership.",
        "INNER JOIN returns matching combinations only.",
        "LEFT JOIN preserves rows from its left input.",
        "One-to-many relationships can produce multiple rows per parent.",
        "COUNT counts records or non-NULL values depending on the expression.",
        "SUM calculates totals, and HAVING filters groups by aggregate conditions.",
        "Use the correct relationship keys and qualify ambiguous columns.",
        "Check for row multiplication before aggregating multiple child relationships.",
        "Use indexes and execution plans when investigating performance."
      ],
      paragraphs: [
        "Memory trick: follow the relationship chain. Customers connect to orders, orders connect to order items, and order items connect to products. Every JOIN adds the next related piece of information."
      ]
    }
  ]
};
