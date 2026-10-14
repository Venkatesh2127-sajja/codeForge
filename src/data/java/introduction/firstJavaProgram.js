export const firstJavaProgram = {
  id: "first-java-program",
  slug: "first-java-program",

  title: "First Java Program",

  topicTitle: "Introduction to Java",

  topicSlug: "introduction",

  description:
    "Write your first Java program and understand how each part of the program works.",

  estimatedTime: "15 min",

  sections: [
    {
      id: "introduction",

      title: "Writing Your First Java Program",

      paragraphs: [
        "In this lesson, we will create a simple Java program that prints a message to the console."
      ]
    },

    {
      id: "program",

      title: "Java Program",

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        System.out.println("Welcome to CodeForge!");

    }
}`
      },

      output: "Welcome to CodeForge!"
    },

    {
      id: "class",

      title: "Understanding the Class",

      paragraphs: [
        "A Java program can contain one or more classes.",

        "In our example, Main is the name of the class."
      ],

      code: {
        language: "java",

        code: `public class Main {

}`
      }
    },

    {
      id: "main-method",

      title: "Understanding the main Method",

      paragraphs: [
        "The main method is the entry point of a traditional Java application.",

        "When the Java application starts, the JVM looks for the main method and begins execution from there."
      ],

      code: {
        language: "java",

        code: `public static void main(String[] args) {

    // Program execution starts here

}`
      }
    },

    {
      id: "println",

      title: "Understanding System.out.println()",

      paragraphs: [
        "System.out.println() is used to print information to the console.",

        "In our example, it prints Welcome to CodeForge!."
      ],

      code: {
        language: "java",

        code: `System.out.println("Welcome to CodeForge!");`
      },

      output: "Welcome to CodeForge!"
    },

    {
      id: "complete-program",

      title: "Complete Program",

      paragraphs: [
        "Putting everything together, our complete Java program looks like this:"
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        System.out.println("Welcome to CodeForge!");

    }
}`
      }
    }
  ]
};