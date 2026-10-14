export const optional = {
  id: "optional",
  title: "Optional",
  slug: "optional",
  topicTitle: "Java 8",
  estimatedTime: "45 min",

  description:
    "Learn Java 8 Optional, including how to create Optional objects, safely access values, provide default values, transform values, handle nested Optional values, filter values, and apply Optional best practices.",

  sections: [
    {
      id: "what-is-optional",
      title: "What is Optional?",

      paragraphs: [
        "Optional is a container object introduced in Java 8 that may contain a non-null value or may be empty.",
        "It is primarily used to represent the possible absence of a value and make such cases explicit in the API.",
        "Optional is commonly used when a method may or may not return a result."
      ],

      code: {
        language: "java",
        code: `import java.util.Optional;

public class Main {

    public static void main(String[] args) {

        Optional<String> name =
                Optional.of("Java");

        System.out.println(name);
    }
}`
      },

      output: `Optional[Java]`
    },

    {
      id: "why-optional",
      title: "Why Optional?",

      paragraphs: [
        "Before Java 8, methods commonly returned null when a value was not available. The caller then had to remember to perform a null check.",
        "Optional provides an explicit way to represent a value that may be present or absent.",
        "It does not eliminate NullPointerException from Java, but it provides APIs that encourage explicit handling of an absent value."
      ],

      code: {
        language: "java",
        code: `// Traditional approach

String name = findName();

if (name != null) {
    System.out.println(name);
}


// Optional approach

Optional<String> name =
        findOptionalName();

name.ifPresent(
        value -> System.out.println(value)
);`
      },

      bullets: [
        "Optional can represent presence or absence of a value.",
        "It encourages explicit handling of missing values.",
        "It can make some APIs easier to understand.",
        "Optional should not be treated as a replacement for every null value."
      ]
    },

    {
      id: "creating-optional",
      title: "Creating Optional",

      paragraphs: [
        "Java provides three common factory methods for creating Optional objects: of(), ofNullable(), and empty()."
      ],

      code: {
        language: "java",
        code: `String name = "Java";

Optional<String> value1 =
        Optional.of(name);

Optional<String> value2 =
        Optional.ofNullable(name);

Optional<String> value3 =
        Optional.empty();`
      }
    },

    {
      id: "of",
      title: "of()",

      paragraphs: [
        "Optional.of() creates an Optional containing a non-null value.",
        "If the supplied value is null, Optional.of() throws NullPointerException."
      ],

      code: {
        language: "java",
        code: `String name = "Java";

Optional<String> result =
        Optional.of(name);

System.out.println(result);`
      },

      output: `Optional[Java]`,

      bullets: [
        "Use of() when the value is known to be non-null.",
        "Passing null to of() causes NullPointerException."
      ]
    },

    {
      id: "of-null",
      title: "of() with null",

      code: {
        language: "java",
        code: `String name = null;

Optional<String> result =
        Optional.of(name);`
      },

      output: `Exception in thread "main" java.lang.NullPointerException`,

      paragraphs: [
        "Therefore, of() should not be used when the input value may be null."
      ]
    },

    {
      id: "of-nullable",
      title: "ofNullable()",

      paragraphs: [
        "Optional.ofNullable() creates an Optional containing the value when it is non-null. If the value is null, it creates an empty Optional instead."
      ],

      code: {
        language: "java",
        code: `String name = null;

Optional<String> result =
        Optional.ofNullable(name);

System.out.println(result);`
      },

      output: `Optional.empty`
    },

    {
      id: "empty",
      title: "empty()",

      paragraphs: [
        "Optional.empty() creates an Optional that contains no value."
      ],

      code: {
        language: "java",
        code: `Optional<String> result =
        Optional.empty();

System.out.println(result);`
      },

      output: `Optional.empty`
    },

    {
      id: "is-present",
      title: "isPresent()",

      paragraphs: [
        "isPresent() checks whether an Optional contains a value.",
        "It returns true when a value is present and false when the Optional is empty."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("Java");

if (name.isPresent()) {
    System.out.println(name.get());
}`
      },

      output: `Java`,

      bullets: [
        "Returns boolean.",
        "true → value is present.",
        "false → Optional is empty."
      ]
    },

    {
      id: "if-present",
      title: "ifPresent()",

      paragraphs: [
        "ifPresent() executes the supplied Consumer only when a value is present.",
        "It is often more expressive than manually checking isPresent() and then calling get()."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("Java");

name.ifPresent(
        value -> System.out.println(value)
);`
      },

      output: `Java`
    },

    {
      id: "get",
      title: "get()",

      paragraphs: [
        "get() returns the value contained inside the Optional.",
        "If the Optional is empty, get() throws NoSuchElementException."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("Java");

String value =
        name.get();

System.out.println(value);`
      },

      output: `Java`,

      bullets: [
        "get() should be used carefully.",
        "Calling get() on an empty Optional throws NoSuchElementException.",
        "Prefer safer alternatives when possible."
      ]
    },

    {
      id: "get-empty",
      title: "get() on an Empty Optional",

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.empty();

String value =
        name.get();`
      },

      output: `Exception in thread "main" java.util.NoSuchElementException: No value present`
    },

    {
      id: "or-else",
      title: "orElse()",

      paragraphs: [
        "orElse() returns the value when it is present. Otherwise, it returns the supplied default value."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.empty();

String result =
        name.orElse("Unknown");

System.out.println(result);`
      },

      output: `Unknown`
    },

    {
      id: "or-else-present",
      title: "orElse() with a Present Value",

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("Java");

String result =
        name.orElse("Unknown");

System.out.println(result);`
      },

      output: `Java`
    },

    {
      id: "or-else-get",
      title: "orElseGet()",

      paragraphs: [
        "orElseGet() returns the contained value when present. When the Optional is empty, it invokes a Supplier to generate the fallback value."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.empty();

String result =
        name.orElseGet(
                () -> "Default Name"
        );

System.out.println(result);`
      },

      output: `Default Name`
    },

    {
      id: "or-else-vs-or-else-get",
      title: "orElse() vs orElseGet()",

      paragraphs: [
        "A common interview topic is the difference between orElse() and orElseGet().",
        "The expression supplied to orElse() is evaluated even when the Optional contains a value. orElseGet() receives a Supplier and invokes it only when the Optional is empty."
      ],

      code: {
        language: "java",
        code: `public static String createDefault() {

    System.out.println("Creating default");

    return "Default";
}

Optional<String> value =
        Optional.of("Java");

String result =
        value.orElse(createDefault());

// createDefault() is evaluated.

String result2 =
        value.orElseGet(
                Main::createDefault
        );

// Supplier is not invoked because
// the value is already present.`
      },

      bullets: [
        "orElse() receives a value.",
        "orElseGet() receives a Supplier.",
        "orElseGet() is useful when producing the fallback value has a cost.",
        "Do not choose between them solely by habit; consider the fallback expression."
      ]
    },

    {
      id: "or-else-throw",
      title: "orElseThrow()",

      paragraphs: [
        "orElseThrow() returns the value when present. If the Optional is empty, it throws an exception.",
        "A Supplier can be supplied when a specific exception should be created."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.empty();

String result =
        name.orElseThrow(
                () -> new IllegalArgumentException(
                        "Name is required"
                )
        );`
      },

      output: `Exception in thread "main" java.lang.IllegalArgumentException: Name is required`
    },

    {
      id: "map",
      title: "map()",

      paragraphs: [
        "Optional.map() transforms the value inside an Optional when a value is present.",
        "The mapping function is not executed when the Optional is empty.",
        "The result remains an Optional."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("java");

Optional<String> result =
        name.map(String::toUpperCase);

System.out.println(result);`
      },

      output: `Optional[JAVA]`
    },

    {
      id: "map-chain",
      title: "Chaining map() Operations",

      paragraphs: [
        "Multiple transformations can be chained using map()."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("java");

Optional<Integer> result =
        name.map(String::toUpperCase)
            .map(String::length);

System.out.println(result);`
      },

      output: `Optional[4]`
    },

    {
      id: "flat-map",
      title: "flatMap()",

      paragraphs: [
        "Optional.flatMap() is used when the mapping function itself returns an Optional.",
        "It prevents the creation of a nested Optional such as Optional<Optional<T>>."
      ],

      code: {
        language: "java",
        code: `Optional<String> name =
        Optional.of("Java");

Optional<String> result =
        name.flatMap(
                value ->
                        Optional.of(value.toUpperCase())
        );

System.out.println(result);`
      },

      output: `Optional[JAVA]`
    },

    {
      id: "map-vs-flat-map",
      title: "map() vs flatMap()",

      code: {
        language: "java",
        code: `// map()

Optional<Optional<String>> nested =
        Optional.of("Java")
                .map(
                    value ->
                        Optional.of(
                            value.toUpperCase()
                        )
                );


// flatMap()

Optional<String> result =
        Optional.of("Java")
                .flatMap(
                    value ->
                        Optional.of(
                            value.toUpperCase()
                        )
                );`
      },

      bullets: [
        "map() is used when the mapping function returns a normal value.",
        "flatMap() is used when the mapping function already returns Optional.",
        "flatMap() avoids nested Optional structures."
      ]
    },

    {
      id: "filter",
      title: "filter()",

      paragraphs: [
        "Optional.filter() keeps the value only when it satisfies the supplied Predicate.",
        "If the predicate returns false, the result becomes an empty Optional."
      ],

      code: {
        language: "java",
        code: `Optional<Integer> age =
        Optional.of(25);

Optional<Integer> result =
        age.filter(
                value -> value >= 18
        );

System.out.println(result);`
      },

      output: `Optional[25]`
    },

    {
      id: "filter-false",
      title: "filter() When the Condition Fails",

      code: {
        language: "java",
        code: `Optional<Integer> age =
        Optional.of(15);

Optional<Integer> result =
        age.filter(
                value -> value >= 18
        );

System.out.println(result);`
      },

      output: `Optional.empty`
    },

    {
      id: "optional-with-objects",
      title: "Optional with Objects",

      paragraphs: [
        "Optional is often useful when a service or repository operation may not find an object."
      ],

      code: {
        language: "java",
        code: `class User {

    private String name;

    User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public static Optional<User> findUser() {

    User user = new User("Rahul");

    return Optional.of(user);
}

public static void main(String[] args) {

    findUser()
        .map(User::getName)
        .ifPresent(
            System.out::println
        );
}`
      },

      output: `Rahul`
    },

    {
      id: "optional-service-layer",
      title: "Optional in Service Layer",

      paragraphs: [
        "A common backend use case is returning Optional from a repository or lookup method when an entity may not exist.",
        "The service layer can then explicitly handle the absent-value case."
      ],

      code: {
        language: "java",
        code: `public User getUser(Long id) {

    return userRepository
            .findById(id)
            .orElseThrow(
                () -> new RuntimeException(
                    "User not found"
                )
            );
}`
      },

      bullets: [
        "Repository methods such as findById() commonly return Optional.",
        "The service layer can convert an absent value into an application-specific exception.",
        "The controller can then return an appropriate API response through the application's exception handling mechanism."
      ]
    },

    {
      id: "optional-best-practices",
      title: "Optional Best Practices",

      bullets: [
        "Use Optional when absence of a return value is a meaningful part of the API contract.",
        "Prefer ofNullable() when an input value may be null.",
        "Use of() when the value is guaranteed to be non-null.",
        "Avoid blindly calling get().",
        "Prefer orElse(), orElseGet(), orElseThrow(), ifPresent(), map(), and other appropriate operations.",
        "Use orElseGet() when creating the fallback value is expensive or has side effects.",
        "Do not use Optional as a replacement for every field that might be null.",
        "Avoid unnecessary Optional wrapping and unwrapping.",
        "Avoid using Optional as a method parameter unless there is a specific API-design reason.",
        "Optional is generally most useful as a return type.",
        "Do not use Optional simply to make code look more modern.",
        "Keep Optional chains readable."
      ]
    },

    {
      id: "optional-complete-example",
      title: "Complete Optional Example",

      paragraphs: [
        "The following example combines several Optional operations into one readable pipeline."
      ],

      code: {
        language: "java",
        code: `Optional<String> username =
        Optional.ofNullable("venkatesh");

String result =
        username
            .filter(name -> !name.isEmpty())
            .map(String::toUpperCase)
            .orElse("UNKNOWN");

System.out.println(result);`
      },

      output: `VENKATESH`
    },

    {
      id: "optional-flow",
      title: "Optional Flow",

      code: {
        language: "text",
        code: `Value
  ↓
Optional.of()
or
Optional.ofNullable()
  ↓
Is value present?
  │
  ├── Yes
  │    ├── map()
  │    ├── flatMap()
  │    ├── filter()
  │    └── ifPresent()
  │
  └── No
       ├── orElse()
       ├── orElseGet()
       └── orElseThrow()`
      },

      paragraphs: [
        "The main idea is to keep the presence-or-absence decision explicit while transforming or consuming the value."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Optional was introduced in Java 8.",
        "Optional can contain one non-null value or be empty.",
        "Optional.of() should be used with a known non-null value.",
        "Optional.ofNullable() can handle a potentially null value.",
        "Optional.empty() creates an empty Optional.",
        "isPresent() checks whether a value exists.",
        "ifPresent() performs an action when a value exists.",
        "get() retrieves the value but throws NoSuchElementException when empty.",
        "orElse() provides a fallback value.",
        "orElseGet() provides a fallback through a Supplier.",
        "orElseThrow() throws an exception when the value is absent.",
        "map() transforms the contained value.",
        "flatMap() is useful when the mapping function returns Optional.",
        "filter() keeps the value only when a condition is satisfied.",
        "Optional is commonly used with repository and service-layer operations.",
        "Optional is not a universal replacement for null."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "What is Optional in Java 8?",
          answer:
            "Optional is a container object that may contain a non-null value or may be empty. It is used to explicitly represent the possible absence of a value."
        },
        {
          question: "Why was Optional introduced?",
          answer:
            "Optional was introduced to provide an explicit API for representing potentially absent values and to encourage safer handling of such cases."
        },
        {
          question: "What is the difference between of() and ofNullable()?",
          answer:
            "of() expects a non-null value and throws NullPointerException for null. ofNullable() accepts null and creates an empty Optional when the value is null."
        },
        {
          question: "What does Optional.empty() do?",
          answer:
            "It creates an Optional that contains no value."
        },
        {
          question: "What is the difference between isPresent() and ifPresent()?",
          answer:
            "isPresent() returns a boolean indicating whether a value exists. ifPresent() executes a Consumer when a value exists."
        },
        {
          question: "Why should get() be used carefully?",
          answer:
            "get() throws NoSuchElementException when the Optional is empty, so safer alternatives such as orElse(), orElseGet(), orElseThrow(), or ifPresent() are often preferable."
        },
        {
          question: "What is the difference between orElse() and orElseGet()?",
          answer:
            "orElse() receives a fallback value, while orElseGet() receives a Supplier that produces the fallback value when the Optional is empty."
        },
        {
          question: "What is orElseThrow()?",
          answer:
            "orElseThrow() returns the contained value when present and throws an exception when the Optional is empty."
        },
        {
          question: "What is Optional.map()?",
          answer:
            "map() transforms the value inside an Optional when present and returns another Optional containing the transformed value."
        },
        {
          question: "What is Optional.flatMap()?",
          answer:
            "flatMap() is used when the mapping function already returns an Optional, preventing nested Optional structures."
        },
        {
          question: "What is Optional.filter()?",
          answer:
            "filter() keeps the Optional value only when the supplied Predicate returns true. Otherwise, it returns an empty Optional."
        },
        {
          question: "Can Optional contain null?",
          answer:
            "An Optional itself does not contain a null value. Optional.ofNullable(null) produces Optional.empty()."
        },
        {
          question: "Where is Optional commonly used in Spring Boot applications?",
          answer:
            "It is commonly encountered when repository methods such as findById() return a value that may not exist. The service layer can handle the empty case using operations such as orElseThrow()."
        },
        {
          question: "Should Optional be used everywhere instead of null?",
          answer:
            "No. Optional is intended for specific API-design situations, particularly return values where absence is meaningful. It should not automatically replace every nullable value."
        },
        {
          question: "What is the difference between Optional and a null reference?",
          answer:
            "null directly represents the absence of a reference, while Optional explicitly models the possibility of absence through an API with operations for handling the value."
        }
      ]
    }
  ]
};