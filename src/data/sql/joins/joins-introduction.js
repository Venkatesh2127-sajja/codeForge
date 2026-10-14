
export const joinsIntroduction = {
  id: 2051,
  title: "Introduction to SQL Joins",
  slug: "joins-introduction",
  topicTitle: "SQL Joins",
  description:
    "Understand why SQL joins are needed and how related tables can be combined using matching columns.",
  estimatedTime: "20 min",
  sections: [
    {
      id: "what-is-join",
      title: "1. What Is a SQL JOIN?",
      paragraphs: [
        "A SQL JOIN combines rows from two or more tables using a related column or join condition.",
        "Relational databases commonly separate information into multiple tables to reduce unnecessary duplication. For example, a customers table stores customer details while an orders table stores purchases.",
        "A JOIN allows you to retrieve related information from these tables in one query. Instead of storing the customer name repeatedly in every order record, the orders table can store customer_id and reference the corresponding customer.",
        "The ON clause defines how rows from the tables are matched. In this example, customers.customer_id must equal orders.customer_id.",
        "A JOIN does not automatically combine rows based on similarly named columns. You must specify the correct relationship or join condition."
      ],
      code: {
        language: "sql",
        code: `SELECT
    customers.customer_name,
    orders.order_id,
    orders.order_total
FROM customers
INNER JOIN orders
    ON customers.customer_id = orders.customer_id;`
      },
      bullets: [
        "customers is the first table.",
        "orders is the second table.",
        "customer_id is the matching key in both tables.",
        "INNER JOIN returns only rows that satisfy the join condition.",
        "The result can contain more rows than either table if one customer has multiple orders."
      ]
    },
    {
      id: "sample-tables",
      title: "2. Example Tables",
      paragraphs: [
        "Consider these two tables. The customers table contains three customers, while the orders table contains three orders.",
        "Ravi has two orders, Priya has one order, and Anu has no orders. This difference will help demonstrate why different JOIN types produce different results.",
        "In a typical relational design, orders.customer_id would be a foreign key referencing customers.customer_id. The following simplified schema omits the foreign-key constraint so the relationship can be introduced step by step."
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

SELECT * FROM customers;
SELECT * FROM orders;`
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
        "The customers table contains three rows.",
        "The orders table contains three rows.",
        "Customer 1, Ravi, appears in two order records.",
        "Customer 2, Priya, appears in one order record.",
        "Customer 3, Anu, does not appear in the orders table."
      ]
    },
    {
      id: "inner-join-example",
      title: "3. Combining Related Records",
      paragraphs: [
        "The INNER JOIN matches each customer with orders that have the same customer_id. Only matching customer-order combinations are returned.",
        "Ravi appears twice because he has two matching orders. Priya appears once because she has one matching order. Anu does not appear because she has no matching order.",
        "This is an example of a one-to-many relationship: one customer can have many orders, while each order belongs to one customer in this simplified model."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           101       1500.00
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "Order 101 matches Ravi because both records use customer_id 1.",
        "Order 102 also matches Ravi for the same reason.",
        "Order 103 matches Priya because both records use customer_id 2.",
        "Anu is excluded because INNER JOIN does not preserve unmatched customer rows."
      ]
    },
    {
      id: "join-aliases",
      title: "4. Table Aliases in JOINs",
      paragraphs: [
        "A table alias is a temporary name used within a query. Aliases make SQL shorter and easier to read, especially when multiple tables contain columns with the same name.",
        "In this example, c represents customers and o represents orders. Therefore, c.customer_id means the customer_id column from customers, while o.customer_id means the customer_id column from orders.",
        "The AS keyword is optional for table aliases in many SQL databases. Both FROM customers c and FROM customers AS c are valid in MySQL."
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
        "Use table aliases to make long queries easier to understand.",
        "Qualify columns when both tables have a column with the same name.",
        "Aliases do not rename the underlying table or change its stored data."
      ]
    },
    {
      id: "join-types",
      title: "5. Common Types of JOINs",
      paragraphs: [
        "SQL JOIN types determine how matching and unmatched rows are handled. The correct JOIN depends on the question the report needs to answer.",
        "Using the sample tables, an INNER JOIN returns customers with orders. A LEFT JOIN can also show Anu, even though she has no order. A CROSS JOIN creates every possible customer-order combination."
      ],
      bullets: [
        "INNER JOIN: returns rows that match the join condition in both tables.",
        "LEFT JOIN: returns every row from the left table and matching rows from the right table. Missing right-side values are represented by NULL.",
        "RIGHT JOIN: returns every row from the right table and matching rows from the left table. Missing left-side values are represented by NULL.",
        "FULL OUTER JOIN: returns matching rows and unmatched rows from both sides where supported natively.",
        "CROSS JOIN: returns every combination of a row from the first table and a row from the second table.",
        "SELF JOIN: joins a table to itself using aliases, for example to connect employees to their managers."
      ],
      code: {
        language: "sql",
        code: `-- INNER JOIN: only customers with matching orders
SELECT c.customer_name, o.order_id
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id;

-- LEFT JOIN: all customers, including those without orders
SELECT c.customer_name, o.order_id
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id;

-- CROSS JOIN: every customer-order combination
SELECT c.customer_name, o.order_id
FROM customers c
CROSS JOIN orders o;`
      },
      output: `LEFT JOIN result
customer_name  order_id
-------------  --------
Ravi           101
Ravi           102
Priya          103
Anu            NULL

CROSS JOIN result row count: 3 customers x 3 orders = 9 rows`,
      bullets: [
        "An INNER JOIN does not show Anu because no order matches her customer ID.",
        "A LEFT JOIN preserves Anu and returns NULL for the missing order columns.",
        "A CROSS JOIN creates nine combinations because both sample tables contain three rows.",
        "FULL OUTER JOIN is supported natively by PostgreSQL and several other systems, but not by MySQL. In MySQL, a full outer result can be constructed using a carefully written combination of LEFT JOIN and unmatched rows."
      ]
    },
    {
      id: "join-condition",
      title: "6. Understanding the ON Condition",
      paragraphs: [
        "The ON clause specifies the relationship used to match rows. For customers and orders, the intended relationship is customers.customer_id = orders.customer_id.",
        "If you use the wrong condition, the query may return incorrect matches or too many rows. If the condition is omitted from a join that requires matching logic, the result may become a Cartesian product depending on the SQL syntax used.",
        "The columns do not always need to have the same name. A join can compare different columns when their values represent the same business key and their data types are compatible."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00`,
      bullets: [
        "ON matches related records from the tables.",
        "WHERE filters the joined rows based on the order total.",
        "The amount 1800 qualifies because the condition uses >=.",
        "The order total of 1500 is excluded by WHERE."
      ]
    },
    {
      id: "one-to-many-relationship",
      title: "7. Understanding One-to-Many Relationships",
      paragraphs: [
        "A one-to-many relationship means one record in the first table can relate to several records in the second table.",
        "For example, one customer can place multiple orders. The customers table stores each customer once, while the orders table stores a separate row for every order.",
        "When joined, the customer information repeats for each matching order. This is expected behavior, not necessarily duplicate data or a SQL error.",
        "Understanding relationship cardinality is important when counting customers, orders, or revenue. COUNT(*) after joining customers to orders counts joined order rows, not necessarily distinct customers."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_order_value
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY
    c.customer_id,
    c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name  order_count  total_order_value
-----------  -------------  -----------  -----------------
1            Ravi           2            4000.00
2            Priya          1            1800.00
3            Anu            0               0.00`,
      bullets: [
        "COUNT(o.order_id) counts matching orders because order_id is NULL for the unmatched row.",
        "COUNT(*) would count the preserved LEFT JOIN row for Anu, giving a count of one for that joined row. That is why COUNT(o.order_id) is used here.",
        "COALESCE changes a NULL sum to zero for display. Whether zero is the correct business interpretation should be confirmed for the report.",
        "Grouping by the customer's key and name produces one summary row per customer."
      ]
    },
    {
      id: "join-filter-placement",
      title: "8. Filtering with ON versus WHERE",
      paragraphs: [
        "The placement of a filter matters particularly with LEFT JOIN. A condition in ON controls which right-side rows match. A condition in WHERE filters the rows produced by the join.",
        "For example, if the requirement is to show every customer but only attach orders worth at least 1800, put the amount condition in ON. Customers without qualifying orders remain in the result.",
        "If you put o.order_total >= 1800 in WHERE, rows with no matching order have NULL in order_total and fail the condition. This removes those customers and makes the result behave like an INNER JOIN for that condition."
      ],
      code: {
        language: "sql",
        code: `-- Preserve all customers; match only orders worth at least 1800
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
   AND o.order_total >= 1800
ORDER BY c.customer_id, o.order_id;`
      },
      output: `customer_name  order_id  order_total
-------------  --------  -----------
Ravi           102       2500.00
Priya          103       1800.00
Anu            NULL      NULL`,
      bullets: [
        "Ravi's 1500 order does not match because it fails the ON condition.",
        "Ravi's 2500 order matches.",
        "Priya's 1800 order matches.",
        "Anu remains because LEFT JOIN preserves every left-side customer."
      ]
    },
    {
      id: "join-common-mistakes",
      title: "9. Common JOIN Mistakes",
      paragraphs: [
        "Many SQL JOIN problems come from incorrect join conditions, misunderstanding unmatched rows, or overlooking one-to-many relationships."
      ],
      bullets: [
        "Missing or incorrect ON condition: use the actual relationship between the tables, such as customer_id.",
        "Ambiguous column names: qualify repeated names with table aliases, such as c.customer_id and o.customer_id.",
        "Unexpected repeated customers: one customer can legitimately appear once per matching order.",
        "Counting the wrong thing: use COUNT(DISTINCT c.customer_id) when the requirement is the number of distinct customers in a joined result.",
        "Accidentally removing unmatched rows: when using LEFT JOIN, be careful about filtering right-table columns in WHERE.",
        "Unexpected Cartesian product: CROSS JOIN intentionally produces all combinations, so verify that this is really required.",
        "Incorrect revenue totals after another one-to-many join: joining orders to order_items can repeat each order-level amount for every item. Aggregate at the correct level to avoid double-counting.",
        "Assuming every database supports every JOIN type: check the target database's syntax and capabilities."
      ],
      code: {
        language: "sql",
        code: `-- Count distinct customers who have orders
SELECT
    COUNT(DISTINCT c.customer_id) AS customers_with_orders
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id;`
      },
      output: `customers_with_orders
---------------------
2`
    },
    {
      id: "practice-beginner",
      title: "10. Practice Exercise: Display Customer Names and Order IDs",
      paragraphs: [
        "Question: Write a query that displays the name of every customer who has placed an order, together with the order ID.",
        "Use INNER JOIN because the question asks for customers who have matching orders."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_id
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id
ORDER BY o.order_id;`
      },
      output: `customer_name  order_id
-------------  --------
Ravi           101
Ravi           102
Priya          103`
    },
    {
      id: "practice-intermediate",
      title: "11. Practice Exercise: Find Customers Without Orders",
      paragraphs: [
        "Question: Display customers who have not placed any orders.",
        "Start with customers and use LEFT JOIN to preserve every customer. Then use WHERE to keep only rows for which no matching order exists.",
        "Because order_id is a primary key and cannot be NULL for an existing order, o.order_id IS NULL reliably identifies unmatched customer rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
3            Anu`
    },
    {
      id: "practice-advanced",
      title: "12. Practice Exercise: Calculate Total Orders per Customer",
      paragraphs: [
        "Question: Display every customer, their order count, and their total order value, including customers who have not placed an order.",
        "Use LEFT JOIN to preserve customers without orders, GROUP BY to calculate metrics for each customer, and COALESCE to display zero instead of a NULL total.",
        "Use COUNT(o.order_id), not COUNT(*), because an unmatched customer still produces one NULL-extended row in a LEFT JOIN."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_order_value
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  order_count  total_order_value
-------------  -----------  -----------------
Ravi           2            4000.00
Priya          1            1800.00
Anu            0               0.00`
    },
    {
      id: "performance",
      title: "13. JOIN Performance and Best Practices",
      paragraphs: [
        "JOIN performance depends on table size, indexes, filtering conditions, data distribution, and the database optimizer. A correct join condition is essential for both accuracy and performance."
      ],
      bullets: [
        "Define primary keys and foreign keys where appropriate to document and enforce relationships.",
        "Index columns used frequently in join conditions, especially foreign-key columns on large tables. Check the execution plan rather than assuming an index will always help.",
        "Select only the columns the report needs instead of using SELECT * in large queries.",
        "Filter rows when the filter matches the business requirement, but take care not to change LEFT JOIN semantics by moving conditions between ON and WHERE.",
        "Use EXPLAIN to inspect the execution plan in supported databases.",
        "Understand table relationships before joining multiple one-to-many tables, because joined row counts can multiply and cause incorrect aggregate totals.",
        "Use consistent data types for matching key columns to avoid unnecessary conversions.",
        "Use meaningful aliases such as c, o, and oi to make queries with several tables easier to follow."
      ],
      code: {
        language: "sql",
        code: `EXPLAIN
SELECT
    c.customer_name,
    o.order_id,
    o.order_total
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1800;`
      },
      paragraphs: [
        "EXPLAIN asks the database to show how it plans to execute the query. The exact output and available plan details vary by database. Use the result to inspect join strategy, access paths, and whether useful indexes are being considered."
      ]
    },
    {
      id: "interview",
      title: "14. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a SQL JOIN?",
          answer:
            "A JOIN combines rows from multiple tables based on a related column or join condition."
        },
        {
          question: "Why are joins needed?",
          answer:
            "Joins allow related data stored in separate tables to be retrieved in a single query."
        },
        {
          question: "What is the ON clause?",
          answer:
            "ON specifies the condition used to match rows between joined tables."
        },
        {
          question: "Why are aliases used in joins?",
          answer:
            "Aliases shorten table references and make queries easier to read."
        },
        {
          question: "What happens if one customer has multiple orders?",
          answer:
            "The customer appears in multiple result rows, one for each matching order."
        },
        {
          question: "What is the difference between INNER JOIN and LEFT JOIN?",
          answer:
            "INNER JOIN returns matching rows only, while LEFT JOIN preserves every row from the left table and fills missing right-side columns with NULL."
        },
        {
          question: "How do you find customers who have no orders?",
          answer:
            "Use LEFT JOIN from customers to orders and filter with WHERE o.order_id IS NULL, assuming order_id is a non-NULL key."
        },
        {
          question: "What is a CROSS JOIN?",
          answer:
            "A CROSS JOIN returns every combination of rows from the two input tables. If the tables contain M and N rows, the result contains M multiplied by N rows."
        },
        {
          question: "What is a SELF JOIN?",
          answer:
            "A SELF JOIN joins a table to itself using aliases, such as joining employees to the same table to find their managers."
        },
        {
          question: "Why can a LEFT JOIN return NULL values?",
          answer:
            "If a left-side row has no matching right-side row, the right-side columns are returned as NULL."
        },
        {
          question: "What is the difference between ON and WHERE?",
          answer:
            "ON defines matching conditions for the join. WHERE filters rows after the join result is formed. Their effects differ especially for outer joins."
        },
        {
          question: "How do you count distinct customers after joining orders?",
          answer:
            "Use COUNT(DISTINCT c.customer_id) when the requirement is the number of unique customers rather than the number of joined order rows."
        },
        {
          question: "Does MySQL support FULL OUTER JOIN directly?",
          answer:
            "No. MySQL does not provide native FULL OUTER JOIN syntax. A full-outer-style result can be constructed using LEFT JOIN and a separate query for unmatched right-side rows, combined carefully with UNION ALL."
        }
      ]
    },
    {
      id: "revision",
      title: "15. Quick Revision Notes",
      paragraphs: [
        "Remember the purpose of each JOIN before writing the query. Ask whether the result should contain only matches, all rows from one side, or every possible combination."
      ],
      bullets: [
        "INNER JOIN returns matching rows.",
        "LEFT JOIN preserves every row from the left table.",
        "RIGHT JOIN preserves every row from the right table.",
        "FULL OUTER JOIN preserves matching and unmatched rows from both sides where supported.",
        "CROSS JOIN returns every possible row combination.",
        "SELF JOIN joins a table to itself using aliases.",
        "ON specifies how rows match; WHERE filters the resulting rows.",
        "One-to-many relationships can repeat values from the parent table in the result.",
        "COUNT(*) counts joined rows, while COUNT(right_table.primary_key) can count matching right-side records after a LEFT JOIN.",
        "Always check join cardinality before using SUM() or COUNT() across several joined tables."
      ]
    }
  ]
};
