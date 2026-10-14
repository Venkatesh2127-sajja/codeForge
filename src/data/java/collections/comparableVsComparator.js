export const comparableVsComparator = {
  id: "comparable-vs-comparator",
  slug: "comparable-vs-comparator",

  title: "Comparable vs Comparator in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the differences between Comparable and Comparator in Java, including natural ordering, custom sorting, multiple sorting strategies, compareTo(), compare(), lambdas, and practical object-sorting examples.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "introduction",
      title: "1. Comparable vs Comparator",

      paragraphs: [
        "Comparable and Comparator are two important interfaces used for comparing and sorting objects in Java.",
        "Comparable defines the natural ordering of a class, while Comparator defines an external or custom ordering.",
        "Both are commonly used with collections such as ArrayList, TreeSet, and TreeMap."
      ],

      bullets: [
        "Comparable is in java.lang.",
        "Comparator is in java.util.",
        "Comparable uses compareTo().",
        "Comparator uses compare().",
        "Comparable is implemented by the class being sorted.",
        "Comparator can be implemented separately from the class.",
        "A class generally has one natural ordering through Comparable.",
        "A class can have multiple Comparator strategies."
      ]
    },

    {
      id: "comparable-example",
      title: "2. Comparable Example",

      paragraphs: [
        "To use Comparable, a class implements Comparable<T> and overrides the compareTo() method.",
        "The compareTo() method defines the natural ordering of objects."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Student implements Comparable<Student> {

    private int id;
    private String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();

        students.add(new Student(103, "Ravi"));
        students.add(new Student(101, "Kiran"));
        students.add(new Student(102, "Arun"));

        Collections.sort(students);

        System.out.println(students);
    }
}`
      },

      output: `[101 - Kiran, 102 - Arun, 103 - Ravi]`
    },

    {
      id: "comparator-example",
      title: "3. Comparator Example",

      paragraphs: [
        "With Comparator, the comparison logic is placed outside the Student class.",
        "This allows the same Student class to be sorted in different ways."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {

    private int id;
    private String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();

        students.add(new Student(103, "Ravi"));
        students.add(new Student(101, "Kiran"));
        students.add(new Student(102, "Arun"));

        students.sort(
                Comparator.comparing(Student::getName)
        );

        System.out.println(students);
    }
}`
      },

      output: `[102 - Arun, 101 - Kiran, 103 - Ravi]`
    },

    {
      id: "comparable-location",
      title: "4. Where is the Comparison Logic Defined?",

      paragraphs: [
        "The main structural difference is where the comparison logic is defined.",
        "With Comparable, the class itself defines its natural ordering.",
        "With Comparator, the comparison logic can be defined in another class, lambda expression, or method reference."
      ],

      code: {
        language: "java",
        code: `// Comparable

class Student implements Comparable<Student> {

    @Override
    public int compareTo(Student other) {
        return Integer.compare(
                this.id,
                other.id
        );
    }
}


// Comparator

Comparator<Student> byName =
        Comparator.comparing(Student::getName);`
      }
    },

    {
      id: "compareto",
      title: "5. compareTo() Method",

      paragraphs: [
        "Comparable uses the compareTo() method.",
        "The method compares the current object with another object of the same type."
      ],

      bullets: [
        "Negative value → current object comes before the other object.",
        "Zero → both objects are equal according to the comparison.",
        "Positive value → current object comes after the other object."
      ],

      code: {
        language: "java",
        code: `public int compareTo(Student other) {

    return Integer.compare(
            this.id,
            other.id
    );
}`
      }
    },

    {
      id: "compare",
      title: "6. compare() Method",

      paragraphs: [
        "Comparator uses the compare() method.",
        "Unlike compareTo(), compare() receives both objects as parameters."
      ],

      code: {
        language: "java",
        code: `Comparator<Student> byId =
        (first, second) ->
                Integer.compare(
                        first.getId(),
                        second.getId()
                );`
      }
    },

    {
      id: "one-vs-multiple",
      title: "7. One Natural Ordering vs Multiple Sorting Strategies",

      paragraphs: [
        "Comparable is useful when a class has a clear natural ordering.",
        "Comparator is useful when the same objects need to be sorted in different ways.",
        "For example, employees might need to be sorted by ID, name, salary, or joining date."
      ],

      code: {
        language: "java",
        code: `Comparator<Employee> byId =
        Comparator.comparing(Employee::getId);

Comparator<Employee> byName =
        Comparator.comparing(Employee::getName);

Comparator<Employee> bySalary =
        Comparator.comparingDouble(
                Employee::getSalary
        );`
      }
    },

    {
      id: "lambda",
      title: "8. Comparator with Lambda",

      paragraphs: [
        "Comparator is a functional interface, so it can be implemented using a lambda expression.",
        "This makes custom sorting concise and readable."
      ],

      code: {
        language: "java",
        code: `students.sort(
        (first, second) ->
                first.getName()
                    .compareTo(second.getName())
);`
      }
    },

    {
      id: "method-reference",
      title: "9. Comparator.comparing()",

      paragraphs: [
        "Comparator.comparing() is commonly used to create a Comparator from a property of an object.",
        "Method references make the sorting expression concise."
      ],

      code: {
        language: "java",
        code: `students.sort(
        Comparator.comparing(Student::getName)
);`
      }
    },

    {
      id: "descending",
      title: "10. Ascending and Descending Order",

      paragraphs: [
        "Comparable commonly defines a natural ordering.",
        "Comparator makes it easy to create both ascending and descending sorting strategies."
      ],

      code: {
        language: "java",
        code: `Comparator<Student> ascending =
        Comparator.comparing(Student::getName);

Comparator<Student> descending =
        Comparator.comparing(Student::getName)
                  .reversed();

students.sort(ascending);

students.sort(descending);`
      }
    },

    {
      id: "then-comparing",
      title: "11. Multiple Fields with thenComparing()",

      paragraphs: [
        "Comparator can compare objects using more than one field.",
        "thenComparing() defines a secondary comparison when the first comparison considers two objects equal."
      ],

      code: {
        language: "java",
        code: `Comparator<Student> comparator =
        Comparator.comparing(Student::getName)
                  .thenComparing(Student::getId);

students.sort(comparator);`
      }
    },

    {
      id: "practical-example",
      title: "12. Practical Example - Employee Sorting",

      paragraphs: [
        "Consider an Employee class with ID, name, and salary.",
        "We can create different Comparator objects to sort the same employees using different fields."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Employee {

    private int id;
    private String name;
    private double salary;

    public Employee(
            int id,
            String name,
            double salary) {

        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return id + " - " + name + " - " + salary;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Employee> employees =
                new ArrayList<>();

        employees.add(
                new Employee(
                        103,
                        "Ravi",
                        60000
                )
        );

        employees.add(
                new Employee(
                        101,
                        "Kiran",
                        75000
                )
        );

        employees.add(
                new Employee(
                        102,
                        "Arun",
                        50000
                )
        );

        Comparator<Employee> bySalary =
                Comparator.comparingDouble(
                        Employee::getSalary
                );

        employees.sort(bySalary);

        System.out.println(employees);
    }
}`
      },

      output: `[102 - Arun - 50000.0, 103 - Ravi - 60000.0, 101 - Kiran - 75000.0]`
    },

    {
      id: "tree-set",
      title: "13. Comparable and Comparator with TreeSet",

      paragraphs: [
        "TreeSet maintains its elements according to an ordering.",
        "That ordering can come from the elements' natural ordering through Comparable or from a Comparator supplied when the TreeSet is created."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers =
                new TreeSet<>(
                        Comparator.reverseOrder()
                );

        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        System.out.println(numbers);
    }
}`
      },

      output: `[30, 20, 10]`
    },

    {
      id: "when-comparable",
      title: "14. When Should You Use Comparable?",

      paragraphs: [
        "Use Comparable when the class has a natural ordering that is appropriate as its primary or default ordering.",
        "For example, a Product class might naturally be ordered by a product identifier if that ordering is part of the class's intended semantics."
      ],

      bullets: [
        "The class has a clear natural ordering.",
        "You want the ordering to be part of the class.",
        "The same default ordering should be reused throughout the application.",
        "You want collections to be sortable without separately supplying a Comparator."
      ]
    },

    {
      id: "when-comparator",
      title: "15. When Should You Use Comparator?",

      paragraphs: [
        "Use Comparator when sorting logic should be external to the class or when multiple sorting strategies are required."
      ],

      bullets: [
        "You need multiple sorting strategies.",
        "You cannot or do not want to modify the class.",
        "Different screens or reports require different ordering.",
        "You want concise lambda-based sorting.",
        "You need multi-field sorting."
      ]
    },

    {
      id: "comparison-table",
      title: "16. Comparable vs Comparator - Quick Comparison",

      bullets: [
        "Package: Comparable → java.lang; Comparator → java.util.",
        "Method: Comparable → compareTo(); Comparator → compare().",
        "Location: Comparable → implemented by the class; Comparator → external comparison logic.",
        "Ordering: Comparable → natural ordering; Comparator → custom or alternative ordering.",
        "Number of strategies: Comparable → generally one natural ordering; Comparator → multiple strategies.",
        "Lambda: Comparable → not normally used directly for compareTo(); Comparator → commonly used with lambdas.",
        "Class modification: Comparable requires implementing the interface in the class; Comparator does not require modifying the class.",
        "Typical usage: Comparable for natural ordering; Comparator for custom sorting."
      ]
    },

    {
      id: "common-mistakes",
      title: "17. Common Mistakes",

      paragraphs: [
        "There are several mistakes developers commonly make when implementing comparison logic."
      ],

      bullets: [
        "Returning a boolean from compareTo() or compare() instead of an integer.",
        "Using subtraction carelessly for integer comparison, which can overflow for extreme integer values.",
        "Forgetting to define a consistent ordering.",
        "Using binarySearch() with a different ordering from the one used to sort the list.",
        "Assuming a Comparator must be implemented as a separate named class; lambdas and method references are also valid.",
        "Assuming Comparable and Comparator are interchangeable; they solve related but different design problems."
      ],

      code: {
        language: "java",
        code: `// Preferred

return Integer.compare(
        first.getId(),
        second.getId()
);


// Also useful for strings

return first.getName()
            .compareTo(second.getName());`
      }
    },

    {
      id: "important-points",
      title: "18. Important Points",

      bullets: [
        "Comparable is used to define natural ordering.",
        "Comparator is used to define custom or alternative ordering.",
        "Comparable is in java.lang.",
        "Comparator is in java.util.",
        "Comparable uses compareTo().",
        "Comparator uses compare().",
        "Comparable is implemented by the class whose objects are being compared.",
        "Comparator can be defined outside the class.",
        "A class can have multiple Comparator strategies.",
        "Comparator works naturally with lambda expressions.",
        "Comparator.comparing() simplifies property-based comparison.",
        "thenComparing() supports multi-level sorting.",
        "reversed() can reverse a Comparator.",
        "TreeSet can use either natural ordering or a supplied Comparator.",
        "Use Integer.compare() instead of simple integer subtraction when writing comparison logic."
      ]
    },

    {
      id: "interview-questions",
      title: "19. Interview Questions",

      interviewQuestions: [
        {
          question: "What is the main difference between Comparable and Comparator?",
          answer:
            "Comparable defines the natural ordering of a class using compareTo(), while Comparator defines external or custom ordering using compare()."
        },
        {
          question: "Where is Comparable located?",
          answer:
            "Comparable is located in the java.lang package."
        },
        {
          question: "Where is Comparator located?",
          answer:
            "Comparator is located in the java.util package."
        },
        {
          question: "Which method does Comparable use?",
          answer:
            "Comparable uses the compareTo() method."
        },
        {
          question: "Which method does Comparator use?",
          answer:
            "Comparator uses the compare() method."
        },
        {
          question: "Can one class have multiple Comparators?",
          answer:
            "Yes. Multiple Comparator objects can define different sorting strategies for the same class."
        },
        {
          question: "Can a class have multiple Comparable implementations?",
          answer:
            "A class implements a given interface once, so it normally has one compareTo() implementation representing its natural ordering. Multiple alternative orderings are typically provided with Comparator."
        },
        {
          question: "Why is Comparator useful when a class cannot be modified?",
          answer:
            "Comparator allows comparison logic to be defined externally, so the original class does not need to implement Comparable or be changed."
        },
        {
          question: "Can Comparator be used with lambda expressions?",
          answer:
            "Yes. Comparator is a functional interface, so it can be implemented with a lambda expression."
        },
        {
          question: "What is Comparator.comparing()?",
          answer:
            "It creates a Comparator based on a property or value extracted from an object, often using a method reference."
        },
        {
          question: "What is thenComparing()?",
          answer:
            "It adds a secondary comparison that is applied when the primary comparison considers two objects equal."
        },
        {
          question: "How do you reverse a Comparator?",
          answer:
            "Use the reversed() method on a Comparator."
        },
        {
          question: "Can Comparable be used with TreeSet?",
          answer:
            "Yes. TreeSet can use the natural ordering defined by Comparable when no Comparator is supplied."
        },
        {
          question: "Can Comparator be used with TreeSet?",
          answer:
            "Yes. A Comparator can be supplied when creating the TreeSet."
        },
        {
          question: "What does compareTo() return?",
          answer:
            "It returns a negative value, zero, or a positive value depending on the relative ordering of the two objects."
        },
        {
          question: "What does compare() return?",
          answer:
            "It returns a negative value, zero, or a positive value depending on the relative ordering of the two supplied objects."
        },
        {
          question: "Which should you use for multiple sorting strategies?",
          answer:
            "Comparator is appropriate because multiple Comparator implementations or expressions can define different orderings."
        },
        {
          question: "Why is Integer.compare() preferred over subtraction in comparison logic?",
          answer:
            "Integer.compare() avoids integer overflow problems that can occur when comparing values by subtracting one integer from another."
        }
      ]
    }
  ]
};