export const advancedCollectors = {
  id: "advanced-collectors",
  title: "Advanced Collectors",
  slug: "advanced-collectors",
  topicTitle: "Java 8",
  estimatedTime: "50 min",

  description:
    "Learn advanced Java Stream collectors including nested groupingBy(), mapping(), counting(), maxBy(), minBy(), partitioningBy(), toMap(), duplicate-key handling, and practical collector patterns used in backend development.",

  sections: [
    {
      id: "advanced-collectors-overview",
      title: "Advanced Collectors Overview",

      paragraphs: [
        "Collectors provide reusable reduction operations for Java Streams. The Collectors utility class contains methods for grouping, partitioning, counting, mapping, joining, converting streams into maps, and calculating summary information.",
        "Basic collectors such as toList() and toSet() are useful for simple transformations. Advanced collectors become especially useful when data needs to be grouped, summarized, transformed, or converted into nested structures.",
        "The most important advanced collectors include groupingBy(), mapping(), counting(), maxBy(), minBy(), partitioningBy(), and toMap()."
      ],

      bullets: [
        "groupingBy() groups elements by a key.",
        "mapping() transforms elements before passing them to another collector.",
        "counting() counts elements.",
        "maxBy() finds the maximum element according to a comparator.",
        "minBy() finds the minimum element according to a comparator.",
        "partitioningBy() divides elements into two groups.",
        "toMap() converts stream elements into a Map."
      ]
    },

    {
      id: "grouping-by",
      title: "groupingBy()",

      paragraphs: [
        "groupingBy() groups stream elements according to a classification function.",
        "The result is commonly a Map where each key represents a group and each value contains the elements belonging to that group."
      ],

      code: {
        language: "java",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "Java",
                        "Spring",
                        "JavaScript",
                        "JUnit",
                        "JPA"
                );

        Map<Integer, List<String>> result =
                names.stream()
                        .collect(
                                Collectors.groupingBy(
                                        String::length
                                )
                        );

        System.out.println(result);
    }
}`
      },

      output: `Example output:
{4=[Java, JPA], 6=[Spring, JUnit], 10=[JavaScript]}`
    },

    {
      id: "grouping-by-property",
      title: "Grouping Objects by a Property",

      paragraphs: [
        "In real applications, grouping is commonly performed using an object property such as department, city, category, status, or role."
      ],

      code: {
        language: "java",
        code: `class Employee {

    private String name;
    private String department;

    Employee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }
}

// Usage

Map<String, List<Employee>> employeesByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment
                        )
                );`
      },

      bullets: [
        "The key is the department.",
        "The value is a List<Employee>.",
        "Every employee is placed into the group corresponding to the department."
      ]
    },

    {
      id: "nested-grouping-by",
      title: "Nested groupingBy()",

      paragraphs: [
        "Nested groupingBy() is useful when data needs to be grouped by more than one property.",
        "For example, employees can first be grouped by department and then by city."
      ],

      code: {
        language: "java",
        code: `Map<String, Map<String, List<Employee>>> result =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.groupingBy(
                                        Employee::getCity
                                )
                        )
                );`
      },

      bullets: [
        "Outer key → department.",
        "Inner key → city.",
        "Final value → List<Employee>.",
        "This creates a nested Map structure."
      ]
    },

    {
      id: "grouping-by-counting",
      title: "groupingBy() + counting()",

      paragraphs: [
        "When the requirement is to count elements in each group instead of storing the complete elements, groupingBy() can be combined with counting()."
      ],

      code: {
        language: "java",
        code: `Map<String, Long> employeeCount =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.counting()
                        )
                );`
      },

      output: `Example result:
{IT=5, HR=3, Finance=4}`
    },

    {
      id: "grouping-by-mapping",
      title: "groupingBy() + mapping()",

      paragraphs: [
        "mapping() transforms the elements inside each group before another collector processes them.",
        "This is useful when we want grouped values in a different form instead of keeping the original objects."
      ],

      code: {
        language: "java",
        code: `Map<String, List<String>> namesByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.mapping(
                                        Employee::getName,
                                        Collectors.toList()
                                )
                        )
                );`
      },

      output: `Example result:
{IT=[Ravi, Arun], HR=[Priya, Anu]}`
    },

    {
      id: "grouping-by-mapping-set",
      title: "groupingBy() + mapping() + toSet()",

      paragraphs: [
        "The downstream collector can be changed from toList() to toSet() when duplicate values should be removed."
      ],

      code: {
        language: "java",
        code: `Map<String, Set<String>> citiesByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.mapping(
                                        Employee::getCity,
                                        Collectors.toSet()
                                )
                        )
                );`
      },

      bullets: [
        "groupingBy() determines the group.",
        "mapping() extracts the required property.",
        "toSet() removes duplicate values."
      ]
    },

    {
      id: "counting",
      title: "counting()",

      paragraphs: [
        "counting() counts the number of elements processed by a collector.",
        "It is particularly useful as a downstream collector with groupingBy()."
      ],

      code: {
        language: "java",
        code: `long count =
        employees.stream()
                .collect(
                        Collectors.counting()
                );

System.out.println(count);`
      },

      output: `5`
    },

    {
      id: "max-by",
      title: "maxBy()",

      paragraphs: [
        "maxBy() returns a collector that determines the maximum element according to a Comparator.",
        "Because the result may not exist when the input is empty, the collector returns an Optional."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> highestPaid =
        employees.stream()
                .collect(
                        Collectors.maxBy(
                                Comparator.comparing(
                                        Employee::getSalary
                                )
                        )
                );

highestPaid.ifPresent(
        employee ->
                System.out.println(
                        employee.getName()
                )
);`
      }
    },

    {
      id: "grouping-by-max-by",
      title: "groupingBy() + maxBy()",

      paragraphs: [
        "maxBy() becomes especially useful when combined with groupingBy() to find the maximum element inside each group."
      ],

      code: {
        language: "java",
        code: `Map<String, Optional<Employee>> highestPaidByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.maxBy(
                                        Comparator.comparing(
                                                Employee::getSalary
                                        )
                                )
                        )
                );`
      },

      bullets: [
        "Employees are grouped by department.",
        "maxBy() finds the highest salary in each department.",
        "The result contains Optional<Employee> for each department."
      ]
    },

    {
      id: "min-by",
      title: "minBy()",

      paragraphs: [
        "minBy() works similarly to maxBy(), but returns the minimum element according to the supplied Comparator."
      ],

      code: {
        language: "java",
        code: `Optional<Employee> lowestPaid =
        employees.stream()
                .collect(
                        Collectors.minBy(
                                Comparator.comparing(
                                        Employee::getSalary
                                )
                        )
                );

lowestPaid.ifPresent(
        employee ->
                System.out.println(
                        employee.getName()
                )
);`
      }
    },

    {
      id: "grouping-by-min-by",
      title: "groupingBy() + minBy()",

      paragraphs: [
        "minBy() can be used as a downstream collector to find the minimum element inside every group."
      ],

      code: {
        language: "java",
        code: `Map<String, Optional<Employee>> lowestPaidByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.minBy(
                                        Comparator.comparing(
                                                Employee::getSalary
                                        )
                                )
                        )
                );`
      }
    },

    {
      id: "partitioning-by",
      title: "partitioningBy()",

      paragraphs: [
        "partitioningBy() divides elements into two groups according to a predicate.",
        "The result is a Map<Boolean, List<T>> by default.",
        "The true key contains elements that satisfy the predicate, while the false key contains elements that do not."
      ],

      code: {
        language: "java",
        code: `Map<Boolean, List<Integer>> result =
        Arrays.asList(
                10, 15, 20, 25, 30
        )
        .stream()
        .collect(
                Collectors.partitioningBy(
                        n -> n % 2 == 0
                )
        );

System.out.println(result);`
      },

      output: `{false=[15, 25], true=[10, 20, 30]}`
    },

    {
      id: "partitioning-by-counting",
      title: "partitioningBy() + counting()",

      paragraphs: [
        "partitioningBy() can also accept a downstream collector.",
        "For example, counting() can be used to count how many elements satisfy the condition and how many do not."
      ],

      code: {
        language: "java",
        code: `Map<Boolean, Long> result =
        numbers.stream()
                .collect(
                        Collectors.partitioningBy(
                                n -> n >= 50,
                                Collectors.counting()
                        )
                );`
      },

      output: `Example result:
{false=3, true=2}`
    },

    {
      id: "partitioning-vs-grouping",
      title: "partitioningBy() vs groupingBy()",

      code: {
        language: "text",
        code: `partitioningBy()

Result:
Map<Boolean, ...>

Used for:
Two logical groups based on a predicate.


groupingBy()

Result:
Map<K, ...>

Used for:
Multiple groups based on a classification key.`
      },

      bullets: [
        "Use partitioningBy() when the classification naturally produces true/false.",
        "Use groupingBy() when there can be multiple classification keys.",
        "partitioningBy() is predicate-based.",
        "groupingBy() is key-based."
      ]
    },

    {
      id: "to-map",
      title: "toMap()",

      paragraphs: [
        "toMap() converts stream elements into a Map.",
        "The basic form requires a key-mapping function and a value-mapping function."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> result =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getId,
                                Employee::getName
                        )
                );`
      },

      output: `Example result:
{101=Ravi, 102=Priya, 103=Arun}`
    },

    {
      id: "to-map-duplicate-keys",
      title: "Duplicate Keys in toMap()",

      paragraphs: [
        "A common problem with toMap() occurs when multiple elements produce the same key.",
        "The basic two-argument form does not know which value should be retained when duplicate keys occur.",
        "A merge function can be supplied to define the duplicate-key behavior."
      ],

      code: {
        language: "java",
        code: `Map<String, Employee> result =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getDepartment,
                                employee -> employee,
                                (existing, replacement) ->
                                        existing
                        )
                );`
      },

      bullets: [
        "The first employee is retained when duplicate departments occur.",
        "The merge function receives the existing and replacement values.",
        "The merge function determines how duplicates are resolved."
      ]
    },

    {
      id: "to-map-keep-last",
      title: "Handling Duplicate Keys — Keep Last",

      code: {
        language: "java",
        code: `Map<String, Employee> result =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getDepartment,
                                employee -> employee,
                                (existing, replacement) ->
                                        replacement
                        )
                );`
      },

      output: `Duplicate departments are resolved by keeping the later value.`
    },

    {
      id: "to-map-combine-values",
      title: "Handling Duplicate Keys — Combine Values",

      paragraphs: [
        "The merge function does not have to simply keep one value. It can combine information from both values."
      ],

      code: {
        language: "java",
        code: `Map<String, Integer> totals =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getDepartment,
                                Employee::getSalary,
                                Integer::sum
                        )
                );`
      },

      output: `Example result:
{IT=150000, HR=90000, Finance=120000}`
    },

    {
      id: "to-map-linkedhashmap",
      title: "toMap() with a Specific Map Implementation",

      paragraphs: [
        "The four-argument version of toMap() allows a map supplier to specify the Map implementation used for the result."
      ],

      code: {
        language: "java",
        code: `Map<Integer, String> result =
        employees.stream()
                .collect(
                        Collectors.toMap(
                                Employee::getId,
                                Employee::getName,
                                (oldValue, newValue) ->
                                        newValue,
                                LinkedHashMap::new
                        )
                );`
      },

      bullets: [
        "Key mapper → creates the key.",
        "Value mapper → creates the value.",
        "Merge function → handles duplicate keys.",
        "Map supplier → determines the Map implementation."
      ]
    },

    {
      id: "advanced-grouping-example",
      title: "Advanced Example — Department Statistics",

      paragraphs: [
        "A common backend requirement is to group employees by department and calculate statistics for each department."
      ],

      code: {
        language: "java",
        code: `Map<String, Double> averageSalaryByDepartment =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.averagingDouble(
                                        Employee::getSalary
                                )
                        )
                );`
      },

      output: `Example result:
{IT=75000.0, HR=60000.0, Finance=80000.0}`
    },

    {
      id: "nested-advanced-example",
      title: "Advanced Example — Department and City",

      paragraphs: [
        "Nested grouping can be combined with mapping and counting to create multi-level reports."
      ],

      code: {
        language: "java",
        code: `Map<String, Map<String, Long>> countByDepartmentAndCity =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.groupingBy(
                                        Employee::getCity,
                                        Collectors.counting()
                                )
                        )
                );`
      },

      output: `Example result:
{
    IT={Bangalore=3, Hyderabad=2},
    HR={Bangalore=2}
}`
    },

    {
      id: "advanced-max-by-example",
      title: "Advanced Example — Highest Paid Employee",

      paragraphs: [
        "groupingBy() and maxBy() can be combined to find the highest-paid employee in every department."
      ],

      code: {
        language: "java",
        code: `Map<String, Optional<Employee>> result =
        employees.stream()
                .collect(
                        Collectors.groupingBy(
                                Employee::getDepartment,
                                Collectors.maxBy(
                                        Comparator.comparingDouble(
                                                Employee::getSalary
                                        )
                                )
                        )
                );`
      },

      bullets: [
        "groupingBy() creates the department groups.",
        "maxBy() finds the employee with the highest salary.",
        "Comparator.comparingDouble() compares salaries."
      ]
    },

    {
      id: "advanced-collector-thinking",
      title: "How to Think About Advanced Collectors",

      paragraphs: [
        "The easiest way to understand advanced collectors is to separate the problem into two questions: how should the data be classified, and what should happen inside each group?",
        "The first collector usually determines the group. A downstream collector then determines what should be calculated, transformed, or collected inside that group."
      ],

      code: {
        language: "text",
        code: `groupingBy(
    classificationFunction,
    downstreamCollector
)


Examples:

groupingBy(
    Employee::getDepartment,
    counting()
)


groupingBy(
    Employee::getDepartment,
    mapping(
        Employee::getName,
        toList()
    )
)


groupingBy(
    Employee::getDepartment,
    maxBy(
        Comparator.comparing(Employee::getSalary)
    )
)`
      },

      bullets: [
        "Need groups? Think groupingBy().",
        "Need true/false groups? Think partitioningBy().",
        "Need a count? Think counting().",
        "Need transformed values? Think mapping().",
        "Need maximum? Think maxBy().",
        "Need minimum? Think minBy().",
        "Need key/value Map? Think toMap()."
      ]
    },

    {
      id: "best-practices",
      title: "Advanced Collector Best Practices",

      bullets: [
        "Choose the collector based on the shape of the required result.",
        "Use groupingBy() for multi-key classification problems.",
        "Use partitioningBy() for boolean conditions.",
        "Use mapping() when only a specific property should be collected from each group.",
        "Use counting() when the actual elements are not required.",
        "Use maxBy() and minBy() with an appropriate Comparator.",
        "Always handle Optional results returned by maxBy() and minBy().",
        "Provide a merge function to toMap() whenever duplicate keys are possible.",
        "Use a suitable Map supplier when the resulting Map requires specific behavior such as insertion ordering.",
        "Avoid deeply nested collectors when a simpler transformation can make the code easier to understand.",
        "Keep collector pipelines readable.",
        "For complex business logic, consider moving complicated transformations into well-named methods instead of creating an extremely long collector expression."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "groupingBy() creates groups based on a classification function.",
        "Nested groupingBy() creates nested Map structures.",
        "mapping() transforms values before a downstream collector processes them.",
        "counting() counts elements.",
        "maxBy() finds the maximum element using a Comparator.",
        "minBy() finds the minimum element using a Comparator.",
        "maxBy() and minBy() return Optional results.",
        "partitioningBy() creates two groups based on a predicate.",
        "toMap() converts stream elements into key/value entries.",
        "Duplicate keys with the basic toMap() collector require special handling.",
        "A merge function determines how duplicate keys are resolved.",
        "toMap() can accept a Map supplier.",
        "Collectors can be nested to solve complex aggregation problems.",
        "The downstream collector determines what happens inside each grouping."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is groupingBy()?",
          answer:
            "groupingBy() is a collector that groups stream elements according to a classification function and normally produces a Map."
        },
        {
          question: "What is nested groupingBy()?",
          answer:
            "Nested groupingBy() groups data at multiple levels, producing structures such as Map<Department, Map<City, List<Employee>>>."
        },
        {
          question: "What is the purpose of mapping() as a downstream collector?",
          answer:
            "mapping() transforms each element in a group before another collector processes the transformed values."
        },
        {
          question: "How do you count elements in each group?",
          answer:
            "Use groupingBy() with counting() as the downstream collector."
        },
        {
          question: "How do you find the maximum value in each group?",
          answer:
            "Use groupingBy() with maxBy() and an appropriate Comparator as the downstream collector."
        },
        {
          question: "What does minBy() return?",
          answer:
            "minBy() returns a collector that finds the minimum element according to a Comparator. The result is represented as an Optional."
        },
        {
          question: "What is partitioningBy()?",
          answer:
            "partitioningBy() divides stream elements into two groups based on a predicate and produces a Map<Boolean, ...>."
        },
        {
          question: "What is the difference between groupingBy() and partitioningBy()?",
          answer:
            "groupingBy() supports classification into multiple keys, while partitioningBy() specifically divides elements according to a boolean predicate."
        },
        {
          question: "What is toMap()?",
          answer:
            "toMap() collects stream elements into a Map by specifying functions that produce keys and values."
        },
        {
          question: "What happens when duplicate keys occur with toMap()?",
          answer:
            "The basic two-argument toMap() collector cannot resolve duplicate keys. A merge function should be supplied to define how duplicate values are handled."
        },
        {
          question: "How do you keep the first value for duplicate keys?",
          answer:
            "Provide a merge function such as (existing, replacement) -> existing."
        },
        {
          question: "How do you keep the last value for duplicate keys?",
          answer:
            "Provide a merge function such as (existing, replacement) -> replacement."
        },
        {
          question: "Can toMap() combine duplicate values?",
          answer:
            "Yes. The merge function can combine the existing and replacement values, for example by adding numeric values."
        },
        {
          question: "Can toMap() use LinkedHashMap?",
          answer:
            "Yes. The four-argument version of toMap() accepts a map supplier, allowing a specific Map implementation such as LinkedHashMap to be used."
        },
        {
          question: "Why does maxBy() return Optional?",
          answer:
            "The input stream may contain no elements, so there may be no maximum value. Optional represents that possibility safely."
        },
        {
          question: "Can collectors be combined?",
          answer:
            "Yes. Collectors can be nested and composed using downstream collectors such as counting(), mapping(), maxBy(), minBy(), and other collectors."
        },
        {
          question: "How would you find the highest-paid employee in each department?",
          answer:
            "Group employees by department using groupingBy() and use maxBy() with a salary comparator as the downstream collector."
        },
        {
          question: "How would you count employees by department?",
          answer:
            "Use groupingBy(Employee::getDepartment, Collectors.counting())."
        },
        {
          question: "How would you create a Map of department to employee names?",
          answer:
            "Use groupingBy() with mapping(Employee::getName, Collectors.toList()) as the downstream collector."
        }
      ]
    }
  ]
};