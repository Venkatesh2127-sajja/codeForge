export const comparator = {
  id: "comparator",
  slug: "comparator",

  title: "Comparator in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Learn how the Comparator interface is used to define custom sorting logic in Java, including sorting objects by different fields and creating multiple sorting strategies.",

  estimatedTime: "35 min",

  sections: [
    {
      id: "what-is-comparator",

      title: "1. What is Comparator?",

      paragraphs: [
        "Comparator is an interface in the java.util package used to define custom ordering for objects.",

        "Unlike Comparable, the comparison logic is defined outside the class being compared.",

        "Comparator is especially useful when an application needs multiple ways to sort the same type of object."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;

public class Main {

    public static void main(String[] args) {

        Comparator<Integer> comparator =
                Integer::compare;

        System.out.println(
                comparator.compare(10, 20)
        );
    }
}`
      },

      output: `-1`
    },

    {
      id: "compare-method",

      title: "2. compare() Method",

      paragraphs: [
        "The main method of Comparator is compare().",

        "It compares two objects and returns a negative value, zero, or a positive value according to their ordering."
      ],

      bullets: [
        "result < 0 → first object comes before the second.",
        "result == 0 → both objects are considered equal according to the comparator.",
        "result > 0 → first object comes after the second."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;

public class Main {

    public static void main(String[] args) {

        Comparator<Integer> comparator =
                Integer::compare;

        System.out.println(
                comparator.compare(10, 20)
        );

        System.out.println(
                comparator.compare(20, 10)
        );

        System.out.println(
                comparator.compare(10, 10)
        );
    }
}`
      },

      output: `-1
1
0`
    },

    {
      id: "comparator-custom-class",

      title: "3. Comparator with a Custom Class",

      paragraphs: [
        "Comparator is commonly used with custom classes.",

        "The class itself does not need to implement Comparator. Instead, a separate Comparator can define how objects should be compared."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;

class Student {

    private int id;
    private String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

class StudentIdComparator
        implements Comparator<Student> {

    @Override
    public int compare(Student first, Student second) {
        return Integer.compare(
                first.getId(),
                second.getId()
        );
    }
}`
      }
    },

    {
      id: "sorting-with-comparator",

      title: "4. Sorting Using Comparator",

      paragraphs: [
        "A Comparator can be passed to sorting methods to define the desired ordering.",

        "Collections.sort() can accept a Comparator and sort a List according to that comparison logic."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Student {

    private int id;
    private String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

class StudentIdComparator
        implements Comparator<Student> {

    @Override
    public int compare(Student first, Student second) {
        return Integer.compare(
                first.getId(),
                second.getId()
        );
    }
}

public class Main {

    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();

        students.add(new Student(103, "Kiran"));
        students.add(new Student(101, "Ravi"));
        students.add(new Student(102, "Venkatesh"));

        Collections.sort(
                students,
                new StudentIdComparator()
        );

        System.out.println(students);
    }
}`
      },

      output: `[101 - Ravi, 102 - Venkatesh, 103 - Kiran]`
    },

    {
      id: "anonymous-comparator",

      title: "5. Comparator Using Anonymous Class",

      paragraphs: [
        "Before lambda expressions became common, Comparator was frequently implemented using an anonymous class.",

        "This approach is still valid Java, although lambdas are usually more concise for simple comparison logic."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        Collections.sort(
                numbers,
                new Comparator<Integer>() {

                    @Override
                    public int compare(
                            Integer first,
                            Integer second) {

                        return Integer.compare(
                                first,
                                second
                        );
                    }
                }
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "lambda-comparator",

      title: "6. Comparator Using Lambda Expression",

      paragraphs: [
        "Comparator is a functional interface, so it can be implemented using a lambda expression.",

        "Lambda expressions make simple comparison logic shorter and easier to read."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        numbers.sort(
                (first, second) ->
                        Integer.compare(first, second)
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "reversed-order",

      title: "7. Sorting in Descending Order",

      paragraphs: [
        "Comparator provides the reversed() method, which can reverse an existing comparison.",

        "This is useful when the same comparison needs to be used in both ascending and descending order."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(30);
        numbers.add(20);

        numbers.sort(
                Comparator.naturalOrder().reversed()
        );

        System.out.println(numbers);
    }
}`
      },

      output: `[30, 20, 10]`
    },

    {
      id: "comparing",

      title: "8. Comparator.comparing()",

      paragraphs: [
        "Comparator.comparing() is a convenient method for creating a Comparator based on a property or field of an object.",

        "It is commonly used with method references and lambda expressions."
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

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();

        students.add(new Student(103, "Kiran"));
        students.add(new Student(101, "Ravi"));
        students.add(new Student(102, "Venkatesh"));

        students.sort(
                Comparator.comparing(Student::getId)
        );

        System.out.println(students);
    }
}`
      },

      output: `[101 - Ravi, 102 - Venkatesh, 103 - Kiran]`
    },

    {
      id: "sort-by-name",

      title: "9. Sorting Objects by Name",

      paragraphs: [
        "Comparator becomes especially useful when we need to sort objects using a particular property.",

        "For example, Student objects can be sorted alphabetically by name."
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

        students.add(new Student(103, "Kiran"));
        students.add(new Student(101, "Ravi"));
        students.add(new Student(102, "Arun"));

        students.sort(
                Comparator.comparing(Student::getName)
        );

        System.out.println(students);
    }
}`
      },

      output: `[102 - Arun, 103 - Kiran, 101 - Ravi]`
    },

    {
      id: "multiple-comparators",

      title: "10. Multiple Sorting Strategies",

      paragraphs: [
        "One of the major advantages of Comparator is that a class can have multiple sorting strategies.",

        "For example, Student objects can be sorted by ID, name, or another property without modifying the Student class."
      ],

      code: {
        language: "java",
        code: `Comparator<Student> byId =
        Comparator.comparing(Student::getId);

Comparator<Student> byName =
        Comparator.comparing(Student::getName);

students.sort(byId);

students.sort(byName);`
      }
    },

    {
      id: "then-comparing",

      title: "11. thenComparing()",

      paragraphs: [
        "thenComparing() allows us to define a secondary comparison when two objects have the same value according to the first comparison.",

        "This is useful when sorting by multiple fields."
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

    public int getId() {
        return id;
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
        students.add(new Student(102, "Ravi"));

        students.sort(
                Comparator.comparing(Student::getName)
                          .thenComparing(Student::getId)
        );

        System.out.println(students);
    }
}`
      },

      output: `[101 - Kiran, 102 - Ravi, 103 - Ravi]`
    },

    {
      id: "nulls-first",

      title: "12. Handling Null Values",

      paragraphs: [
        "Comparator provides helper methods such as nullsFirst() and nullsLast() when a comparison needs to handle null values explicitly.",

        "These methods wrap another Comparator and determine where null values should appear."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Ravi");
        names.add(null);
        names.add("Kiran");

        names.sort(
                Comparator.nullsFirst(
                        Comparator.naturalOrder()
                )
        );

        System.out.println(names);
    }
}`
      },

      output: `[null, Kiran, Ravi]`
    },

    {
      id: "comparator-treeset",

      title: "13. Comparator with TreeSet",

      paragraphs: [
        "TreeSet can receive a Comparator when it is created.",

        "The Comparator then determines the ordering of the elements stored in the TreeSet."
      ],

      code: {
        language: "java",
        code: `import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        Set<Integer> numbers =
                new TreeSet<>(Comparator.reverseOrder());

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
      id: "comparator-practical",

      title: "14. Practical Example - Sort Employees by Salary",

      paragraphs: [
        "In a backend application, employees may need to be sorted by salary for different reports.",

        "Comparator allows us to define this ordering without modifying the Employee class."
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

        List<Employee> employees = new ArrayList<>();

        employees.add(
                new Employee(101, "Ravi", 50000)
        );

        employees.add(
                new Employee(102, "Kiran", 70000)
        );

        employees.add(
                new Employee(103, "Venkatesh", 60000)
        );

        employees.sort(
                Comparator.comparingDouble(
                        Employee::getSalary
                )
        );

        System.out.println(employees);
    }
}`
      },

      output: `[101 - Ravi - 50000.0, 103 - Venkatesh - 60000.0, 102 - Kiran - 70000.0]`
    },

    {
      id: "comparable-comparator",

      title: "15. Comparable vs Comparator",

      paragraphs: [
        "Comparable and Comparator are both used for ordering objects, but the comparison logic is placed in different locations.",

        "Comparable defines the natural ordering inside the class.",

        "Comparator defines an external ordering and allows multiple sorting strategies."
      ],

      bullets: [
        "Comparable belongs to java.lang.",
        "Comparator belongs to java.util.",
        "Comparable uses compareTo().",
        "Comparator uses compare().",
        "Comparable defines natural ordering.",
        "Comparator defines custom or alternative ordering.",
        "A class normally has one natural Comparable ordering.",
        "A class can have many Comparator strategies."
      ]
    },

    {
      id: "important-points",

      title: "16. Important Points",

      bullets: [
        "Comparator is an interface in java.util.",
        "Comparator defines custom ordering.",
        "The main method is compare().",
        "Comparator can be implemented using a class, anonymous class, or lambda expression.",
        "Comparator.comparing() simplifies property-based sorting.",
        "thenComparing() supports multi-level sorting.",
        "reversed() reverses an existing ordering.",
        "nullsFirst() and nullsLast() help handle null values.",
        "Comparator can be passed to List.sort() and Collections.sort().",
        "TreeSet can use a Comparator to define element ordering.",
        "Comparator is useful when multiple sorting strategies are required."
      ]
    },

    {
      id: "interview-questions",

      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is Comparator in Java?",
          answer:
            "Comparator is an interface in java.util used to define custom ordering for objects."
        },
        {
          question: "Which method does Comparator provide?",
          answer:
            "The main abstract method is compare(T o1, T o2)."
        },
        {
          question: "What does compare() return?",
          answer:
            "A negative value means the first object comes before the second, zero means they are equal according to the comparison, and a positive value means the first object comes after the second."
        },
        {
          question: "Where is Comparator located?",
          answer:
            "Comparator is located in the java.util package."
        },
        {
          question: "Can Comparator be implemented using a lambda expression?",
          answer:
            "Yes. Comparator is a functional interface, so lambda expressions can be used to implement it."
        },
        {
          question: "Why use Comparator instead of Comparable?",
          answer:
            "Comparator is useful when sorting logic should remain outside the class or when multiple different sorting strategies are required."
        },
        {
          question: "Can a class have multiple Comparators?",
          answer:
            "Yes. Multiple Comparator objects can define different sorting strategies for the same class."
        },
        {
          question: "What is Comparator.comparing()?",
          answer:
            "Comparator.comparing() creates a Comparator based on a property extracted from an object, commonly using a method reference."
        },
        {
          question: "What is thenComparing()?",
          answer:
            "thenComparing() adds a secondary comparison that is used when the primary comparison considers two objects equal."
        },
        {
          question: "How do you sort in descending order using Comparator?",
          answer:
            "You can use reversed() on a Comparator or use Comparator.reverseOrder() for naturally ordered values."
        },
        {
          question: "Can Comparator be used with TreeSet?",
          answer:
            "Yes. A Comparator can be supplied when creating a TreeSet to define the ordering of its elements."
        },
        {
          question: "What is the difference between Comparable and Comparator?",
          answer:
            "Comparable defines natural ordering inside the class using compareTo(), while Comparator defines external or alternative ordering using compare()."
        }
      ]
    }
  ]
};