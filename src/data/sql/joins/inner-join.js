
export const innerJoin = {
  id: 2053,
  title: "INNER JOIN",
  slug: "inner-join",
  topicTitle: "SQL Joins",
  description:
    "Learn how INNER JOIN returns rows with matching values in both tables.",
  estimatedTime: "20 min",
  sections: [
    {
      id: "inner-intro",
      title: "1. What Is INNER JOIN?",
      paragraphs: [
        "INNER JOIN returns rows that satisfy the join condition in both tables. Rows without a match are excluded.",
        "For example, a customers table stores customer details, while an orders table stores purchases. The customer_id column connects an order to its customer.",
        "When SQL performs an INNER JOIN, it compares the values specified in the ON condition and returns the matching row combinations. It does not automatically return one row per customer.",
        "Assume Ravi has two orders, Priya has one order, and Anu has no orders. The result contains two rows for Ravi, one for Priya, and no row for Anu."
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
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           101       1500.00
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "FROM customers AS c selects the customers table and gives it the alias c.",
        "INNER JOIN orders AS o joins the orders table using the alias o.",
        "ON c.customer_id = o.customer_id defines the matching condition.",
        "ORDER BY o.order_id sorts the output by order ID.",
        "Anu is excluded because she has no matching order."
      ]
    },
    {
      id: "inner-sample-data",
      title: "2. Sample Tables and Test Data",
      paragraphs: [
        "Use these sample tables to run the examples in this lesson. Create the customers table first, followed by the orders table.",
        "The sample deliberately includes a customer without orders so you can observe how INNER JOIN excludes unmatched customers.",
        "If these tables already exist from the previous lessons, do not recreate them or insert the same primary keys again."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2)
);

INSERT INTO customers VALUES
    (1, 'Ravi'),
    (2, 'Priya'),
    (3, 'Anu');

INSERT INTO orders VALUES
    (101, 1, 1500.00),
    (102, 1, 2500.00),
    (103, 2, 1800.00);

SELECT * FROM customers ORDER BY customer_id;
SELECT * FROM orders ORDER BY order_id;`
      },
      output: `customers
customer_id  customer_name
-----------  -------------
1            Ravi
2            Priya
3            Anu

orders
order_id  customer_id  order_total
--------  -----------  -----------
101       1            1500.00
102       1            2500.00
103       2            1800.00`,
      bullets: [
        "Ravi has customer_id 1 and two orders.",
        "Priya has customer_id 2 and one order.",
        "Anu has customer_id 3 and no orders.",
        "Each order has its own order_id and references a customer through customer_id."
      ]
    },
    {
      id: "inner-short",
      title: "3. INNER JOIN Syntax",
      paragraphs: [
        "The INNER keyword is optional in standard join syntax, so JOIN and INNER JOIN mean the same thing when used without another join type.",
        "Both versions use the same matching condition and produce the same result. Use INNER JOIN when you want to make the join type explicit and easier for beginners to understand.",
        "The ON condition is important because it tells the database which records are related. Omitting the intended matching condition can produce an incorrect result or a Cartesian product, depending on the query."
      ],
      code: {
        language: "sql",
        code: `-- Explicit syntax
SELECT c.customer_name, o.order_id
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id;

-- Short syntax: same join type and matching logic
SELECT c.customer_name, o.order_id
FROM customers AS c
JOIN orders AS o
    ON c.customer_id = o.customer_id;`
      },
      output: `customer_name  order_id
-------------  --------
Ravi           101
Ravi           102
Priya          103`
    },
    {
      id: "inner-where",
      title: "4. INNER JOIN with a Filter",
      paragraphs: [
        "You can combine INNER JOIN with WHERE to filter matching rows based on a condition.",
        "This example returns orders greater than 1700. Ravi's order for 1500 is excluded, while his order for 2500 and Priya's order for 1800 remain.",
        "The join establishes the relationship between customers and orders. WHERE then restricts the joined rows according to the order total."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total > 1700
ORDER BY o.order_total DESC;`
      },
      output: `customer_name  order_total
-------------  -----------
Ravi           2500.00
Priya          1800.00`,
      bullets: [
        "The comparison operator > excludes an order worth exactly 1700.",
        "DESC sorts the largest order total first.",
        "The WHERE condition filters orders; it does not change the key relationship."
      ]
    },
    {
      id: "inner-duplicates",
      title: "5. Why Can a Customer Appear Multiple Times?",
      paragraphs: [
        "A customer appears once for each matching order. A JOIN does not automatically return one row per customer.",
        "Ravi appears twice because orders 101 and 102 both reference customer_id 1. These are two different matching order records, not duplicate rows caused by an error.",
        "If you need one row per customer, use an aggregate such as COUNT() or SUM(), with GROUP BY at the customer level."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2
Priya          1`,
      bullets: [
        "COUNT(o.order_id) counts matching orders.",
        "GROUP BY c.customer_id, c.customer_name produces one result row per customer represented in the joined data.",
        "Anu remains absent because INNER JOIN removes customers without matching orders before grouping.",
        "If you need customers with zero orders, use LEFT JOIN instead."
      ]
    },
    {
      id: "inner-sum",
      title: "6. INNER JOIN with SUM()",
      paragraphs: [
        "An INNER JOIN can combine related records and calculate a total. For example, a business may want to know how much each customer has spent on orders.",
        "SUM(o.order_total) adds the order totals for each customer. The query returns only customers with at least one matching order because it uses INNER JOIN."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    SUM(o.order_total) AS total_spent
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC;`
      },
      output: `customer_id  customer_name  total_spent
-----------  -------------  -----------
1            Ravi           4000.00
2            Priya          1800.00`,
      bullets: [
        "Ravi's total is 1500 + 2500 = 4000.",
        "Priya's total is 1800.",
        "Anu is excluded because she has no matching order.",
        "If order totals represent payments, refunds, or discounts differently in a real application, define the business meaning of the total before reporting it."
      ]
    },
    {
      id: "inner-multiple-conditions",
      title: "7. INNER JOIN with Multiple Conditions",
      paragraphs: [
        "The ON clause can contain more than one condition when the relationship requires it. Conditions can also be added to WHERE to filter the matching rows.",
        "This example uses the customer ID for matching and then filters for orders between 1500 and 2000, inclusive.",
        "BETWEEN includes both endpoints, so an order worth exactly 1500 or 2000 would qualify."
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
WHERE o.order_total BETWEEN 1500 AND 2000
ORDER BY o.order_total;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           101       1500.00
Priya          103       1800.00`
    },
    {
      id: "inner-three-tables",
      title: "8. INNER JOIN Across Three Tables",
      paragraphs: [
        "SQL can join more than two tables in one query. Each additional JOIN introduces another related table and its matching condition.",
        "For example, an order_items table may contain individual products within each order, while a products table stores product names and prices. Joining customers, orders, order_items, and products can produce a detailed customer purchase report.",
        "The following query illustrates a three-table join using customers, orders, and order_items. It assumes order_items has order_item_id, order_id, product_name, and quantity columns, with order_id referencing orders.order_id."
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
ORDER BY o.order_id, oi.order_item_id;`
      },
      bullets: [
        "The first JOIN connects customers to their orders.",
        "The second JOIN connects each order to its order items.",
        "The result contains only customers with matching orders that also have matching order-item records.",
        "This example requires an order_items table with the columns referenced in the query; that table is not created in the earlier sample setup.",
        "When several one-to-many relationships are joined, the result can contain multiple rows per order."
      ]
    },
    {
      id: "inner-common-mistakes",
      title: "9. Common INNER JOIN Mistakes",
      paragraphs: [
        "Understanding matching conditions and table relationships helps prevent incorrect results."
      ],
      bullets: [
        "Missing the ON condition: specify how rows are related, such as c.customer_id = o.customer_id.",
        "Joining on the wrong columns: similar column names do not guarantee a correct relationship.",
        "Expecting one row per customer: one-to-many relationships naturally produce multiple rows per customer.",
        "Using SELECT DISTINCT to hide unexpected duplicate rows: investigate the join relationship first. DISTINCT removes duplicate output combinations but does not fix incorrect join logic.",
        "Using COUNT(*) when counting matching orders after a LEFT JOIN: COUNT(*) also counts the preserved row for a customer without orders. COUNT(o.order_id) is generally appropriate when order_id is non-NULL for actual orders.",
        "Forgetting table aliases: qualify repeated column names to avoid ambiguity.",
        "Misunderstanding WHERE: a filter on the joined table can remove otherwise matching records from the final result.",
        "Overcounting totals after joining multiple one-to-many tables: aggregate at the correct level before combining summaries when necessary."
      ]
    },
    {
      id: "practice-beginner",
      title: "10. Practice Exercise: Find Orders Above 2000",
      paragraphs: [
        "Question: Display customer names, order IDs, and order totals for orders greater than 2000.",
        "Use INNER JOIN to match customers to orders and WHERE to filter the order total."
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
WHERE o.order_total > 2000
ORDER BY o.order_total DESC;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00`
    },
    {
      id: "practice-intermediate",
      title: "11. Practice Exercise: Count Orders per Customer",
      paragraphs: [
        "Question: Display the number of orders for every customer who has placed at least one order.",
        "Use INNER JOIN with GROUP BY and COUNT(). Because the requirement excludes customers without orders, INNER JOIN is appropriate."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY order_count DESC, c.customer_id;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2
Priya          1`
    },
    {
      id: "practice-advanced",
      title: "12. Practice Exercise: Find Customers with Total Orders Above 2000",
      paragraphs: [
        "Question: Display customers whose combined order total is greater than 2000.",
        "Use INNER JOIN to connect customers and orders, GROUP BY to calculate a total per customer, and HAVING to filter customers based on the aggregate total."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    SUM(o.order_total) AS total_spent
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000
ORDER BY total_spent DESC;`
      },
      output: `customer_name  total_spent
-------------  -----------
Ravi           4000.00`,
      bullets: [
        "Ravi qualifies because his combined total is 4000.",
        "Priya is excluded because her total is 1800.",
        "Anu is excluded because she has no matching orders.",
        "HAVING filters grouped totals, whereas WHERE filters individual rows."
      ]
    },
    {
      id: "performance",
      title: "13. INNER JOIN Performance Tips",
      paragraphs: [
        "Join performance depends on table size, indexes, filtering conditions, data distribution, and the database optimizer. The following practices can help keep queries efficient and accurate."
      ],
      bullets: [
        "Index key columns used in frequent joins when appropriate, and review the execution plan to confirm the benefit.",
        "Use primary keys and foreign keys to define and enforce relationships in the schema.",
        "Select only the columns required by the report instead of using SELECT * on large tables.",
        "Filter rows according to the actual business requirement to reduce unnecessary processing when possible.",
        "Use EXPLAIN in supported databases to inspect the query plan.",
        "Check whether joins across one-to-many tables multiply rows before calculating SUM() or COUNT().",
        "Use compatible data types for join keys to avoid unnecessary conversions."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total > 1700;`
      },
      paragraphs: [
        "EXPLAIN displays the database's execution plan. Its output format differs by database. Review access paths, join strategy, and estimated rows to investigate slow queries rather than assuming a particular index will always be used."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What does INNER JOIN return?",
          answer:
            "It returns rows where the join condition matches in both tables."
        },
        {
          question: "What happens to unmatched rows?",
          answer:
            "Unmatched rows are excluded from an INNER JOIN result."
        },
        {
          question: "Is JOIN the same as INNER JOIN?",
          answer:
            "Yes. JOIN without a specified outer or cross join type means INNER JOIN in standard SQL."
        },
        {
          question: "Can one row match multiple rows in the other table?",
          answer:
            "Yes. Every matching pair can produce a result row. A customer with multiple orders appears once for each matching order."
        },
        {
          question: "What is the purpose of the ON clause?",
          answer:
            "ON specifies the condition used to match rows between the joined tables."
        },
        {
          question: "Can we use WHERE with INNER JOIN?",
          answer:
            "Yes. WHERE filters the rows that satisfy the join condition, such as orders above a particular amount."
        },
        {
          question: "How do you calculate total order value per customer?",
          answer:
            "Join customers to orders, group by the customer key and name, and use SUM(order_total)."
        },
        {
          question: "Does INNER JOIN require a foreign key constraint?",
          answer:
            "No. The ON condition performs the join. A foreign key constraint separately enforces the validity of references in the stored data."
        },
        {
          question: "Why might a JOIN return more rows than the first table?",
          answer:
            "A row in the first table may match multiple rows in the second table, as happens when a customer has several orders."
        },
        {
          question: "How is INNER JOIN different from LEFT JOIN?",
          answer:
            "INNER JOIN returns only matching row combinations. LEFT JOIN also preserves every row from the left table, even when there is no right-side match."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision Notes",
      paragraphs: [
        "Remember the central rule: INNER JOIN returns matching row combinations based on the ON condition."
      ],
      bullets: [
        "JOIN and INNER JOIN are equivalent when no other join type is specified.",
        "ON defines the matching relationship between tables.",
        "WHERE filters the matching rows.",
        "A one-to-many relationship can produce multiple rows for one parent record.",
        "GROUP BY with COUNT() or SUM() can summarize joined records.",
        "HAVING filters groups based on aggregate values.",
        "Unmatched rows are excluded from INNER JOIN results.",
        "Use LEFT JOIN when unmatched rows from the left table must remain in the output.",
        "Check row counts and join cardinality before aggregating data from multiple tables."
      ]
    }
  ]
};
