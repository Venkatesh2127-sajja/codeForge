
export const aggregateNullValues = {
  id: 2037,
  title: "Aggregate Functions and NULL Values",
  slug: "aggregate-null-values",
  topicTitle: "Aggregate Functions",
  description:
    "Learn how SQL aggregate functions handle NULL values and how to use COALESCE when a report needs a default value.",
  estimatedTime: "30 min",
  sections: [
    {
      id: "null-introduction",
      title: "1. Understanding NULL in SQL",
      paragraphs: [
        "NULL represents a missing, unknown, unavailable, or inapplicable value. It is not the same as zero, an empty string, or a normal value.",
        "For example, an employee's bonus may be NULL because the bonus has not been assigned. A bonus of 0 means the employee has a known bonus amount of zero. These values have different business meanings.",
        "Aggregate functions do not all handle NULL in the same way. COUNT(*) counts rows, COUNT(column) counts non-NULL values, and SUM(), AVG(), MIN(), and MAX() generally ignore NULL inputs.",
        "Understanding NULL behavior is essential when generating salary reports, sales summaries, inventory totals, and financial statements."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE null_demo (
    amount DECIMAL(10, 2)
);

INSERT INTO null_demo (amount)
VALUES (100), (NULL), (200);

SELECT amount
FROM null_demo;`
      },
      output: `amount
------
100.00
NULL
200.00`
    },
    {
      id: "null-dataset",
      title: "2. Sample Dataset for Aggregate Calculations",
      paragraphs: [
        "Use the null_demo table throughout this lesson. It contains three rows, but only two rows have known numeric amounts.",
        "When an aggregate function ignores NULL, it calculates using 100 and 200. It does not automatically convert NULL into zero.",
        "The distinction matters because replacing a missing value with zero can change the meaning of a calculation, especially an average."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(amount) AS known_amounts,
    SUM(amount) AS total_amount,
    AVG(amount) AS average_amount,
    MIN(amount) AS minimum_amount,
    MAX(amount) AS maximum_amount
FROM null_demo;`
      },
      output: `total_rows  known_amounts  total_amount  average_amount  minimum_amount  maximum_amount
----------  -------------  ------------  --------------  --------------  --------------
3           2              300.00        150.000000      100.00          200.00`
    },
    {
      id: "null-count",
      title: "3. COUNT(*) vs COUNT(column)",
      paragraphs: [
        "COUNT(*) counts every row in the input, even if one or more columns in that row contain NULL.",
        "COUNT(column) counts only rows where the specified column is not NULL. It does not count NULL values.",
        "COUNT(DISTINCT column) counts distinct non-NULL values. It excludes NULL and removes duplicate values before counting.",
        "Use COUNT(*) when you need the number of records and COUNT(column) when you need the number of records with a known value in that column."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(amount) AS non_null_amounts,
    COUNT(DISTINCT amount) AS distinct_amounts
FROM null_demo;`
      },
      output: `total_rows  non_null_amounts  distinct_amounts
----------  ----------------  ----------------
3           2                 2`
    },
    {
      id: "null-count-filtering",
      title: "4. Counting Missing Values",
      paragraphs: [
        "You can count missing values by subtracting COUNT(column) from COUNT(*). This works because COUNT(*) counts all input rows while COUNT(column) excludes rows where that column is NULL.",
        "You can also count missing values directly using a conditional expression. The CASE expression returns 1 for each NULL amount and 0 otherwise.",
        "This technique is useful for data-quality dashboards that track incomplete customer records, missing prices, or unavailable employee information."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(amount) AS known_amounts,
    COUNT(*) - COUNT(amount) AS missing_amounts,
    SUM(
        CASE WHEN amount IS NULL THEN 1 ELSE 0 END
    ) AS missing_amounts_case
FROM null_demo;`
      },
      output: `total_rows  known_amounts  missing_amounts  missing_amounts_case
----------  -------------  ---------------  ---------------------
3           2              1                1`
    },
    {
      id: "null-sum",
      title: "5. SUM() and AVG() with NULL",
      paragraphs: [
        "SUM() adds non-NULL numeric values. AVG() calculates the average of non-NULL numeric values by dividing their sum by their non-NULL count.",
        "For the values 100, NULL, and 200, SUM(amount) is 300 and AVG(amount) is 150. The NULL row contributes neither to the sum nor to the average's denominator.",
        "NULL is not automatically treated as zero. If it were replaced with zero before averaging, the average would be 100 instead of 150.",
        "A NULL input and a numeric zero therefore have different meanings. Choose how to handle missing data according to the business requirement."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(amount) AS total_amount,
    AVG(amount) AS average_amount,
    AVG(COALESCE(amount, 0)) AS average_with_missing_as_zero
FROM null_demo;`
      },
      output: `total_amount  average_amount  average_with_missing_as_zero
------------  --------------  ----------------------------
300.00        150.000000      100.000000`
    },
    {
      id: "null-min-max",
      title: "6. MIN() and MAX() with NULL",
      paragraphs: [
        "MIN() returns the smallest non-NULL value and MAX() returns the largest non-NULL value.",
        "NULL values do not participate in the comparison. For the values 100, NULL, and 200, the minimum is 100 and the maximum is 200.",
        "If all input values are NULL, or there are no input rows, MIN() and MAX() return NULL. They do not return zero automatically.",
        "For text columns, the minimum and maximum depend on the database's text comparison rules and collation."
      ],
      code: {
        language: "sql",
        code: `SELECT
    MIN(amount) AS minimum_amount,
    MAX(amount) AS maximum_amount
FROM null_demo;

SELECT
    MIN(amount) AS minimum_amount,
    MAX(amount) AS maximum_amount
FROM null_demo
WHERE amount IS NULL;`
      },
      output: `First query:
minimum_amount  maximum_amount
--------------  --------------
100.00          200.00

Second query:
minimum_amount  maximum_amount
--------------  --------------
NULL            NULL`
    },
    {
      id: "coalesce",
      title: "7. COALESCE() for Empty Results",
      paragraphs: [
        "COALESCE(expression1, expression2, ...) returns the first non-NULL expression from its arguments. If every argument is NULL, the result is NULL.",
        "SUM() returns NULL when its input has no non-NULL values. A query that matches no rows also produces NULL for SUM(). COALESCE(SUM(amount), 0) changes that result to zero.",
        "COUNT(*) is different: when an aggregate query has no matching rows and no GROUP BY, COUNT(*) returns zero rather than NULL.",
        "Use COALESCE only when the business meaning of the fallback is appropriate. A report may display zero for total sales, but a missing salary or unknown measurement may need to remain NULL.",
        "The database may determine the result type from the expressions passed to COALESCE. When working with decimals or other specific types, use compatible fallback values."
      ],
      code: {
        language: "sql",
        code: `SELECT
    SUM(amount) AS total_amount,
    COALESCE(SUM(amount), 0) AS total_with_default,
    COUNT(*) AS matching_rows
FROM null_demo
WHERE amount < 0;`
      },
      output: `total_amount  total_with_default  matching_rows
------------  -------------------  -------------
NULL          0.00                 0`
    },
    {
      id: "coalesce-all-null",
      title: "8. COALESCE() When All Values Are NULL",
      paragraphs: [
        "A query can match rows even when every selected amount is NULL. In this case, COUNT(*) is positive, COUNT(amount) is zero, and SUM(amount) is NULL.",
        "This is different from a query that matches no rows. The first situation contains records with missing values; the second contains no matching records.",
        "COALESCE can provide a default aggregate result in both cases, but COUNT(*) and COUNT(amount) help you distinguish them."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS matching_rows,
    COUNT(amount) AS known_amounts,
    SUM(amount) AS total_amount,
    COALESCE(SUM(amount), 0) AS displayed_total
FROM null_demo
WHERE amount IS NULL;`
      },
      output: `matching_rows  known_amounts  total_amount  displayed_total
-------------  -------------  ------------  ---------------
1              0              NULL          0.00`
    },
    {
      id: "null-group-by",
      title: "9. NULL Values with GROUP BY",
      paragraphs: [
        "When a nullable column is used in GROUP BY, rows whose grouping value is NULL form a group of their own.",
        "Within each group, aggregate functions continue to follow their normal NULL rules. COUNT(*) counts rows in the group, while COUNT(amount) counts only known amounts.",
        "COALESCE can be used to display a default aggregate value for a group, but it does not create groups that have no input rows."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE department_amounts (
    department VARCHAR(30),
    amount DECIMAL(10, 2)
);

INSERT INTO department_amounts (department, amount)
VALUES
    ('Engineering', 100),
    ('Engineering', NULL),
    ('HR', 200),
    ('HR', NULL),
    (NULL, 50);

SELECT
    department,
    COUNT(*) AS row_count,
    COUNT(amount) AS known_amounts,
    SUM(amount) AS total_amount
FROM department_amounts
GROUP BY department
ORDER BY department;`
      },
      output: `department   row_count  known_amounts  total_amount
-----------  ---------  -------------  ------------
NULL         1          1              50.00
Engineering  2          1              100.00
HR           2          1              200.00`
    },
    {
      id: "null-where",
      title: "10. Filtering NULL Values with WHERE",
      paragraphs: [
        "Use IS NULL to find missing values and IS NOT NULL to find known values. Do not use amount = NULL or amount != NULL because comparisons with NULL produce UNKNOWN rather than TRUE or FALSE.",
        "SQL uses three-valued logic: a condition can evaluate to TRUE, FALSE, or UNKNOWN. WHERE retains rows only when the condition evaluates to TRUE.",
        "For example, amount > 100 does not match a row where amount is NULL. The comparison is UNKNOWN, so the row is filtered out.",
        "A condition such as COALESCE(amount, 0) > 100 treats missing amounts as zero for that comparison. This is only appropriate when that interpretation matches the requirement."
      ],
      code: {
        language: "sql",
        code: `SELECT amount
FROM null_demo
WHERE amount IS NULL;

SELECT amount
FROM null_demo
WHERE amount IS NOT NULL;

SELECT amount
FROM null_demo
WHERE amount > 100;`
      },
      output: `First query:
amount
------
NULL

Second query:
amount
------
100.00
200.00

Third query:
amount
------
200.00`
    },
    {
      id: "null-conditional-aggregation",
      title: "11. Conditional Aggregation with NULL",
      paragraphs: [
        "Conditional aggregation combines CASE expressions with aggregate functions to calculate multiple metrics in one query.",
        "In this example, CASE returns the amount when it is greater than or equal to 150 and NULL otherwise. SUM() ignores those NULL results, so only qualifying amounts contribute to the total.",
        "COUNT(CASE WHEN condition THEN 1 END) counts rows where the condition is TRUE because CASE returns NULL for the other rows.",
        "This technique is useful for dashboards that report total sales, successful orders, failed payments, or values meeting a threshold."
      ],
      code: {
        language: "sql",
        code: `SELECT
    COUNT(*) AS total_rows,
    COUNT(CASE WHEN amount >= 150 THEN 1 END) AS amounts_at_least_150,
    SUM(CASE WHEN amount >= 150 THEN amount END) AS qualifying_total,
    COALESCE(
        SUM(CASE WHEN amount >= 150 THEN amount END),
        0
    ) AS displayed_qualifying_total
FROM null_demo;`
      },
      output: `total_rows  amounts_at_least_150  qualifying_total  displayed_qualifying_total
----------  ---------------------  ----------------  --------------------------
3           1                      200.00            200.00`
    },
    {
      id: "null-common-mistakes",
      title: "12. Common Mistakes and Fixes",
      paragraphs: [
        "Mistake 1: Assuming COUNT(column) counts every row. It excludes NULL values. Use COUNT(*) when you need the total number of rows.",
        "Mistake 2: Assuming AVG() divides by the total row count. It divides by the number of non-NULL values. Decide whether missing values should be excluded or treated as zero.",
        "Mistake 3: Using = NULL. Use IS NULL or IS NOT NULL.",
        "Mistake 4: Assuming SUM() always returns zero. SUM() can return NULL when no non-NULL values contribute to the calculation.",
        "Mistake 5: Applying COALESCE everywhere without considering meaning. Converting missing values to zero may make a report misleading.",
        "Mistake 6: Confusing no matching rows with rows containing only NULL values. Use COUNT(*) and COUNT(column) together when that distinction matters."
      ],
      code: {
        language: "sql",
        code: `-- Incorrect: equality comparison with NULL
SELECT *
FROM null_demo
WHERE amount = NULL;

-- Correct: find missing values
SELECT *
FROM null_demo
WHERE amount IS NULL;

-- Count rows and known values separately
SELECT
    COUNT(*) AS total_rows,
    COUNT(amount) AS known_amounts
FROM null_demo;

-- Use a fallback when the report requires zero
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM null_demo
WHERE amount < 0;`
      },
      output: `The first query does not correctly find NULL values.
The second query returns the row containing NULL.
The third query returns total_rows = 3 and known_amounts = 2.
The fourth query returns total_amount = 0.00.`
    },
    {
      id: "null-real-world",
      title: "13. Real-World Use Cases",
      paragraphs: [
        "Sales reporting: COALESCE(SUM(sales_amount), 0) can display zero when no qualifying sales amount exists, provided zero is the desired reporting convention.",
        "Data quality: COUNT(*) - COUNT(email) can measure the number of rows with missing email values.",
        "Employee reporting: COUNT(salary) measures employees with known salaries, while COUNT(*) measures all employees in the selected dataset.",
        "Inventory: SUM(quantity) ignores unknown quantities. Before replacing missing quantities with zero, determine whether NULL means no stock or simply that the stock count has not been recorded.",
        "Analytics: Compare COUNT(*) with COUNT(column) to identify how much of a dataset has usable values before calculating averages or totals."
      ],
      code: {
        language: "sql",
        code: `-- Example: data quality report
SELECT
    COUNT(*) AS employee_rows,
    COUNT(email) AS employees_with_email,
    COUNT(*) - COUNT(email) AS missing_emails
FROM employees;

-- Example: total sales with a display fallback
SELECT
    COALESCE(SUM(amount), 0) AS total_sales
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2027-01-01';`
      },
      output: `The first query reports total employee rows, rows with email,
and rows with missing email.

The second query reports the total matching sales amount,
or zero when the aggregate has no non-NULL inputs.`
    },
    {
      id: "practice-beginner",
      title: "14. Beginner Practice Questions",
      paragraphs: [
        "Use the null_demo table containing the values 100, NULL, and 200. Predict each result before running the query.",
        "Exercise 1: Return the total row count and non-NULL amount count.",
        "Exercise 2: Find the number of missing amount values.",
        "Exercise 3: Calculate the total and average amount.",
        "Exercise 4: Display zero instead of NULL when no amount is less than zero."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS total_rows, COUNT(amount) AS known_amounts
FROM null_demo;

-- Exercise 2
SELECT COUNT(*) - COUNT(amount) AS missing_amounts
FROM null_demo;

-- Exercise 3
SELECT SUM(amount) AS total_amount, AVG(amount) AS average_amount
FROM null_demo;

-- Exercise 4
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM null_demo
WHERE amount < 0;`
      },
      output: `Exercise 1: total_rows = 3, known_amounts = 2
Exercise 2: missing_amounts = 1
Exercise 3: total_amount = 300.00, average_amount = 150.000000
Exercise 4: total_amount = 0.00`
    },
    {
      id: "practice-intermediate",
      title: "15. Intermediate Practice with Solutions",
      paragraphs: [
        "Exercise 1: Count rows that have a known amount of at least 150.",
        "Exercise 2: Return the minimum and maximum known amounts.",
        "Exercise 3: Show how many rows match a condition even when all matching amounts are NULL.",
        "Exercise 4: Calculate an average that treats each missing amount as zero. Compare it with the normal average."
      ],
      code: {
        language: "sql",
        code: `-- Exercise 1
SELECT COUNT(*) AS qualifying_rows
FROM null_demo
WHERE amount >= 150;

-- Exercise 2
SELECT MIN(amount) AS minimum_amount, MAX(amount) AS maximum_amount
FROM null_demo;

-- Exercise 3
SELECT
    COUNT(*) AS matching_rows,
    COUNT(amount) AS known_amounts,
    COALESCE(SUM(amount), 0) AS displayed_total
FROM null_demo
WHERE amount IS NULL;

-- Exercise 4
SELECT
    AVG(amount) AS normal_average,
    AVG(COALESCE(amount, 0)) AS average_missing_as_zero
FROM null_demo;`
      },
      output: `Exercise 1: qualifying_rows = 1

Exercise 2:
minimum_amount = 100.00
maximum_amount = 200.00

Exercise 3:
matching_rows = 1
known_amounts = 0
displayed_total = 0.00

Exercise 4:
normal_average = 150.000000
average_missing_as_zero = 100.000000`
    },
    {
      id: "performance",
      title: "16. Performance and Reporting Considerations",
      paragraphs: [
        "Aggregate functions can require scanning many qualifying rows. Indexes on columns used in selective WHERE conditions may reduce the amount of data the database must examine, depending on the execution plan and database engine.",
        "Applying COALESCE directly to an aggregate, such as COALESCE(SUM(amount), 0), is a common reporting pattern. Applying a function to a filtered column, such as COALESCE(amount, 0) in WHERE, can affect index usage depending on the database and available indexes.",
        "Avoid replacing every NULL with zero at storage time simply to simplify reporting. Store the correct business meaning and apply presentation defaults only where the requirement calls for them.",
        "For financial calculations, choose suitable numeric types such as DECIMAL or NUMERIC when exact decimal arithmetic is required. Review rounding and result types when combining aggregate functions with COALESCE.",
        "Use EXPLAIN or the database's equivalent execution-plan tool to investigate slow aggregate queries rather than assuming an index will always improve performance."
      ],
      code: {
        language: "sql",
        code: `-- Example of an aggregate report with a date filter
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2027-01-01';

-- Inspect the execution plan where supported
EXPLAIN
SELECT COALESCE(SUM(amount), 0) AS total_amount
FROM sales
WHERE sale_date >= '2026-01-01'
  AND sale_date < '2027-01-01';`
      },
      output: `The first query returns the report total or zero.
The EXPLAIN command shows the database's planned execution strategy.
Exact plan output depends on the database engine, schema, indexes, and data.`
    },
    {
      id: "interview",
      title: "17. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is NULL in SQL?",
          answer:
            "NULL represents a missing, unknown, or unavailable value. It is different from zero and an empty string."
        },
        {
          question: "What is the difference between COUNT(*) and COUNT(column)?",
          answer:
            "COUNT(*) counts all rows in the input. COUNT(column) counts only rows where the specified column is not NULL."
        },
        {
          question: "Does COUNT(DISTINCT column) count NULL?",
          answer:
            "No. It counts distinct non-NULL values."
        },
        {
          question: "How do SUM() and AVG() handle NULL?",
          answer:
            "They ignore NULL inputs. AVG() calculates its result using the non-NULL values rather than all rows."
        },
        {
          question: "How do MIN() and MAX() handle NULL?",
          answer:
            "They ignore NULL values when finding the smallest or largest value. They return NULL when no non-NULL input value is available."
        },
        {
          question: "What does SUM() return when there are no non-NULL inputs?",
          answer:
            "SUM() returns NULL. Use COALESCE(SUM(column), 0) if zero is the required fallback."
        },
        {
          question: "What does COUNT(*) return when no rows match?",
          answer:
            "In a scalar aggregate query without GROUP BY, COUNT(*) returns zero even when no rows match."
        },
        {
          question: "What is COALESCE()?",
          answer:
            "COALESCE() returns the first non-NULL expression in its argument list. It is commonly used to provide a default result."
        },
        {
          question: "How do you check for NULL values?",
          answer:
            "Use IS NULL or IS NOT NULL. Do not use = NULL or != NULL."
        },
        {
          question: "What is SQL three-valued logic?",
          answer:
            "A SQL condition can evaluate to TRUE, FALSE, or UNKNOWN. Comparisons involving NULL often produce UNKNOWN, and WHERE keeps only rows whose condition is TRUE."
        },
        {
          question: "What is the difference between AVG(amount) and AVG(COALESCE(amount, 0))?",
          answer:
            "AVG(amount) excludes NULL values from both the sum and count. AVG(COALESCE(amount, 0)) treats each NULL as zero, so the result can be lower."
        },
        {
          question: "How can you count missing values?",
          answer:
            "For a single column, COUNT(*) - COUNT(column) gives the number of rows where that column is NULL within the same input."
        },
        {
          question: "What happens when GROUP BY uses a nullable column?",
          answer:
            "Rows with NULL in the grouping column form a NULL group. Aggregate functions within that group still apply their normal NULL rules."
        },
        {
          question: "Should NULL always be replaced with zero?",
          answer:
            "No. NULL may mean unknown or unavailable, while zero is a known numeric value. Replace NULL only when the business requirement defines an appropriate default."
        }
      ]
    },
    {
      id: "revision",
      title: "18. Quick Revision",
      bullets: [
        "NULL represents a missing, unknown, or unavailable value.",
        "COUNT(*) counts rows, including rows with NULL values.",
        "COUNT(column) counts only non-NULL values.",
        "COUNT(DISTINCT column) counts unique non-NULL values.",
        "SUM(), AVG(), MIN(), and MAX() ignore NULL inputs.",
        "AVG() uses the count of non-NULL values as its denominator.",
        "SUM(), AVG(), MIN(), and MAX() return NULL when no non-NULL input values are available.",
        "COUNT(*) returns zero for a scalar aggregate query with no matching rows and no GROUP BY.",
        "COALESCE(value, fallback) returns the first non-NULL expression.",
        "Use IS NULL and IS NOT NULL to test for missing values.",
        "Replacing NULL with zero changes the meaning of calculations and should follow business requirements.",
        "COUNT(*) - COUNT(column) counts missing values in that column."
      ]
    }
  ]
};
