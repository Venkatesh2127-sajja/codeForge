export const strings = {
  id: "strings",
  slug: "strings",
  title: "Strings in Java",
  topicTitle: "Java Basics",
  topicSlug: "basics",
  description:
    "Learn how Strings work in Java, including String creation, common methods, comparison, searching, substring operations, splitting, immutability, and practical programming examples.",
  estimatedTime: "40 min",

  sections: [

    // =====================================================
    // 1. INTRODUCTION
    // =====================================================
    {
      id: "introduction",
      title: "Introduction to Strings",

      paragraphs: [
        "A String in Java is a sequence of characters.",
        "Strings are used to store and work with text such as names, messages, addresses, usernames, and descriptions.",
        "In Java, String is a class available in the java.lang package, so it does not need to be imported explicitly."
      ],

      code: {
        language: "java",
        code: `String name = "Venkatesh";

System.out.println(name);`
      },

      output: "Venkatesh",

      bullets: [
        "String is a class in Java.",
        "Strings are used to represent text.",
        "String literals are written using double quotes.",
        "String objects are immutable."
      ]
    },

    // =====================================================
    // 2. STRING CREATION
    // =====================================================
    {
      id: "string-creation",
      title: "Creating a String",

      paragraphs: [
        "There are multiple ways to create a String in Java.",
        "The most common approach is to assign a string literal to a String variable."
      ],

      code: {
        language: "java",
        code: `String name = "Java";

System.out.println(name);`
      },

      output: "Java"
    },

    // =====================================================
    // 3. STRING USING NEW
    // =====================================================
    {
      id: "string-using-new",
      title: "Creating String Using new",

      paragraphs: [
        "A String can also be created explicitly using the new keyword."
      ],

      code: {
        language: "java",
        code: `String name = new String("Java");

System.out.println(name);`
      },

      output: "Java",

      bullets: [
        "String literals are generally preferred for ordinary String creation.",
        "Using new explicitly creates a String object."
      ]
    },

    // =====================================================
    // 4. STRING LENGTH
    // =====================================================
    {
      id: "string-length",
      title: "Finding String Length",

      paragraphs: [
        "The length() method returns the number of characters in a String."
      ],

      code: {
        language: "java",
        code: `String name = "Java";

System.out.println(name.length());`
      },

      output: "4"
    },

    // =====================================================
    // 5. CHAR AT
    // =====================================================
    {
      id: "char-at",
      title: "charAt()",

      paragraphs: [
        "The charAt() method returns the character at a specified index.",
        "String indexes start from 0."
      ],

      code: {
        language: "java",
        code: `String language = "Java";

System.out.println(language.charAt(0));
System.out.println(language.charAt(2));`
      },

      output: `J
v`
    },

    // =====================================================
    // 6. TO UPPER CASE
    // =====================================================
    {
      id: "to-upper-case",
      title: "toUpperCase()",

      paragraphs: [
        "The toUpperCase() method converts all alphabetic characters in a String to uppercase."
      ],

      code: {
        language: "java",
        code: `String name = "java";

String result = name.toUpperCase();

System.out.println(result);`
      },

      output: "JAVA"
    },

    // =====================================================
    // 7. TO LOWER CASE
    // =====================================================
    {
      id: "to-lower-case",
      title: "toLowerCase()",

      paragraphs: [
        "The toLowerCase() method converts all alphabetic characters in a String to lowercase."
      ],

      code: {
        language: "java",
        code: `String name = "JAVA";

String result = name.toLowerCase();

System.out.println(result);`
      },

      output: "java"
    },

    // =====================================================
    // 8. TRIM
    // =====================================================
    {
      id: "trim",
      title: "trim()",

      paragraphs: [
        "The trim() method removes leading and trailing whitespace from a String."
      ],

      code: {
        language: "java",
        code: `String name = "   Java   ";

String result = name.trim();

System.out.println(result);`
      },

      output: "Java"
    },

    // =====================================================
    // 9. STRIP
    // =====================================================
    {
      id: "strip",
      title: "strip()",

      paragraphs: [
        "The strip() method removes leading and trailing whitespace and provides Unicode-aware whitespace handling.",
        "It is available in modern Java versions."
      ],

      code: {
        language: "java",
        code: `String name = "   Java   ";

String result = name.strip();

System.out.println(result);`
      },

      output: "Java"
    },

    // =====================================================
    // 10. IS EMPTY
    // =====================================================
    {
      id: "is-empty",
      title: "isEmpty()",

      paragraphs: [
        "The isEmpty() method checks whether a String contains zero characters."
      ],

      code: {
        language: "java",
        code: `String value = "";

System.out.println(value.isEmpty());`
      },

      output: "true"
    },

    // =====================================================
    // 11. IS BLANK
    // =====================================================
    {
      id: "is-blank",
      title: "isBlank()",

      paragraphs: [
        "The isBlank() method checks whether a String is empty or contains only whitespace."
      ],

      code: {
        language: "java",
        code: `String value = "   ";

System.out.println(value.isBlank());`
      },

      output: "true"
    },

    // =====================================================
    // 12. EQUALS
    // =====================================================
    {
      id: "equals",
      title: "equals()",

      paragraphs: [
        "The equals() method compares the contents of two String objects.",
        "It returns true when the String contents are equal."
      ],

      code: {
        language: "java",
        code: `String first = "Java";
String second = "Java";

System.out.println(first.equals(second));`
      },

      output: "true"
    },

    // =====================================================
    // 13. EQUALS IGNORE CASE
    // =====================================================
    {
      id: "equals-ignore-case",
      title: "equalsIgnoreCase()",

      paragraphs: [
        "The equalsIgnoreCase() method compares two Strings without considering differences in letter case."
      ],

      code: {
        language: "java",
        code: `String first = "Java";
String second = "JAVA";

System.out.println(
    first.equalsIgnoreCase(second)
);`
      },

      output: "true"
    },

    // =====================================================
    // 14. STRING == VS EQUALS
    // =====================================================
    {
      id: "string-comparison",
      title: "== vs equals()",

      paragraphs: [
        "When comparing Strings, == and equals() have different purposes.",
        "The == operator compares object references, while equals() compares the contents of the Strings."
      ],

      code: {
        language: "java",
        code: `String first = new String("Java");
String second = new String("Java");

System.out.println(first == second);
System.out.println(first.equals(second));`
      },

      output: `false
true`
    },

    // =====================================================
    // 15. COMPARE TO
    // =====================================================
    {
      id: "compare-to",
      title: "compareTo()",

      paragraphs: [
        "The compareTo() method compares two Strings lexicographically.",
        "It returns 0 when the Strings are equal, a negative value when the first String comes before the second, and a positive value when the first String comes after the second."
      ],

      code: {
        language: "java",
        code: `String first = "Apple";
String second = "Banana";

System.out.println(
    first.compareTo(second)
);`
      },

      output:
        "A negative value"
    },

    // =====================================================
    // 16. CONTAINS
    // =====================================================
    {
      id: "contains",
      title: "contains()",

      paragraphs: [
        "The contains() method checks whether a String contains a specified sequence of characters."
      ],

      code: {
        language: "java",
        code: `String message = "Welcome to Java";

System.out.println(
    message.contains("Java")
);`
      },

      output: "true"
    },

    // =====================================================
    // 17. STARTS WITH
    // =====================================================
    {
      id: "starts-with",
      title: "startsWith()",

      paragraphs: [
        "The startsWith() method checks whether a String begins with a specified prefix."
      ],

      code: {
        language: "java",
        code: `String language = "Java Programming";

System.out.println(
    language.startsWith("Java")
);`
      },

      output: "true"
    },

    // =====================================================
    // 18. ENDS WITH
    // =====================================================
    {
      id: "ends-with",
      title: "endsWith()",

      paragraphs: [
        "The endsWith() method checks whether a String ends with a specified suffix."
      ],

      code: {
        language: "java",
        code: `String fileName = "resume.pdf";

System.out.println(
    fileName.endsWith(".pdf")
);`
      },

      output: "true"
    },

    // =====================================================
    // 19. INDEX OF
    // =====================================================
    {
      id: "index-of",
      title: "indexOf()",

      paragraphs: [
        "The indexOf() method returns the index of the first occurrence of a specified character or substring.",
        "If the value is not found, it returns -1."
      ],

      code: {
        language: "java",
        code: `String text = "Java Programming";

System.out.println(
    text.indexOf("Java")
);

System.out.println(
    text.indexOf("Python")
);`
      },

      output: `0
-1`
    },

    // =====================================================
    // 20. LAST INDEX OF
    // =====================================================
    {
      id: "last-index-of",
      title: "lastIndexOf()",

      paragraphs: [
        "The lastIndexOf() method returns the index of the last occurrence of a character or substring."
      ],

      code: {
        language: "java",
        code: `String text = "Java Java";

System.out.println(
    text.lastIndexOf("Java")
);`
      },

      output: "5"
    },

    // =====================================================
    // 21. SEARCH CHARACTER
    // =====================================================
    {
      id: "search-character",
      title: "Searching for a Character",

      paragraphs: [
        "indexOf() can also be used to search for a specific character."
      ],

      code: {
        language: "java",
        code: `String name = "Venkatesh";

int index = name.indexOf('e');

System.out.println(index);`
      },

      output: "1"
    },

    // =====================================================
    // 22. SUBSTRING
    // =====================================================
    {
      id: "substring",
      title: "substring()",

      paragraphs: [
        "The substring() method is used to extract part of a String.",
        "The first form takes a starting index and returns characters from that index to the end."
      ],

      code: {
        language: "java",
        code: `String text = "Java Programming";

String result = text.substring(5);

System.out.println(result);`
      },

      output: "Programming"
    },

    // =====================================================
    // 23. SUBSTRING RANGE
    // =====================================================
    {
      id: "substring-range",
      title: "substring() with Start and End Index",

      paragraphs: [
        "The substring(start, end) form extracts characters starting from start and stopping before end."
      ],

      code: {
        language: "java",
        code: `String text = "Java Programming";

String result = text.substring(0, 4);

System.out.println(result);`
      },

      output: "Java",

      bullets: [
        "The start index is inclusive.",
        "The end index is exclusive."
      ]
    },

    // =====================================================
    // 24. REPLACE
    // =====================================================
    {
      id: "replace",
      title: "replace()",

      paragraphs: [
        "The replace() method creates a new String with matching characters or character sequences replaced."
      ],

      code: {
        language: "java",
        code: `String text = "Java is easy";

String result = text.replace(
    "easy",
    "powerful"
);

System.out.println(result);`
      },

      output: "Java is powerful"
    },

    // =====================================================
    // 25. REPLACE FIRST
    // =====================================================
    {
      id: "replace-first",
      title: "replaceFirst()",

      paragraphs: [
        "The replaceFirst() method replaces the first substring that matches a regular expression."
      ],

      code: {
        language: "java",
        code: `String text = "Java Java";

String result = text.replaceFirst(
    "Java",
    "Python"
);

System.out.println(result);`
      },

      output: "Python Java"
    },

    // =====================================================
    // 26. REPLACE ALL
    // =====================================================
    {
      id: "replace-all",
      title: "replaceAll()",

      paragraphs: [
        "The replaceAll() method replaces every substring that matches a regular expression."
      ],

      code: {
        language: "java",
        code: `String text = "Java Java Java";

String result = text.replaceAll(
    "Java",
    "Python"
);

System.out.println(result);`
      },

      output: "Python Python Python"
    },

    // =====================================================
    // 27. CONCAT
    // =====================================================
    {
      id: "concat",
      title: "concat()",

      paragraphs: [
        "The concat() method joins one String to the end of another String."
      ],

      code: {
        language: "java",
        code: `String firstName = "Java";
String result = firstName.concat(" Programming");

System.out.println(result);`
      },

      output: "Java Programming"
    },

    // =====================================================
    // 28. SPLIT
    // =====================================================
    {
      id: "split",
      title: "split()",

      paragraphs: [
        "The split() method divides a String into an array of Strings based on a delimiter or regular expression."
      ],

      code: {
        language: "java",
        code: `String text = "Java,Spring,React";

String[] technologies =
    text.split(",");

for (String technology : technologies) {
    System.out.println(technology);
}`
      },

      output: `Java
Spring
React`
    },

    // =====================================================
    // 29. SPLIT BY SPACE
    // =====================================================
    {
      id: "split-by-space",
      title: "Splitting a Sentence",

      paragraphs: [
        "A sentence can be split into individual words using whitespace as the delimiter."
      ],

      code: {
        language: "java",
        code: `String sentence = "Java is powerful";

String[] words = sentence.split(" ");

for (String word : words) {
    System.out.println(word);
}`
      },

      output: `Java
is
powerful`
    },

    // =====================================================
    // 30. JOIN
    // =====================================================
    {
      id: "string-join",
      title: "String.join()",

      paragraphs: [
        "String.join() can be used to combine multiple strings using a delimiter."
      ],

      code: {
        language: "java",
        code: `String result = String.join(
    ", ",
    "Java",
    "Spring Boot",
    "React"
);

System.out.println(result);`
      },

      output: "Java, Spring Boot, React"
    },

    // =====================================================
    // 31. IMMUTABILITY
    // =====================================================
    {
      id: "string-immutability",
      title: "String Immutability",

      paragraphs: [
        "Strings in Java are immutable.",
        "This means that once a String object is created, its contents cannot be changed.",
        "Methods such as toUpperCase(), replace(), and substring() return a new String rather than modifying the original String."
      ],

      code: {
        language: "java",
        code: `String text = "java";

text.toUpperCase();

System.out.println(text);`
      },

      output: "java"
    },

    // =====================================================
    // 32. IMMUTABILITY CORRECT VERSION
    // =====================================================
    {
      id: "immutability-correct",
      title: "Working with Immutable Strings",

      paragraphs: [
        "If we want to store the result of a String operation, we need to assign the returned String to a variable."
      ],

      code: {
        language: "java",
        code: `String text = "java";

text = text.toUpperCase();

System.out.println(text);`
      },

      output: "JAVA"
    },

    // =====================================================
    // 33. STRING CONCATENATION
    // =====================================================
    {
      id: "string-concatenation",
      title: "String Concatenation",

      paragraphs: [
        "Strings can be combined using the + operator."
      ],

      code: {
        language: "java",
        code: `String firstName = "Venkatesh";
String lastName = "Kumar";

String fullName =
    firstName + " " + lastName;

System.out.println(fullName);`
      },

      output: "Venkatesh Kumar"
    },

    // =====================================================
    // 34. PRACTICAL USERNAME VALIDATION
    // =====================================================
    {
      id: "username-validation",
      title: "Practical Example: Username Validation",

      paragraphs: [
        "String methods can be combined to perform simple validation."
      ],

      code: {
        language: "java",
        code: `String username = "admin";

if (!username.isBlank()
        && username.length() >= 5) {

    System.out.println("Valid username");

} else {

    System.out.println("Invalid username");
}`
      },

      output: "Valid username"
    },

    // =====================================================
    // 35. PRACTICAL EMAIL CHECK
    // =====================================================
    {
      id: "email-validation",
      title: "Practical Example: Basic Email Check",

      paragraphs: [
        "Methods such as contains() can be used for simple checks. This is only a basic example and is not a complete email validation solution."
      ],

      code: {
        language: "java",
        code: `String email = "user@example.com";

if (email.contains("@")) {
    System.out.println("Email contains @");
} else {
    System.out.println("Invalid email");
}`
      },

      output: "Email contains @"
    },

    // =====================================================
    // 36. COUNT CHARACTERS
    // =====================================================
    {
      id: "count-character",
      title: "Practical Example: Count a Character",

      paragraphs: [
        "We can use charAt() and a loop to count how many times a character occurs in a String."
      ],

      code: {
        language: "java",
        code: `String text = "banana";

char target = 'a';

int count = 0;

for (int i = 0; i < text.length(); i++) {

    if (text.charAt(i) == target) {
        count++;
    }
}

System.out.println(count);`
      },

      output: "3"
    },

    // =====================================================
    // 37. REVERSE STRING
    // =====================================================
    {
      id: "reverse-string",
      title: "Practical Example: Reverse a String",

      paragraphs: [
        "A String can be reversed by traversing its characters from the last index to the first."
      ],

      code: {
        language: "java",
        code: `String text = "Java";

String reversed = "";

for (int i = text.length() - 1; i >= 0; i--) {
    reversed += text.charAt(i);
}

System.out.println(reversed);`
      },

      output: "avaJ"
    },

    // =====================================================
    // 38. PALINDROME
    // =====================================================
    {
      id: "palindrome",
      title: "Practical Example: Check Palindrome",

      paragraphs: [
        "A palindrome is a String that reads the same forward and backward.",
        "For example, madam is a palindrome."
      ],

      code: {
        language: "java",
        code: `String text = "madam";

String reversed = "";

for (int i = text.length() - 1; i >= 0; i--) {
    reversed += text.charAt(i);
}

if (text.equals(reversed)) {
    System.out.println("Palindrome");
} else {
    System.out.println("Not Palindrome");
}`
      },

      output: "Palindrome"
    },

    // =====================================================
    // 39. REMOVE SPACES
    // =====================================================
    {
      id: "remove-spaces",
      title: "Practical Example: Remove Spaces",

      paragraphs: [
        "The replace() method can be used to remove spaces from a String."
      ],

      code: {
        language: "java",
        code: `String text = "Java is powerful";

String result = text.replace(" ", "");

System.out.println(result);`
      },

      output: "Javaispowerful"
    },

    // =====================================================
    // 40. PRACTICAL NAME EXAMPLE
    // =====================================================
    {
      id: "name-formatting",
      title: "Practical Example: Format a Name",

      paragraphs: [
        "String methods can be combined to clean and format user input."
      ],

      code: {
        language: "java",
        code: `String name = "   venkatesh   ";

name = name.trim();

name = name.toUpperCase();

System.out.println(name);`
      },

      output: "VENKATESH"
    },

    // =====================================================
    // 41. COMMON MISTAKES
    // =====================================================
    {
      id: "common-mistakes",
      title: "Common Mistakes",

      paragraphs: [
        "Beginners commonly make mistakes when working with Strings."
      ],

      bullets: [
        "Using == instead of equals() to compare String contents.",
        "Forgetting that String indexes start from 0.",
        "Trying to access a character outside the valid index range.",
        "Assuming String methods modify the original String.",
        "Forgetting that substring() uses an exclusive end index.",
        "Using split() without understanding that its argument is a regular expression.",
        "Calling methods on a null String reference.",
        "Confusing length with length()."
      ]
    },

    // =====================================================
    // 42. NULL STRING
    // =====================================================
    {
      id: "null-string",
      title: "Null String Reference",

      paragraphs: [
        "A String variable can contain null, which means it does not currently refer to a String object.",
        "Calling a String method on a null reference causes a NullPointerException."
      ],

      code: {
        language: "java",
        code: `String name = null;

System.out.println(name.length());`
      },

      output: "NullPointerException"
    },

    // =====================================================
    // 43. NULL SAFE CHECK
    // =====================================================
    {
      id: "null-safe-string-check",
      title: "Checking for null",

      paragraphs: [
        "Before calling methods on a potentially null String, check whether the reference is null."
      ],

      code: {
        language: "java",
        code: `String name = null;

if (name != null) {
    System.out.println(name.length());
} else {
    System.out.println("Name is null");
}`
      },

      output: "Name is null"
    },

    // =====================================================
    // 44. KEY POINTS
    // =====================================================
    {
      id: "key-points",
      title: "Key Points",

      bullets: [
        "String is a class in Java used to represent text.",
        "String literals are written using double quotes.",
        "String indexes start from 0.",
        "length() returns the number of characters.",
        "charAt() returns a character at a specified index.",
        "equals() compares String contents.",
        "equalsIgnoreCase() compares contents without considering case.",
        "contains() checks whether a String contains a sequence.",
        "indexOf() finds the first occurrence of a character or substring.",
        "substring() extracts part of a String.",
        "split() divides a String into an array of Strings.",
        "String objects are immutable.",
        "String methods generally return new String objects rather than modifying the original.",
        "Use null checks before calling methods on potentially null references."
      ]
    },

    // =====================================================
    // 45. INTERVIEW QUESTIONS
    // =====================================================
    {
      id: "interview-questions",
      title: "Strings: Interview Questions",

      interviewQuestions: [
        {
          question: "What is a String in Java?",
          answer:
            "String is a class in Java used to represent a sequence of characters. It belongs to the java.lang package."
        },
        {
          question: "Are Strings mutable or immutable in Java?",
          answer:
            "Strings are immutable. Once a String object is created, its contents cannot be changed. String operations generally return new String objects."
        },
        {
          question: "What is the difference between == and equals() for Strings?",
          answer:
            "== compares object references, while equals() compares the contents of the String objects."
        },
        {
          question: "How do you find the length of a String?",
          answer:
            "Use the length() method, for example: name.length()."
        },
        {
          question: "What does charAt() do?",
          answer:
            "charAt() returns the character at a specified index in a String."
        },
        {
          question: "What is the difference between substring(2) and substring(2, 5)?",
          answer:
            "substring(2) returns characters from index 2 to the end. substring(2, 5) returns characters from index 2 up to, but not including, index 5."
        },
        {
          question: "What does indexOf() return when a value is not found?",
          answer:
            "indexOf() returns -1 when the specified character or substring is not found."
        },
        {
          question: "What is the difference between equals() and equalsIgnoreCase()?",
          answer:
            "equals() considers character case, while equalsIgnoreCase() compares the String contents without considering case differences."
        },
        {
          question: "What is the purpose of split()?",
          answer:
            "split() divides a String into an array of Strings based on a delimiter or regular expression."
        },
        {
          question: "Why are Strings immutable in Java?",
          answer:
            "String immutability provides benefits such as safe sharing, predictable behavior, and compatibility with the String pool. It also means String values cannot be changed after creation."
        },
        {
          question: "What happens when you call a method on a null String reference?",
          answer:
            "Calling a method on a null String reference causes a NullPointerException."
        },
        {
          question: "What is the difference between String and char?",
          answer:
            "char represents a single 16-bit Unicode character, while String represents a sequence of characters."
        }
      ]
    }
  ]
};