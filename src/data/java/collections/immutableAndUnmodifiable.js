export const immutableAndUnmodifiable = {
  id: "immutable-and-unmodifiable",
  slug: "immutable-and-unmodifiable",

  title: "Immutable and Unmodifiable Collections in Java",

  topicTitle: "Collections",
  topicSlug: "collections",

  description:
    "Understand the difference between immutable and unmodifiable collections in Java, including List.of(), Set.of(), Map.of(), Collections.unmodifiableList(), defensive copies, modification behavior, and practical use cases.",

  estimatedTime: "40 min",

  sections: [
    {
      id: "what-is-immutable",
      title: "1. What is an Immutable Collection?",

      paragraphs: [
        "An immutable collection is a collection whose contents cannot be changed after the collection is created.",
        "Operations such as add(), remove(), and set() are not available for changing the immutable collection.",
        "Java provides convenient factory methods such as List.of(), Set.of(), and Map.of() for creating immutable collections."
      ],

      code: {
        language: "java",
        code: `import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                List.of(
                        "Ravi",
                        "Kiran",
                        "Arun"
                );

        System.out.println(names);
    }
}`
      },

      output: `[Ravi, Kiran, Arun]`
    },

    {
      id: "immutable-list",
      title: "2. Immutable List Using List.of()",

      paragraphs: [
        "List.of() creates an unmodifiable List with the specified elements.",
        "The returned list does not allow structural modifications or replacement of elements."
      ],

      code: {
        language: "java",
        code: `import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                List.of(
                        "Java",
                        "Spring",
                        "React"
                );

        System.out.println(names);

        // names.add("Docker");
        // UnsupportedOperationException
    }
}`
      },

      output: `[Java, Spring, React]`
    },

    {
      id: "immutable-set",
      title: "3. Immutable Set Using Set.of()",

      paragraphs: [
        "Set.of() creates an unmodifiable Set.",
        "A Set does not allow duplicate elements, and the Set.of() factory methods reject duplicate arguments."
      ],

      code: {
        language: "java",
        code: `import java.util.Set;

public class Main {

    public static void main(String[] args) {

        Set<String> technologies =
                Set.of(
                        "Java",
                        "Spring",
                        "Docker"
                );

        System.out.println(technologies);
    }
}`
      },

      output: `Example output:
[Java, Spring, Docker]

Note: Set does not guarantee insertion order.`
    },

    {
      id: "immutable-map",
      title: "4. Immutable Map Using Map.of()",

      paragraphs: [
        "Map.of() creates an unmodifiable Map containing the specified key-value pairs.",
        "Keys and values passed to Map.of() must satisfy the factory method's restrictions, including non-null keys and values."
      ],

      code: {
        language: "java",
        code: `import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map<Integer, String> students =
                Map.of(
                        101, "Ravi",
                        102, "Kiran",
                        103, "Arun"
                );

        System.out.println(students);
    }
}`
      },

      output: `Example output:
{101=Ravi, 102=Kiran, 103=Arun}

Note: Map does not guarantee iteration order.`
    },

    {
      id: "unmodifiable-meaning",
      title: "5. What is an Unmodifiable Collection?",

      paragraphs: [
        "An unmodifiable collection is a view or wrapper through which modification operations are not allowed.",
        "A common example is Collections.unmodifiableList().",
        "The important distinction is that the underlying collection can still be modified if another reference to it exists."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> original =
                new ArrayList<>();

        original.add("Java");
        original.add("Spring");

        List<String> view =
                Collections.unmodifiableList(
                        original
                );

        System.out.println(view);
    }
}`
      },

      output: `[Java, Spring]`
    },

    {
      id: "unmodifiable-view",
      title: "6. Unmodifiable Collection is a View",

      paragraphs: [
        "Collections.unmodifiableList() does not create an independent copy of the original List.",
        "It creates an unmodifiable view backed by the original collection.",
        "If the original collection changes through another reference, the change can be observed through the unmodifiable view."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> original =
                new ArrayList<>();

        original.add("Java");
        original.add("Spring");

        List<String> view =
                Collections.unmodifiableList(
                        original
                );

        original.add("React");

        System.out.println(view);
    }
}`
      },

      output: `[Java, Spring, React]`
    },

    {
      id: "unmodifiable-direct-modification",
      title: "7. Modifying an Unmodifiable View",

      paragraphs: [
        "Modification through the unmodifiable view is not allowed.",
        "Attempting to call add(), remove(), or set() through that view results in UnsupportedOperationException."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> original =
                new ArrayList<>();

        original.add("Java");
        original.add("Spring");

        List<String> view =
                Collections.unmodifiableList(
                        original
                );

        view.add("React");
    }
}`
      },

      output: `Exception in thread "main"
java.lang.UnsupportedOperationException`
    },

    {
      id: "immutable-vs-unmodifiable",
      title: "8. Immutable vs Unmodifiable",

      paragraphs: [
        "Immutable and unmodifiable are related concepts but should not be treated as exactly the same.",
        "An immutable collection cannot be changed after creation.",
        "An unmodifiable view prevents modification through that particular reference, but the underlying collection may still be changed through another reference."
      ],

      bullets: [
        "Immutable collection → contents cannot be changed through any collection API.",
        "Unmodifiable view → modification through the view is blocked.",
        "Immutable factory methods create collections intended to remain unchanged.",
        "Collections.unmodifiableList() creates a read-only view of another collection.",
        "Changes to the original collection can be visible through an unmodifiable view.",
        "An unmodifiable view does not automatically make the underlying collection immutable."
      ]
    },

    {
      id: "list-copy-of",
      title: "9. List.copyOf()",

      paragraphs: [
        "List.copyOf() creates an unmodifiable List containing the elements of the supplied collection.",
        "Unlike Collections.unmodifiableList(), it creates a separate collection result rather than a live view of the original collection."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> original =
                new ArrayList<>();

        original.add("Java");
        original.add("Spring");

        List<String> copy =
                List.copyOf(original);

        original.add("React");

        System.out.println(original);
        System.out.println(copy);
    }
}`
      },

      output: `[Java, Spring, React]
[Java, Spring]`
    },

    {
      id: "set-copy-of",
      title: "10. Set.copyOf()",

      paragraphs: [
        "Set.copyOf() creates an unmodifiable Set containing the elements of the supplied collection.",
        "The resulting Set does not reflect later additions to the original collection."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        List<String> original =
                new ArrayList<>();

        original.add("Java");
        original.add("Spring");

        Set<String> copy =
                Set.copyOf(original);

        original.add("React");

        System.out.println(copy);
    }
}`
      },

      output: `Example output:
[Java, Spring]

Note: Set does not guarantee insertion order.`
    },

    {
      id: "map-copy-of",
      title: "11. Map.copyOf()",

      paragraphs: [
        "Map.copyOf() creates an unmodifiable Map containing the entries of the supplied Map.",
        "Later modifications to the original Map do not change the copied Map."
      ],

      code: {
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map<Integer, String> original =
                new HashMap<>();

        original.put(101, "Ravi");
        original.put(102, "Kiran");

        Map<Integer, String> copy =
                Map.copyOf(original);

        original.put(103, "Arun");

        System.out.println(copy);
    }
}`
      },

      output: `Example output:
{101=Ravi, 102=Kiran}

Note: Map does not guarantee iteration order.`
    },

    {
      id: "defensive-copy",
      title: "12. Defensive Copy",

      paragraphs: [
        "A defensive copy is a separate copy of data created to prevent external code from modifying the original internal collection.",
        "This is especially useful when a class exposes collection data through a getter or constructor."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

class StudentService {

    private final List<String> students;

    public StudentService(List<String> students) {

        this.students =
                new ArrayList<>(students);
    }

    public List<String> getStudents() {

        return List.copyOf(students);
    }
}

public class Main {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Kiran");

        StudentService service =
                new StudentService(names);

        List<String> result =
                service.getStudents();

        System.out.println(result);
    }
}`
      },

      output: `[Ravi, Kiran]`
    },

    {
      id: "getter-problem",
      title: "13. Why Returning the Internal List Can Be Dangerous",

      paragraphs: [
        "Returning a mutable internal collection directly can allow callers to modify an object's internal state.",
        "A defensive copy or unmodifiable result can prevent unwanted external modification."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

class StudentService {

    private final List<String> students =
            new ArrayList<>();

    public StudentService() {

        students.add("Ravi");
        students.add("Kiran");
    }

    public List<String> getStudents() {
        return students;
    }
}

public class Main {

    public static void main(String[] args) {

        StudentService service =
                new StudentService();

        List<String> students =
                service.getStudents();

        students.clear();

        System.out.println(
                service.getStudents()
        );
    }
}`
      },

      output: `[]`
    },

    {
      id: "safe-getter",
      title: "14. Safer Collection Getter",

      paragraphs: [
        "A class can protect its internal collection by returning an unmodifiable view or an immutable copy.",
        "List.copyOf() is useful when a stable unmodifiable snapshot is desired."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

class StudentService {

    private final List<String> students =
            new ArrayList<>();

    public StudentService() {

        students.add("Ravi");
        students.add("Kiran");
    }

    public List<String> getStudents() {
        return List.copyOf(students);
    }
}

public class Main {

    public static void main(String[] args) {

        StudentService service =
                new StudentService();

        List<String> students =
                service.getStudents();

        System.out.println(students);

        // students.add("Arun");
        // UnsupportedOperationException
    }
}`
      },

      output: `[Ravi, Kiran]`
    },

    {
      id: "null-values",
      title: "15. Null Values and Immutable Factory Methods",

      paragraphs: [
        "The collection factory methods List.of(), Set.of(), and Map.of() do not permit null elements, keys, or values.",
        "List.copyOf(), Set.copyOf(), and Map.copyOf() also reject null elements or entries.",
        "This is different from some mutable collection implementations that can allow null depending on the collection type."
      ],

      code: {
        language: "java",
        code: `import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> names =
                List.of(
                        "Ravi",
                        null
                );

        System.out.println(names);
    }
}`
      },

      output: `Exception in thread "main"
java.lang.NullPointerException`
    },

    {
      id: "nested-mutability",
      title: "16. Immutable Collection vs Mutable Elements",

      paragraphs: [
        "Making a collection unmodifiable does not automatically make the objects stored inside it immutable.",
        "If the collection contains mutable objects, those objects may still be changed through references to them."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayList;
import java.util.List;

class Student {

    private String name;

    public Student(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}

public class Main {

    public static void main(String[] args) {

        Student student =
                new Student("Ravi");

        List<Student> students =
                List.of(student);

        student.setName("Kiran");

        System.out.println(students);
    }
}`
      },

      output: `[Kiran]`
    },

    {
      id: "immutable-use-cases",
      title: "17. When Should You Use Immutable Collections?",

      paragraphs: [
        "Immutable collections are useful when data should remain unchanged after creation.",
        "They are particularly useful for constants, configuration data, fixed reference data, and APIs where callers should not modify returned collection contents."
      ],

      bullets: [
        "Application configuration.",
        "Fixed reference data.",
        "Constant lists or sets.",
        "Read-only API results.",
        "Data shared safely between components.",
        "Preventing accidental modification."
      ]
    },

    {
      id: "unmodifiable-use-cases",
      title: "18. When Should You Use Unmodifiable Views?",

      paragraphs: [
        "An unmodifiable view is useful when an existing mutable collection should be exposed without allowing the recipient to modify it directly.",
        "The original owner can still modify the underlying collection when that behavior is intentionally required."
      ],

      bullets: [
        "Expose a read-only view.",
        "Protect a collection from modification by callers.",
        "Allow the owning class to continue updating the original collection.",
        "Avoid unnecessary copying when a live view is desired."
      ]
    },

    {
      id: "important-points",
      title: "19. Important Points",

      bullets: [
        "Immutable collections cannot be modified after creation.",
        "List.of() creates an unmodifiable List.",
        "Set.of() creates an unmodifiable Set.",
        "Map.of() creates an unmodifiable Map.",
        "Collections.unmodifiableList() creates an unmodifiable view.",
        "An unmodifiable view reflects changes made to the underlying collection.",
        "List.copyOf() creates an unmodifiable copy rather than a live view.",
        "Set.copyOf() creates an unmodifiable copy.",
        "Map.copyOf() creates an unmodifiable copy.",
        "Factory methods such as List.of(), Set.of(), and Map.of() reject null values.",
        "copyOf() methods also reject null elements or entries.",
        "Unmodifiable collection does not mean that the objects stored inside are immutable.",
        "Defensive copies help protect internal collection state.",
        "Immutable collections are useful for fixed and read-only data.",
        "Unmodifiable views are useful when a live read-only view is required."
      ]
    },

    {
      id: "interview-questions",
      title: "20. Interview Questions",

      interviewQuestions: [
        {
          question: "What is an immutable collection?",
          answer:
            "An immutable collection is a collection whose contents cannot be changed after creation."
        },
        {
          question: "What is an unmodifiable collection?",
          answer:
            "An unmodifiable collection prevents modification through a particular reference or view."
        },
        {
          question: "What is the difference between immutable and unmodifiable collections?",
          answer:
            "An immutable collection itself cannot be changed, while an unmodifiable view can reflect changes made to its underlying collection through another reference."
        },
        {
          question: "What does List.of() return?",
          answer:
            "It returns an unmodifiable List containing the supplied elements."
        },
        {
          question: "What does Collections.unmodifiableList() do?",
          answer:
            "It returns an unmodifiable view of the supplied List."
        },
        {
          question: "Does unmodifiableList() create a copy?",
          answer:
            "No. It creates an unmodifiable view backed by the original List."
        },
        {
          question: "If the original List changes, will an unmodifiableList() view see the change?",
          answer:
            "Yes. Because the view is backed by the original List, changes made through another reference can be visible through the view."
        },
        {
          question: "What is List.copyOf()?",
          answer:
            "List.copyOf() creates an unmodifiable List containing the elements of the supplied collection."
        },
        {
          question: "What is the difference between List.copyOf() and Collections.unmodifiableList()?",
          answer:
            "List.copyOf() creates an unmodifiable copy whose contents do not track later changes to the source collection, while unmodifiableList() creates a live unmodifiable view."
        },
        {
          question: "Can List.of() contain null?",
          answer:
            "No. List.of() does not permit null elements."
        },
        {
          question: "Can Set.of() contain duplicate elements?",
          answer:
            "No. Set.of() rejects duplicate elements."
        },
        {
          question: "Can Map.of() contain null keys or values?",
          answer:
            "No. Map.of() does not permit null keys or values."
        },
        {
          question: "Does an immutable collection make its elements immutable?",
          answer:
            "No. The collection structure can be immutable while the objects stored inside it remain mutable."
        },
        {
          question: "What is a defensive copy?",
          answer:
            "A defensive copy is a separate copy of data created to prevent external code from modifying the original internal state."
        },
        {
          question: "Why are immutable collections useful?",
          answer:
            "They help prevent accidental modification and are useful for fixed, read-only, and shared data."
        },
        {
          question: "When would you use Collections.unmodifiableList()?",
          answer:
            "Use it when you want to expose a live read-only view while retaining the ability to modify the underlying collection through another reference."
        },
        {
          question: "When would you use List.copyOf()?",
          answer:
            "Use it when you want an unmodifiable snapshot of the current elements of a collection."
        }
      ]
    }
  ]
};