
export const primaryForeignKeysJoins = {
  id: 2052,
  title: "Understanding Primary and Foreign Keys in Joins",
  slug: "primary-foreign-keys-joins",
  topicTitle: "SQL Joins",
  description:
    "Understand how primary keys and foreign keys connect related tables in SQL joins.",
  estimatedTime: "20 min",
  sections: [
    {
      id: "primary-key",
      title: "1. What Is a Primary Key?",
      paragraphs: [
        "A primary key uniquely identifies each row in a table. It cannot contain duplicate values or NULL values.",
        "In the customers table, customer_id identifies each customer. Even if two customers have the same name, their customer IDs must be different.",
        "A primary key can consist of one column or multiple columns. When multiple columns are used together, the combination must be unique.",
        "A primary key helps the database identify records reliably and provides a common reference point for related tables.",
        "A table can have only one primary key constraint, although that key can contain multiple columns. A table can also have additional UNIQUE constraints."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);

INSERT INTO customers (customer_id, customer_name)
VALUES
    (1, 'Ravi'),
    (2, 'Priya'),
    (3, 'Anu');

SELECT *
FROM customers
ORDER BY customer_id;`
      },
      output: `customer_id  customer_name
-----------  -------------
1            Ravi
2            Priya
3            Anu`,
      bullets: [
        "customer_id = 1 identifies Ravi.",
        "customer_id = 2 identifies Priya.",
        "customer_id = 3 identifies Anu.",
        "Inserting another row with customer_id = 1 violates the primary key constraint.",
        "Inserting NULL into customer_id also violates the primary key constraint."
      ]
    },
    {
      id: "primary-key-composite",
      title: "2. Understanding Composite Primary Keys",
      paragraphs: [
        "A composite primary key uses two or more columns together to identify a row uniquely.",
        "For example, an enrollment table can use student_id and course_id as a composite primary key. A student can enroll in many courses, and a course can contain many students, but the same student-course combination cannot appear twice.",
        "A composite key is useful when the combination of columns represents the natural identity of a record."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id)
);

INSERT INTO enrollments
    (student_id, course_id, enrollment_date)
VALUES
    (101, 10, '2026-01-15'),
    (101, 20, '2026-01-16'),
    (102, 10, '2026-01-17');`
      },
      bullets: [
        "Student 101 can enroll in courses 10 and 20 because the combinations are different.",
        "Student 102 can also enroll in course 10.",
        "A second row for student 101 and course 10 would violate the composite primary key.",
        "Each column in a primary key must be non-NULL."
      ]
    },
    {
      id: "foreign-key",
      title: "3. What Is a Foreign Key?",
      paragraphs: [
        "A foreign key references a primary key or another eligible unique key in a related table. It helps enforce referential integrity.",
        "In this example, orders.customer_id references customers.customer_id. The customers table is the parent table, and the orders table is the child table.",
        "A customer can have many orders, so customer_id may appear multiple times in orders. However, each non-NULL customer_id in orders must match a referenced customer when the foreign key constraint is enforced.",
        "A foreign key does not have to be unique. Its purpose is to establish a valid relationship, not to uniquely identify every child row.",
        "A nullable foreign key may contain NULL unless the column is also declared NOT NULL. A NULL foreign key does not refer to a particular parent record."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2),
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);`
      },
      bullets: [
        "order_id uniquely identifies each order.",
        "customer_id connects an order to its customer.",
        "Multiple orders can reference customer_id = 1.",
        "A foreign key prevents an invalid customer reference when the constraint is enforced.",
        "A foreign key does not automatically create a primary key in the child table."
      ]
    },
    {
      id: "primary-vs-foreign",
      title: "4. Primary Key vs Foreign Key",
      paragraphs: [
        "Primary keys and foreign keys work together, but they have different responsibilities. The primary key identifies a record in its own table, while the foreign key references a record in another or the same table."
      ],
      bullets: [
        "Primary key: uniquely identifies each row.",
        "Foreign key: establishes a reference to an eligible key in a related table.",
        "Primary key: cannot contain NULL or duplicate key values.",
        "Foreign key: may contain repeated values because several child records can reference the same parent.",
        "Primary key: one primary key constraint is allowed per table, and it may contain multiple columns.",
        "Foreign key: a table can have multiple foreign key constraints.",
        "Primary key: helps identify the parent record.",
        "Foreign key: helps enforce the relationship between parent and child records."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2),
    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);`
      }
    },
    {
      id: "sample-data",
      title: "5. Creating Related Customer and Order Records",
      paragraphs: [
        "Let's use a complete example with three customers and three orders. Ravi has two orders, Priya has one order, and Anu has no orders.",
        "Create the parent table before the child table because the foreign key references customers.customer_id. Insert parent records before inserting their related orders."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2),
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

INSERT INTO customers (customer_id, customer_name)
VALUES
    (1, 'Ravi'),
    (2, 'Priya'),
    (3, 'Anu');

INSERT INTO orders (order_id, customer_id, order_total)
VALUES
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
        "The customer table contains three parent records.",
        "The orders table contains three child records.",
        "Both order 101 and order 102 reference Ravi.",
        "No order references Anu.",
        "The foreign key allows multiple orders to reference the same customer."
      ]
    },
    {
      id: "join-keys",
      title: "6. Joining Tables Using Their Keys",
      paragraphs: [
        "The ON condition connects rows where the customer IDs match. Table aliases make the query easier to read.",
        "The primary key in customers and the foreign key in orders provide the logical relationship used by the join.",
        "A JOIN does not require a declared foreign key constraint. SQL compares the values specified in the ON condition whether or not a constraint exists. The constraint is valuable because it helps prevent invalid references in stored data.",
        "Because Ravi has two orders, the result contains two rows for Ravi. Priya appears once, while Anu is excluded by INNER JOIN because she has no matching order."
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
Priya          103       1800.00`
    },
    {
      id: "foreign-key-validation",
      title: "7. How a Foreign Key Prevents Invalid References",
      paragraphs: [
        "Suppose someone attempts to insert an order for customer_id = 99, but no customer with that ID exists.",
        "When the foreign key constraint is enforced, the database rejects the insert because the referenced parent row does not exist.",
        "This protects data integrity. Without the constraint, an order could point to a nonexistent customer and become an orphan record.",
        "Exact error messages vary by database. The important concept is that the constraint prevents the invalid relationship from being stored."
      ],
      code: {
        language: "sql",
        code: `-- This insert should fail when the foreign key is enforced,
-- because customer_id 99 does not exist in customers.
INSERT INTO orders (order_id, customer_id, order_total)
VALUES (104, 99, 900.00);`
      },
      bullets: [
        "Customer IDs 1, 2, and 3 are valid references in the sample data.",
        "Customer ID 99 is invalid because there is no matching customer.",
        "The database checks the foreign key when the insert or relevant update is performed.",
        "A JOIN alone does not enforce referential integrity; the declared constraint does."
      ]
    },
    {
      id: "orphan-records",
      title: "8. Finding Orders Without a Matching Customer",
      paragraphs: [
        "If referential integrity is not enforced, an order might contain a customer ID that does not exist in the customers table. A LEFT JOIN from orders can reveal such records.",
        "The query keeps all orders on the left side. If no customer matches, the customer columns become NULL. Filtering on c.customer_id IS NULL identifies orders with no matching customer.",
        "With the foreign key enforced and the current data valid, this query returns no rows. It is still useful when auditing legacy data, imported data, or tables created without constraints."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    o.customer_id,
    o.order_total
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;`
      },
      output: `No rows returned`,
      bullets: [
        "No returned rows means no unmatched order was found in the current data.",
        "A returned row indicates that the order has no matching customer.",
        "A NULL customer_id in orders is also unmatched by an equality join, but it is not an invalid reference in the same way as a non-NULL unknown ID; nullable foreign keys can be permitted.",
        "When auditing, consider whether the foreign key column is allowed to be NULL."
      ]
    },
    {
      id: "left-join-parent-records",
      title: "9. Finding Customers Without Orders",
      paragraphs: [
        "The previous example looked for child records without parents. The reverse question is also common: which customers have no orders?",
        "Start with customers and use LEFT JOIN to preserve every customer. Then filter for rows where the order's primary key is NULL.",
        "Because order_id is a primary key, it cannot be NULL in an actual order record. A NULL order_id in this result indicates that no matching order was found."
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
        "Anu exists in customers but has no matching row in orders.",
        "Ravi and Priya are excluded because they have matching orders.",
        "The direction of the LEFT JOIN determines which side's rows are preserved."
      ]
    },
    {
      id: "foreign-key-actions",
      title: "10. ON DELETE and ON UPDATE Actions",
      paragraphs: [
        "Foreign key constraints can define what happens when a referenced parent key is deleted or updated. Supported actions and exact behavior depend on the database.",
        "ON DELETE RESTRICT or NO ACTION prevents a parent from being deleted while referencing child rows exist, subject to the database's constraint semantics.",
        "ON DELETE CASCADE automatically deletes related child rows when the parent is deleted. This is useful only when the child records should not exist independently of the parent.",
        "ON DELETE SET NULL sets the child foreign key to NULL when the parent is deleted. The child column must allow NULL for this action to work.",
        "ON UPDATE actions define what happens when a referenced key changes. Updating primary keys is often avoided when stable surrogate keys are used."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE customers_example (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders_example (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_total DECIMAL(10, 2),
    CONSTRAINT fk_orders_example_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers_example(customer_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);`
      },
      bullets: [
        "ON DELETE SET NULL preserves the order but removes its customer reference.",
        "ON UPDATE CASCADE propagates a referenced key change to matching foreign key values.",
        "CASCADE can remove many child records, so choose it according to the application's data-retention requirements.",
        "Database support and details can vary, so verify the behavior for your target database."
      ]
    },
    {
      id: "many-to-many",
      title: "11. Primary and Foreign Keys in Many-to-Many Relationships",
      paragraphs: [
        "A many-to-many relationship occurs when many records in one table can relate to many records in another table.",
        "For example, one student can enroll in multiple courses, and one course can have multiple students. A junction table such as enrollments stores these relationships.",
        "The junction table commonly contains two foreign keys, one referencing students and the other referencing courses. A composite primary key can prevent the same student-course pair from being stored more than once."
      ],
      code: {
        language: "sql",
        code: `CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id)
        REFERENCES students(student_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);

SELECT
    s.student_name,
    c.course_name,
    e.enrollment_date
FROM enrollments AS e
INNER JOIN students AS s
    ON e.student_id = s.student_id
INNER JOIN courses AS c
    ON e.course_id = c.course_id;`
      },
      bullets: [
        "students.student_id identifies each student.",
        "courses.course_id identifies each course.",
        "enrollments.student_id references the student.",
        "enrollments.course_id references the course.",
        "The composite primary key prevents duplicate enrollment pairs."
      ]
    },
    {
      id: "common-mistakes",
      title: "12. Common Primary Key and Foreign Key Mistakes",
      paragraphs: [
        "Correct key design makes joins more reliable and helps the database prevent inconsistent data."
      ],
      bullets: [
        "Using a non-unique column as the intended row identifier: choose a primary key or another eligible unique key.",
        "Assuming a foreign key must be unique: many child rows can reference the same parent.",
        "Assuming JOIN requires a foreign key constraint: the ON condition performs matching, while the constraint enforces valid stored references.",
        "Inserting child rows before parent rows: with an enforced foreign key, the referenced parent must exist first.",
        "Confusing unmatched rows with invalid references: a customer without orders is valid, while a non-NULL order customer ID with no matching parent indicates an invalid reference if the relationship is intended to be enforced.",
        "Using nullable foreign keys without considering the business rules: declare NOT NULL if every child must reference a parent.",
        "Choosing ON DELETE CASCADE without checking retention requirements: deleting a parent may also delete many child rows.",
        "Assuming similar column names guarantee a relationship: use the correct key columns in the ON condition."
      ]
    },
    {
      id: "practice-beginner",
      title: "13. Practice Exercise: Join Customers and Orders",
      paragraphs: [
        "Question: Display each customer's name and order total for all orders that have a matching customer.",
        "Use INNER JOIN with the primary key from customers and the foreign key from orders."
      ],
      code: {
        language: "sql",
        code: `SELECT
    c.customer_name,
    o.order_total
FROM customers AS c
INNER JOIN orders AS o
    ON c.customer_id = o.customer_id
ORDER BY o.order_id;`
      },
      output: `customer_name  order_total
-------------  -----------
Ravi           1500.00
Ravi           2500.00
Priya          1800.00`
    },
    {
      id: "practice-intermediate",
      title: "14. Practice Exercise: Count Orders for Every Customer",
      paragraphs: [
        "Question: Display every customer and their number of orders, including customers with zero orders.",
        "Use LEFT JOIN to preserve customers. Count the order primary key rather than COUNT(*) so an unmatched customer receives a count of zero."
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
Anu            0`
    },
    {
      id: "practice-advanced",
      title: "15. Practice Exercise: Find Invalid Order References",
      paragraphs: [
        "Question: Write a query that finds orders whose non-NULL customer_id has no matching customer.",
        "This is an audit query for a dataset where the foreign key may not have been enforced. If the constraint is enforced and the existing data is valid, the query should return no rows."
      ],
      code: {
        language: "sql",
        code: `SELECT
    o.order_id,
    o.customer_id
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
WHERE o.customer_id IS NOT NULL
  AND c.customer_id IS NULL;`
      },
      output: `No rows returned`,
      bullets: [
        "The first condition excludes orders whose customer_id is NULL.",
        "The second condition detects the absence of a matching customer.",
        "The result is empty for the valid sample data."
      ]
    },
    {
      id: "interview",
      title: "16. Interview Questions and Answers",
      interviewQuestions: [
        {
          question: "What is a primary key?",
          answer:
            "A primary key uniquely identifies each row and cannot contain NULL or duplicate key values."
        },
        {
          question: "What is a foreign key?",
          answer:
            "A foreign key references an eligible key in another or the same table to enforce referential integrity."
        },
        {
          question: "Does a JOIN require a foreign key constraint?",
          answer:
            "No. A JOIN uses its ON condition even if no foreign key constraint is declared."
        },
        {
          question: "Can multiple orders have the same customer_id?",
          answer:
            "Yes. In a one-to-many relationship, many orders can reference the same customer."
        },
        {
          question: "What is referential integrity?",
          answer:
            "It ensures that non-NULL foreign key references point to valid referenced records when the relevant constraints are enforced."
        },
        {
          question: "What is the difference between a primary key and a foreign key?",
          answer:
            "A primary key identifies rows in its own table. A foreign key references a key in a related table to represent and enforce a relationship."
        },
        {
          question: "Can a table have multiple foreign keys?",
          answer:
            "Yes. A table can contain multiple foreign key constraints that reference the same or different tables."
        },
        {
          question: "Can a foreign key contain duplicate values?",
          answer:
            "Yes. Multiple child records can reference the same parent record unless an additional uniqueness constraint prevents it."
        },
        {
          question: "What is a composite primary key?",
          answer:
            "It is a primary key made from two or more columns whose combined values uniquely identify each row."
        },
        {
          question: "How do you find child records without a matching parent?",
          answer:
            "Use a LEFT JOIN from the child table to the parent table and filter where a non-nullable parent key is NULL in the joined result."
        },
        {
          question: "What does ON DELETE CASCADE do?",
          answer:
            "It automatically deletes referencing child rows when the referenced parent row is deleted, according to the database's foreign key behavior."
        },
        {
          question: "What is a junction table?",
          answer:
            "A junction table connects two tables in a many-to-many relationship, usually using foreign keys to both tables."
        }
      ]
    },
    {
      id: "revision",
      title: "17. Quick Revision Notes",
      paragraphs: [
        "Remember: primary keys identify rows, foreign keys represent relationships, and JOIN conditions use matching values to combine related records."
      ],
      bullets: [
        "A primary key is unique and non-NULL.",
        "A foreign key references an eligible primary or unique key.",
        "A foreign key can repeat because many child records can reference one parent.",
        "Foreign key constraints enforce referential integrity; JOIN conditions combine rows.",
        "INNER JOIN returns matching rows.",
        "LEFT JOIN preserves every row from its left-side table.",
        "A LEFT JOIN can find unmatched records by checking a non-nullable key from the other table for NULL.",
        "A junction table is commonly used for many-to-many relationships.",
        "ON DELETE and ON UPDATE actions control how changes to referenced records affect child records.",
        "Choose key constraints and deletion behavior based on the application's data-integrity requirements."
      ]
    }
  ]
};
