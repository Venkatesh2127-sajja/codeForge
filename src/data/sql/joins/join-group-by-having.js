
export const joinGroupByHaving = {
  id: 2062,
  title: "JOIN with GROUP BY and HAVING",
  slug: "join-group-by-having",
  topicTitle: "SQL Joins",
  description:
    "Build reports by joining related tables, grouping their data, filtering aggregate results, and analyzing customer orders.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "customer-count",
      title: "1. Count Orders per Customer",
      paragraphs: [
        "JOIN combines related rows from different tables. GROUP BY organizes those rows into groups, and aggregate functions calculate a summary for each group.",
        "A customer may place multiple orders. Grouping by the customer's identifier and name allows us to calculate the number of orders belonging to each customer.",
        "LEFT JOIN is important when the report must include customers who have not placed any orders. For an unmatched customer, COUNT(o.order_id) returns zero because the order ID is NULL."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2
Priya          1
Anu            0`,
      bullets: [
        "LEFT JOIN preserves every customer, including Anu, who has no matching order.",
        "COUNT(o.order_id) counts only non-NULL order IDs.",
        "GROUP BY creates one group for each customer.",
        "ORDER BY c.customer_id gives a predictable customer order when customer_id is unique."
      ],
      notes: [
        "The output assumes Ravi has two orders, Priya has one, and Anu has none.",
        "Use COUNT(o.order_id), not COUNT(*), when counting matching orders after a LEFT JOIN. COUNT(*) would count the NULL-extended row for a customer without orders."
      ]
    },
    {
      id: "customer-total",
      title: "2. Calculate Total Spending per Customer",
      paragraphs: [
        "SUM calculates the total of numeric values within each group. When joined orders are grouped by customer, SUM(o.order_total) calculates each customer's total order value.",
        "For a customer without orders, SUM(o.order_total) produces NULL because there are no non-NULL order totals to add. COALESCE replaces that NULL with zero for reporting."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COALESCE(SUM(o.order_total), 0) AS total_spending
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spending DESC, c.customer_id ASC;`
      },
      output: `customer_name  total_spending
-------------  --------------
Ravi           4000.00
Priya          1800.00
Anu            0.00`,
      bullets: [
        "SUM(o.order_total) adds the order totals for each customer.",
        "COALESCE(expression, 0) returns zero when the expression is NULL.",
        "The alias total_spending makes the calculated column easier to understand.",
        "The secondary customer_id sort makes the order deterministic when totals are equal."
      ],
      codeExamples: [
        {
          title: "Calculate average order value per customer",
          language: "sql",
          code: `SELECT
    c.customer_id,
    c.customer_name,
    AVG(o.order_total) AS average_order_value
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY average_order_value DESC;`
        },
        {
          title: "Find the highest order value per customer",
          language: "sql",
          code: `SELECT
    c.customer_name,
    MAX(o.order_total) AS highest_order_value
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY highest_order_value DESC;`
        }
      ],
      notes: [
        "AVG and MAX ignore NULL values. A customer without orders therefore has a NULL average and maximum.",
        "Currency values should use an appropriate fixed-precision decimal type rather than an approximate floating-point type."
      ]
    },
    {
      id: "having-customers",
      title: "3. Find Customers with Multiple Orders",
      paragraphs: [
        "HAVING filters groups after GROUP BY has formed them. It is useful when the condition depends on an aggregate such as COUNT, SUM, or AVG.",
        "To find customers who placed at least two orders, group the matching orders by customer and retain groups whose order count is greater than or equal to two."
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
HAVING COUNT(o.order_id) >= 2
ORDER BY c.customer_name ASC;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2`,
      bullets: [
        "INNER JOIN includes customers with matching orders only.",
        "GROUP BY creates a group for each customer.",
        "COUNT(o.order_id) counts the orders in each group.",
        "HAVING COUNT(o.order_id) >= 2 keeps customers with at least two orders."
      ],
      notes: [
        "WHERE cannot normally be used to filter a group by COUNT(o.order_id), because the aggregate is calculated during grouping.",
        "If customers with zero orders must be considered, use LEFT JOIN and apply the appropriate aggregate condition in HAVING."
      ]
    },
    {
      id: "where-having-join",
      title: "4. Use WHERE and HAVING Together",
      paragraphs: [
        "WHERE and HAVING serve different purposes and can be used in the same query.",
        "WHERE filters individual joined rows before aggregation. HAVING filters the resulting groups after aggregate calculations.",
        "In this example, only orders worth at least 1500 contribute to each customer's total. After those rows are grouped, only customers whose qualifying order total exceeds 2000 are returned."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    SUM(o.order_total) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000
ORDER BY total_spending DESC;`
      },
      output: `customer_name  total_spending
-------------  --------------
Ravi           4000.00`,
      bullets: [
        "JOIN connects each customer with their orders.",
        "WHERE removes orders whose totals are below 1500.",
        "GROUP BY groups the remaining orders by customer.",
        "SUM calculates the total for each customer.",
        "HAVING retains groups with a total greater than 2000.",
        "ORDER BY sorts the qualifying groups by their calculated total."
      ],
      notes: [
        "The threshold in WHERE changes which orders contribute to the aggregate.",
        "The threshold in HAVING changes which completed customer groups appear in the result.",
        "For Ravi, the example assumes order totals of 1500 and 2500, producing a qualifying total of 4000."
      ]
    },
    {
      id: "group-by-multiple-aggregates",
      title: "5. Calculate Multiple Aggregates in One Report",
      paragraphs: [
        "A single grouped query can calculate several metrics for each customer. Combining COUNT, SUM, AVG, MIN, and MAX can provide a useful summary without writing a separate query for every metric."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_spending,
    AVG(o.order_total) AS average_order_value,
    MIN(o.order_total) AS smallest_order,
    MAX(o.order_total) AS largest_order
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spending DESC, c.customer_id ASC;`
      },
      bullets: [
        "COUNT counts matching order IDs.",
        "SUM adds the order totals.",
        "AVG calculates the average of non-NULL order totals.",
        "MIN finds the smallest non-NULL order total.",
        "MAX finds the largest non-NULL order total.",
        "COALESCE changes a NULL sum to zero for customers without orders."
      ],
      notes: [
        "The average, minimum, and maximum remain NULL for a customer with no orders.",
        "The exact decimal formatting of aggregate results depends on the database and column types.",
        "Every metric should be interpreted at the grain of the grouping, which in this example is one row per customer."
      ]
    },
    {
      id: "group-by-multiple-columns",
      title: "6. Group Joined Data by Multiple Columns",
      paragraphs: [
        "GROUP BY can use more than one column. This creates a separate group for each unique combination of those columns.",
        "For example, grouping by customer and order status can produce a report showing how many orders each customer has in each status. This requires the orders table to contain an order_status column."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_status,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_total), 0) AS total_value
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY
    c.customer_id,
    c.customer_name,
    o.order_status
ORDER BY
    c.customer_name ASC,
    o.order_status ASC;`
      },
      bullets: [
        "The customer identifier distinguishes customers even if two people have the same name.",
        "Each customer can have multiple groups if their orders have different statuses.",
        "The count and sum are calculated independently for each customer-status combination.",
        "Only use o.order_status if that column exists in the actual orders schema."
      ]
    },
    {
      id: "having-different-aggregates",
      title: "7. Filter Groups Using Different Aggregate Conditions",
      paragraphs: [
        "HAVING can include multiple aggregate conditions. AND requires every condition to be true, while OR allows either condition to be true.",
        "This is useful when a business report needs to identify customers with enough orders and a minimum total value."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    SUM(o.order_total) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) >= 2
   AND SUM(o.order_total) >= 3000
ORDER BY total_spending DESC;`
      },
      bullets: [
        "COUNT(o.order_id) >= 2 requires at least two orders.",
        "SUM(o.order_total) >= 3000 requires a total of at least 3000.",
        "Both conditions must be satisfied because they are connected with AND.",
        "Change AND to OR only when the business requirement allows either condition to qualify."
      ]
    },
    {
      id: "where-having-comparison",
      title: "8. WHERE vs HAVING",
      paragraphs: [
        "The main difference is the stage at which each clause filters data. WHERE filters individual rows before grouping. HAVING filters groups after aggregation.",
        "For example, WHERE o.order_total >= 1500 means smaller orders do not contribute to the SUM. HAVING SUM(o.order_total) > 2000 means the calculated total must exceed 2000 for the customer group to be returned."
      ],
      bullets: [
        "WHERE: filters input rows.",
        "HAVING: filters groups.",
        "WHERE commonly uses ordinary column conditions.",
        "HAVING commonly uses aggregate conditions such as COUNT, SUM, and AVG.",
        "A query may use both clauses when row-level and group-level conditions are needed."
      ],
      codeExamples: [
        {
          title: "Filter rows before grouping",
          language: "sql",
          code: `SELECT
    c.customer_name,
    SUM(o.order_total) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
GROUP BY c.customer_id, c.customer_name;`
        },
        {
          title: "Filter groups after aggregation",
          language: "sql",
          code: `SELECT
    c.customer_name,
    SUM(o.order_total) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000;`
        }
      ]
    },
    {
      id: "group-by-null-values",
      title: "9. Understand NULL Values in Aggregates",
      paragraphs: [
        "Aggregate functions handle NULL values differently from COUNT(*). COUNT(*) counts rows, COUNT(column) counts non-NULL values in a column, and SUM or AVG ignores NULL values.",
        "A LEFT JOIN creates a NULL-extended row when a customer has no matching order. This is why COUNT(o.order_id) is appropriate when counting actual orders."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(*) AS joined_row_count,
    COUNT(o.order_id) AS actual_order_count,
    SUM(o.order_total) AS raw_total,
    COALESCE(SUM(o.order_total), 0) AS display_total
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      bullets: [
        "COUNT(*) counts the joined rows, including a NULL-extended row for a customer with no orders.",
        "COUNT(o.order_id) counts only non-NULL order IDs.",
        "SUM(o.order_total) returns NULL when a group contains no non-NULL order totals.",
        "COALESCE(SUM(o.order_total), 0) is useful when the report should display zero instead of NULL."
      ],
      notes: [
        "For customers with no orders, joined_row_count is 1 while actual_order_count is 0.",
        "The raw total for a customer with no orders is NULL, while display_total is zero."
      ]
    },
    {
      id: "group-by-join-duplicates",
      title: "10. Avoid Inflated Aggregates After Joins",
      paragraphs: [
        "Joining tables with one-to-many relationships can multiply rows. If you join orders to order items, one order may appear once for every item. Summing an order-level amount after that join can count the same order total multiple times.",
        "Do not use SUM(DISTINCT order_total) as a general fix. Two different orders can legitimately have the same total, and DISTINCT would incorrectly count that value only once.",
        "When aggregating measures stored at different levels, consider aggregating each dataset at the correct grain before joining the summaries."
      ],
      codeExamples: [
        {
          title: "Potentially inflated order totals",
          language: "sql",
          code: `-- If an order has multiple items, its total can be repeated
-- in the joined rows.
SELECT
    o.customer_id,
    SUM(o.order_total) AS possibly_inflated_total
FROM orders AS o
INNER JOIN order_items AS oi
    ON o.order_id = oi.order_id
GROUP BY o.customer_id;`
        },
        {
          title: "Aggregate orders before joining another summary",
          language: "sql",
          code: `WITH customer_order_totals AS (
    SELECT
        customer_id,
        SUM(order_total) AS total_spending,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY customer_id
)
SELECT
    c.customer_id,
    c.customer_name,
    COALESCE(t.order_count, 0) AS order_count,
    COALESCE(t.total_spending, 0) AS total_spending
FROM customers AS c
LEFT JOIN customer_order_totals AS t
    ON c.customer_id = t.customer_id
ORDER BY total_spending DESC, c.customer_id ASC;`
        }
      ],
      notes: [
        "The first query is unsafe if order_items contains multiple rows for the same order.",
        "The CTE example assumes the orders table stores one row per order and order_total is the complete order-level amount.",
        "The correct aggregation strategy depends on the meaning and grain of each measure."
      ]
    },
    {
      id: "group-by-business-report",
      title: "11. Build a Customer Sales Report",
      paragraphs: [
        "Business reports often combine joins, grouping, aggregates, HAVING, and ORDER BY. The following query identifies customers with a total order value above 2000 and displays the highest totals first."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    SUM(o.order_total) AS total_sales,
    AVG(o.order_total) AS average_order_value
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000
ORDER BY total_sales DESC, c.customer_id ASC;`
      },
      bullets: [
        "The INNER JOIN includes customers who have orders.",
        "GROUP BY creates one summary row per customer.",
        "COUNT reports the number of orders.",
        "SUM reports the total sales value.",
        "AVG reports the average value of an order.",
        "HAVING filters out customers whose total sales do not exceed 2000.",
        "ORDER BY ranks qualifying customers by total sales."
      ],
      notes: [
        "This report assumes one row per order in the orders table.",
        "If the business needs customers with zero orders as well, use LEFT JOIN and decide whether HAVING should retain zero-order groups."
      ]
    },
    {
      id: "group-by-performance",
      title: "12. Performance and Indexing Tips",
      paragraphs: [
        "Grouped join reports may need to process many rows before producing their final summaries. Correct join conditions, suitable indexes, and a clear understanding of aggregation grain help keep these queries efficient and accurate."
      ],
      bullets: [
        "Index foreign-key columns used frequently in joins when the workload benefits from it.",
        "Use EXPLAIN or the database's execution-plan tool to inspect join strategies and aggregation operations.",
        "Filter rows early when the business logic allows it, but do not move conditions if that changes the intended result.",
        "Avoid selecting columns that the report does not need.",
        "Group by stable identifiers as well as descriptive names when appropriate.",
        "Pre-aggregate detail tables when multiple one-to-many joins would otherwise multiply rows.",
        "Add ORDER BY only when a particular output order is required.",
        "Evaluate indexes based on actual queries, table sizes, selectivity, and write overhead."
      ],
      code: {
        language: "sql",
        code: `-- Example index; check for an existing equivalent index first.
CREATE INDEX idx_orders_customer_id
    ON orders (customer_id);

-- Inspect the query plan. Exact output varies by database.
EXPLAIN
SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS order_count,
    SUM(o.order_total) AS total_spending
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;`
      },
      notes: [
        "An index is not guaranteed to improve every query.",
        "Primary keys and foreign keys serve different purposes: a primary key identifies a row, while a foreign key enforces a relationship when the constraint is defined.",
        "Index syntax and execution-plan details vary across database products."
      ]
    },
    {
      id: "group-by-practice-beginner",
      title: "13. Practice Exercise: Count Customer Orders",
      paragraphs: [
        "Task: Write a query that lists each customer and the number of orders they have placed. Customers without orders must also appear.",
        "Hint: Start from customers, use LEFT JOIN, and count the order primary key."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY c.customer_id;`
      },
      output: `customer_name  order_count
-------------  -----------
Ravi           2
Priya          1
Anu            0`,
      notes: [
        "The important detail is COUNT(o.order_id), not COUNT(*).",
        "This expected output assumes the same customer and order records shown in the lesson."
      ]
    },
    {
      id: "group-by-practice-intermediate",
      title: "14. Practice Exercise: Find High-Spending Customers",
      paragraphs: [
        "Task: Calculate each customer's total order value and display only customers whose total exceeds 2000. Sort the largest totals first."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    SUM(o.order_total) AS total_spending
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000
ORDER BY total_spending DESC;`
      },
      output: `customer_name  total_spending
-------------  --------------
Ravi           4000.00`,
      bullets: [
        "Why is HAVING used instead of WHERE for the total-spending condition?",
        "What changes if the condition becomes >= 2000?",
        "How would you include customers without orders in the report?"
      ],
      notes: [
        "The sample assumes Ravi's orders total 4000, Priya's total 1800, and Anu has no orders.",
        "Customers without orders are not included by this INNER JOIN."
      ]
    },
    {
      id: "group-by-practice-advanced",
      title: "15. Practice Exercise: Filter Rows and Groups",
      paragraphs: [
        "Task: Calculate customer totals using only orders of at least 1500, then return groups whose qualifying total exceeds 2000.",
        "This exercise tests the difference between filtering individual orders and filtering grouped results."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    COUNT(o.order_id) AS qualifying_order_count,
    SUM(o.order_total) AS qualifying_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
WHERE o.order_total >= 1500
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.order_total) > 2000
ORDER BY qualifying_total DESC;`
      },
      output: `customer_name  qualifying_order_count  qualifying_total
-------------  ----------------------  ----------------
Ravi           2                       4000.00`,
      bullets: [
        "WHERE determines which orders contribute to the aggregates.",
        "HAVING determines which customer groups remain after aggregation.",
        "If a customer's only order were 1200, that order would be removed before the group total was calculated."
      ]
    },
    {
      id: "group-by-revision",
      title: "16. Quick Revision Notes",
      bullets: [
        "JOIN combines related rows from multiple tables.",
        "GROUP BY creates groups based on one or more columns.",
        "COUNT counts rows or non-NULL values depending on its argument.",
        "SUM calculates totals, while AVG calculates averages.",
        "MIN and MAX find the smallest and largest non-NULL values.",
        "COALESCE can replace a NULL aggregate result with a chosen value.",
        "WHERE filters rows before grouping.",
        "HAVING filters groups after aggregation.",
        "LEFT JOIN preserves unmatched rows from its left-side table.",
        "COUNT(right_table.primary_key) is useful for counting matches after a LEFT JOIN.",
        "One-to-many joins can multiply rows and inflate aggregates.",
        "ORDER BY sorts the final result."
      ],
      notes: [
        "Remember the common syntax order: SELECT, FROM/JOIN, WHERE, GROUP BY, HAVING, ORDER BY, followed by a database-specific row limit or pagination clause."
      ]
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "Can GROUP BY be used with JOIN?",
          answer:
            "Yes. JOIN combines related records, and GROUP BY summarizes the joined rows using aggregate functions."
        },
        {
          question: "Why use LEFT JOIN when counting orders per customer?",
          answer:
            "LEFT JOIN preserves customers with no orders. COUNT(o.order_id) then returns zero because the unmatched order ID is NULL."
        },
        {
          question: "How do you find customers with at least two orders?",
          answer:
            "Group by the customer and use HAVING COUNT(o.order_id) >= 2."
        },
        {
          question: "What is the difference between WHERE and HAVING in a joined report?",
          answer:
            "WHERE filters joined input rows before grouping, while HAVING filters groups after aggregation."
        },
        {
          question: "Why is COUNT(o.order_id) preferable to COUNT(*) with a LEFT JOIN?",
          answer:
            "COUNT(o.order_id) ignores NULL values and counts only actual matching orders. COUNT(*) also counts the NULL-extended row for a customer without orders."
        },
        {
          question: "Can HAVING contain more than one condition?",
          answer:
            "Yes. Multiple aggregate conditions can be combined with AND or OR according to the required business logic."
        },
        {
          question: "Can GROUP BY contain multiple columns?",
          answer:
            "Yes. Each unique combination of grouping-column values forms a separate group."
        },
        {
          question: "Why can SUM return NULL?",
          answer:
            "SUM returns NULL when a group has no non-NULL values to sum. COALESCE can replace that result with zero when appropriate."
        },
        {
          question: "Why can a join produce an incorrect total?",
          answer:
            "A one-to-many join may repeat a measure from the parent table for each child row. Aggregate at the correct grain or pre-aggregate the relevant data before joining."
        },
        {
          question: "Should aggregate functions always be used with GROUP BY?",
          answer:
            "No. An aggregate query without GROUP BY can calculate a single summary for the entire qualifying input set. GROUP BY is needed when separate summaries are required for distinct groups."
        },
        {
          question: "Can a SELECT alias be used in HAVING?",
          answer:
            "Support for aliases in HAVING varies by database. For portable SQL, repeat the aggregate expression or use a derived table or common table expression."
        },
        {
          question: "How can you improve the performance of a grouped join?",
          answer:
            "Verify join conditions, inspect the execution plan, select only required columns, evaluate indexes on join keys, and prevent unnecessary row multiplication before aggregation."
        }
      ]
    }
  ]
};
