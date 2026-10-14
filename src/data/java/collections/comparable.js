export const comparable = {
  id: "comparable",
  slug: "comparable",

  title: "Comparable in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Learn how the Comparable interface is used to define the natural ordering of objects in Java and how it works with sorting collections.",

  estimatedTime: "30 min",

  sections: [
    {
      id: "what-is-comparable",

      title: "1. What is Comparable?",

      paragraphs: [
        "Comparable is an interface in the java.lang package used to define the natural ordering of objects.",

        "A class implements Comparable when its objects need to define how they should be compared with each other.",

        "The Comparable interface contains the compareTo() method."
      ],

      code: {
        language: "java",
        code: `public class Student implements Comparable<Student> {

    private int id;

    public Student(int id) {
        this.id = id;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.id, other.id);
    }
}`
      }
    },

    {
      id: "compare-to",

      title: "2. compareTo() Method",

      paragraphs: [
        "The compareTo() method compares the current object with another object of the same type.",

        "It returns a negative integer when the current object should come before the other object.",

        "It returns zero when the objects are considered equal for the ordering.",

        "It returns a positive integer when the current object should come after the other object."
      ],

      bullets: [
        "result < 0 → current object comes before the other object.",
        "result == 0 → both objects are equal according to the ordering.",
        "result > 0 → current object comes after the other object."
      ],

      code: {
        language: "java",
        code: `public class Main {

    public static void main(String[] args) {

        Integer first = 10;
        Integer second = 20;

        System.out.println(first.compareTo(second));
        System.out.println(second.compareTo(first));
        System.out.println(first.compareTo(10));
    }
}`
      },

      output: `-1
1
0`
    },

    {
      id: "implementing-comparable",

      title: "3. Implementing Comparable",

      paragraphs: [
        "To use Comparable with a custom class, the class implements Comparable<T> and overrides compareTo().",

        "The type parameter normally represents the same class whose objects are being compared."
      ],

      code: {
        language: "java",
        code: `class Student implements Comparable<Student> {

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
}`
      }
    },

    {
      id: "sorting-custom-objects",

      title: "4. Sorting Custom Objects Using Comparable",

      paragraphs: [
        "Once a class defines its natural ordering through Comparable, collection sorting methods can use that ordering.",

        "Collections.sort() can sort a List according to the natural ordering of its elements."
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

        students.add(new Student(103, "Kiran"));
        students.add(new Student(101, "Ravi"));
        students.add(new Student(102, "Venkatesh"));

        Collections.sort(students);

        System.out.println(students);
    }
}`
      },

      output: `[101 - Ravi, 102 - Venkatesh, 103 - Kiran]`
    },

    {
      id: "natural-ordering",

      title: "5. What is Natural Ordering?",

      paragraphs: [
        "Natural ordering is the default ordering defined by a class for its objects.",

        "For example, Integer objects have natural ordering based on their numeric value, while String objects have natural ordering based on their lexicographical order.",

        "A custom class can define its natural ordering by implementing Comparable."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>();

        numbers.add(30);
        numbers.add(10);
        numbers.add(20);

        Collections.sort(numbers);

        System.out.println(numbers);
    }
}`
      },

      output: `[10, 20, 30]`
    },

    {
      id: "string-comparable",

      title: "6. Comparable with String",

      paragraphs: [
        "String implements Comparable<String>, so String objects already have a natural ordering.",

        "The natural ordering of String is lexicographical ordering."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();

        names.add("Venkatesh");
        names.add("Ravi");
        names.add("Kiran");

        Collections.sort(names);

        System.out.println(names);
    }
}`
      },

      output: `[Kiran, Ravi, Venkatesh]`
    },

    {
      id: "comparable-with-tree-set",

      title: "7. Comparable with TreeSet",

      paragraphs: [
        "TreeSet maintains elements according to their sorted ordering.",

        "When objects do not provide an explicit Comparator, TreeSet can use their natural ordering if the elements implement Comparable."
      ],

      code: {
        language: "java",
        code: `import java.util.Set;
import java.util.TreeSet;

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

        Set<Student> students = new TreeSet<>();

        students.add(new Student(103, "Kiran"));
        students.add(new Student(101, "Ravi"));
        students.add(new Student(102, "Venkatesh"));

        System.out.println(students);
    }
}`
      },

      output: `[101 - Ravi, 102 - Venkatesh, 103 - Kiran]`
    },

    {
      id: "comparable-string-length",

      title: "8. Comparing Objects by a Numeric Field",

      paragraphs: [
        "A common use of Comparable is defining natural ordering using a numeric field such as id, age, salary, or price.",

        "Integer.compare() is useful because it clearly expresses the intended numeric comparison."
      ],

      code: {
        language: "java",
        code: `class Employee implements Comparable<Employee> {

    private int salary;

    public Employee(int salary) {
        this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.salary, other.salary);
    }
}`
      }
    },

    {
      id: "ascending-order",

      title: "9. Comparable for Ascending Order",

      paragraphs: [
        "Returning the comparison between the current object's field and the other object's field can define ascending natural ordering."
      ],

      code: {
        language: "java",
        code: `class Employee implements Comparable<Employee> {

    private int salary;

    public Employee(int salary) {
        this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.salary, other.salary);
    }
}`
      }
    },

    {
      id: "descending-order",

      title: "10. Comparable for Descending Order",

      paragraphs: [
        "Comparable can also define descending natural ordering by reversing the comparison.",

        "However, the natural ordering should be chosen carefully because it becomes the default ordering of the class."
      ],

      code: {
        language: "java",
        code: `class Employee implements Comparable<Employee> {

    private int salary;

    public Employee(int salary) {
        this.salary = salary;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(other.salary, this.salary);
    }
}`
      }
    },

    {
      id: "comparable-contract",

      title: "11. Comparable Contract",

      paragraphs: [
        "The compareTo() method has an important contract that should be respected when defining natural ordering.",

        "The comparison should be consistent and should return the expected sign when the order between two objects is determined."
      ],

      bullets: [
        "If x.compareTo(y) is negative, x should come before y.",
        "If x.compareTo(y) is zero, x and y are considered equal according to the ordering.",
        "If x.compareTo(y) is positive, x should come after y.",
        "The comparison should be consistent and transitive.",
        "compareTo() should not normally return arbitrary values unrelated to ordering."
      ]
    },

    {
      id: "compare-to-zero",

      title: "12. What Does compareTo() Return?",

      paragraphs: [
        "The exact negative or positive value returned by compareTo() is generally not important. The important information is whether the result is negative, zero, or positive."
      ],

      code: {
        language: "java",
        code: `Integer first = 10;
Integer second = 20;

int result = first.compareTo(second);

if (result < 0) {
    System.out.println("First comes before second");
} else if (result == 0) {
    System.out.println("Both are equal");
} else {
    System.out.println("First comes after second");
}`
      },

      output: `First comes before second`
    },

    {
      id: "comparable-and-equals",

      title: "13. Comparable and equals()",

      paragraphs: [
        "Comparable defines ordering, while equals() defines logical equality according to the class's equality contract.",

        "Ideally, compareTo() returning zero should be consistent with equals(), although the Comparable contract does not require this in every class.",

        "In sorted collections such as TreeSet, a comparison result of zero can cause two objects to be treated as duplicates for the collection's ordering purposes."
      ]
    },

    {
      id: "comparable-vs-comparator",

      title: "14. Comparable vs Comparator",

      paragraphs: [
        "Comparable and Comparator are both used for object comparison and sorting, but they solve different problems.",

        "Comparable defines the natural ordering inside the class itself.",

        "Comparator defines an external or alternative ordering."
      ],

      bullets: [
        "Comparable is implemented by the class being compared.",
        "Comparable uses compareTo().",
        "Comparator uses compare().",
        "Comparable is useful for one primary natural ordering.",
        "Comparator is useful when multiple sorting strategies are required.",
        "Comparable belongs to java.lang.",
        "Comparator belongs to java.util."
      ]
    },

    {
      id: "practical-example",

      title: "15. Practical Example - Sort Employees by ID",

      paragraphs: [
        "Suppose an application needs employees to have a natural ordering based on employee ID.",

        "The Employee class can implement Comparable<Employee> and define compareTo() using the ID."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Employee implements Comparable<Employee> {

    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class Main {

    public static void main(String[] args) {

        List<Employee> employees = new ArrayList<>();

        employees.add(new Employee(103, "Kiran"));
        employees.add(new Employee(101, "Ravi"));
        employees.add(new Employee(102, "Venkatesh"));

        Collections.sort(employees);

        System.out.println(employees);
    }
}`
      },

      output: `[101 - Ravi, 102 - Venkatesh, 103 - Kiran]`
    },

    {
      id: "important-points",

      title: "16. Important Points",

      bullets: [
        "Comparable belongs to the java.lang package.",
        "Comparable is used to define natural ordering.",
        "The class implements Comparable<T>.",
        "The compareTo() method must be implemented.",
        "A negative result means the current object comes before the other object.",
        "Zero means the objects are equal according to the ordering.",
        "A positive result means the current object comes after the other object.",
        "Collections.sort() can use natural ordering.",
        "TreeSet can use Comparable-based natural ordering.",
        "Comparator is preferred when multiple alternative sorting strategies are needed."
      ]
    },

    {
      id: "interview-questions",

      title: "17. Interview Questions",

      interviewQuestions: [
        {
          question: "What is Comparable in Java?",
          answer:
            "Comparable is an interface in java.lang used to define the natural ordering of objects."
        },
        {
          question: "Which method does Comparable provide?",
          answer:
            "Comparable provides the compareTo() method."
        },
        {
          question: "What does compareTo() return?",
          answer:
            "It returns a negative value, zero, or a positive value depending on whether the current object comes before, is equal to, or comes after the other object according to the defined ordering."
        },
        {
          question: "Where is Comparable located?",
          answer:
            "Comparable is located in the java.lang package."
        },
        {
          question: "How do you implement Comparable?",
          answer:
            "The class implements Comparable<T> and overrides the compareTo(T other) method."
        },
        {
          question: "What is natural ordering?",
          answer:
            "Natural ordering is the default ordering defined for objects of a class. A custom class can define it by implementing Comparable."
        },
        {
          question: "Can Comparable be used with Collections.sort()?",
          answer:
            "Yes. Collections.sort() can sort elements according to their natural ordering when the elements implement Comparable."
        },
        {
          question: "Can Comparable be used with TreeSet?",
          answer:
            "Yes. TreeSet can use the natural ordering of elements when they implement Comparable."
        },
        {
          question: "What is the difference between Comparable and Comparator?",
          answer:
            "Comparable defines natural ordering inside the class using compareTo(), while Comparator defines an external ordering using compare()."
        },
        {
          question: "Can a class have multiple Comparable implementations?",
          answer:
            "No. A class can implement Comparable with one type and therefore define one natural ordering. Multiple alternative orderings are normally provided using Comparator."
        },
        {
          question: "What happens when compareTo() returns zero in a TreeSet?",
          answer:
            "TreeSet treats the two elements as equivalent according to its ordering, so it does not store both as separate elements."
        }
      ]
    }
  ]
};