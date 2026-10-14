export const sqlCourse = {
  id: "sql",
  title: "SQL Fundamentals",
  slug: "sql",
  description:
    "Learn SQL from the fundamentals to advanced queries, database design, performance optimization, and interview preparation.",
  category: "Database",
  level: "Beginner to Advanced",
  estimatedTime: "40+ hours",
  topics: [
    {
      id: 1,
      title: "Introduction to SQL",
      slug: "introduction-to-sql",
      description:
        "Learn SQL basics, relational database concepts, command categories, data types, keys, constraints, and your first queries.",
      lessons: [
        {
          id: 2001,
          title: "What Is SQL?",
          slug: "what-is-sql"
        },
        {
          id: 2002,
          title: "What Is a Database?",
          slug: "what-is-a-database"
        },
        {
          id: 2003,
          title: "Relational Database Concepts",
          slug: "relational-database-concepts"
        },
        {
          id: 2004,
          title: "SQL Command Categories",
          slug: "sql-command-categories"
        },
        {
          id: 2005,
          title: "SQL Data Types",
          slug: "sql-data-types"
        },
        {
          id: 2006,
          title: "Creating Databases and Tables",
          slug: "create-database-and-tables"
        },
        {
          id: 2007,
          title: "SQL Syntax and Comments",
          slug: "sql-comments-and-syntax"
        },
        {
          id: 2008,
          title: "SQL Keys Overview",
          slug: "sql-keys-overview"
        },
        {
          id: 2009,
          title: "SQL Constraints Overview",
          slug: "sql-constraints-overview"
        },
        {
          id: 2010,
          title: "Your First SQL Queries",
          slug: "first-sql-queries"
        }
      ]
    },
    {
  id: 2,
  title: "SELECT Queries and Filtering",
  slug: "select-queries-and-filtering",
  description:
    "Learn SELECT, DISTINCT, aliases, WHERE, comparison operators, logical operators, IN, BETWEEN, LIKE, and NULL filtering.",
  lessons: [
    {
      id: 2011,
      title: "SELECT Statement",
      slug: "select-statement"
    },
    {
      id: 2012,
      title: "Selecting Specific Columns",
      slug: "selecting-specific-columns"
    },
    {
      id: 2013,
      title: "DISTINCT Keyword",
      slug: "distinct-keyword"
    },
    {
      id: 2014,
      title: "Column Aliases with AS",
      slug: "column-aliases"
    },
    {
      id: 2015,
      title: "WHERE Clause",
      slug: "where-clause"
    },
    {
      id: 2016,
      title: "Comparison Operators",
      slug: "comparison-operators"
    },
    {
      id: 2017,
      title: "Logical Operators — AND, OR, NOT",
      slug: "logical-operators"
    },
    {
      id: 2018,
      title: "IN, BETWEEN, and LIKE",
      slug: "in-between-like"
    },
    {
      id: 2019,
      title: "NULL Values and IS NULL",
      slug: "null-values"
    },
    {
      id: 2020,
      title: "SELECT and Filtering Exercises",
      slug: "select-filtering-exercises"
    }
  ]
},
{
  id: 3,
  title: "Sorting, Limiting and Pagination",
  slug: "sorting-limiting-and-pagination",
  description:
    "Learn ORDER BY, ASC, DESC, sorting by multiple columns, LIMIT, OFFSET, pagination, FETCH FIRST, and top-N queries with practical exercises.",
  lessons: [
    {
      id: 2021,
      title: "ORDER BY Clause",
      slug: "order-by-clause"
    },
    {
      id: 2022,
      title: "Ascending and Descending Order",
      slug: "ascending-and-descending"
    },
    {
      id: 2023,
      title: "Sorting by Multiple Columns",
      slug: "sorting-multiple-columns"
    },
    {
      id: 2024,
      title: "Sorting with Expressions",
      slug: "sorting-with-expressions"
    },
    {
      id: 2025,
      title: "LIMIT Clause",
      slug: "limit-clause"
    },
    {
      id: 2026,
      title: "OFFSET Clause",
      slug: "offset-clause"
    },
    {
      id: 2027,
      title: "Pagination Fundamentals",
      slug: "pagination-fundamentals"
    },
    {
      id: 2028,
      title: "FETCH FIRST and Database Differences",
      slug: "fetch-first-and-database-differences"
    },
    {
      id: 2029,
      title: "Top-N Queries",
      slug: "top-n-queries"
    },
    {
      id: 2030,
      title: "Sorting and Pagination Exercises",
      slug: "sorting-pagination-exercises"
    }
  ]
},


{
  id: 4,
  title: "Aggregate Functions",
  slug: "aggregate-functions",
  description:
    "Learn SQL aggregate functions including COUNT(), SUM(), AVG(), MIN(), MAX(), DISTINCT, NULL handling, filtering, and practical business reports.",
  lessons: [
    {
      id: 2031,
      title: "Introduction to Aggregate Functions",
      slug: "aggregate-functions-introduction"
    },
    {
      id: 2032,
      title: "COUNT() Function",
      slug: "count-function"
    },
    {
      id: 2033,
      title: "SUM() Function",
      slug: "sum-function"
    },
    {
      id: 2034,
      title: "AVG() Function",
      slug: "avg-function"
    },
    {
      id: 2035,
      title: "MIN() and MAX() Functions",
      slug: "min-max-functions"
    },
    {
      id: 2036,
      title: "Aggregate Functions with DISTINCT",
      slug: "aggregate-distinct"
    },
    {
      id: 2037,
      title: "Aggregate Functions and NULL Values",
      slug: "aggregate-null-values"
    },
    {
      id: 2038,
      title: "Aggregate Functions with WHERE",
      slug: "aggregates-with-where"
    },
    {
      id: 2039,
      title: "Aggregate Functions in Business Reports",
      slug: "business-report-aggregates"
    },
    {
      id: 2040,
      title: "Aggregate Functions Exercises",
      slug: "aggregate-functions-exercises"
    }
  ]
},

{
  id: 5,
  title: "GROUP BY and HAVING",
  slug: "group-by-and-having",
  description:
    "Master GROUP BY, multiple-column grouping, aggregate calculations, HAVING, WHERE versus HAVING, and practical reporting exercises.",
  lessons: [
    {
      id: 2041,
      title: "GROUP BY Fundamentals",
      slug: "group-by-fundamentals"
    },
    {
      id: 2042,
      title: "Grouping by One Column",
      slug: "group-by-one-column"
    },
    {
      id: 2043,
      title: "Grouping by Multiple Columns",
      slug: "group-by-multiple-columns"
    },
    {
      id: 2044,
      title: "Aggregates per Group",
      slug: "aggregates-per-group"
    },
    {
      id: 2045,
      title: "HAVING Clause",
      slug: "having-clause"
    },
    {
      id: 2046,
      title: "WHERE vs HAVING",
      slug: "where-vs-having"
    },
    {
      id: 2047,
      title: "Filtering Groups with Aggregates",
      slug: "filtering-groups-with-aggregates"
    },
    {
      id: 2048,
      title: "GROUP BY with Expressions",
      slug: "group-by-expressions"
    },
    {
      id: 2049,
      title: "Business Reports with GROUP BY",
      slug: "business-reports-group-by"
    },
    {
      id: 2050,
      title: "GROUP BY and HAVING Exercises",
      slug: "group-by-having-exercises"
    }
  ]
},
{
  id: 6,
  title: "SQL Joins",
  slug: "sql-joins",
  description:
    "Master INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, SELF JOIN, multi-table queries, unmatched records, join performance, and practical exercises.",
  lessons: [
    {
      id: 2051,
      title: "Introduction to SQL Joins",
      slug: "joins-introduction"
    },
    {
      id: 2052,
      title: "Understanding Primary and Foreign Keys in Joins",
      slug: "primary-foreign-keys-joins"
    },
    {
      id: 2053,
      title: "INNER JOIN",
      slug: "inner-join"
    },
    {
      id: 2054,
      title: "INNER JOIN with Multiple Tables",
      slug: "inner-join-multiple-tables"
    },
    {
      id: 2055,
      title: "LEFT JOIN",
      slug: "left-join"
    },
    {
      id: 2056,
      title: "RIGHT JOIN",
      slug: "right-join"
    },
    {
      id: 2057,
      title: "FULL OUTER JOIN",
      slug: "full-outer-join"
    },
    {
      id: 2058,
      title: "CROSS JOIN",
      slug: "cross-join"
    },
    {
      id: 2059,
      title: "SELF JOIN",
      slug: "self-join"
    },
    {
      id: 2060,
      title: "Joining Three or More Tables",
      slug: "joining-multiple-tables"
    },
    {
      id: 2061,
      title: "JOIN with WHERE and ORDER BY",
      slug: "join-where-order-by"
    },
    {
      id: 2062,
      title: "JOIN with GROUP BY and HAVING",
      slug: "join-group-by-having"
    },
    {
      id: 2063,
      title: "Finding Unmatched Records with JOINs",
      slug: "unmatched-records-joins"
    },
    {
      id: 2064,
      title: "Common JOIN Mistakes and Performance Basics",
      slug: "join-mistakes-performance"
    },
    {
      id: 2065,
      title: "SQL Joins Exercises",
      slug: "sql-joins-exercises"
    }
  ]
}



  ]
};