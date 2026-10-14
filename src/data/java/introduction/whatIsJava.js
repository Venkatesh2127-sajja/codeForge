export const whatIsJava = {
  id: "what-is-java",

  slug: "what-is-java",

  title: "What is Java?",

  topicTitle: "Introduction to Java",

  topicSlug: "introduction",

  description:
    "Learn what Java is, why it is widely used, and how Java programs run.",

  estimatedTime: "8 min",

  sections: [
    {
      id: "introduction",

      title: "Introduction to Java",

      paragraphs: [
        "Java is a high-level, object-oriented programming language used to build a wide variety of applications.",

        "Java was designed with the idea of writing code once and running it on different platforms. This is achieved through the Java Virtual Machine (JVM).",

        "Java is commonly used for backend applications, enterprise software, Android development, desktop applications, and many other systems."
      ]
    },

    {
      id: "why-java",

      title: "Why Learn Java?",

      paragraphs: [
        "Java has a large ecosystem and is widely used in enterprise software development.",

        "Its object-oriented programming model makes it suitable for building large and maintainable applications.",

        "Java also has a strong ecosystem around frameworks such as Spring and Spring Boot."
      ]
    },

    {
      id: "simple-java-program",

      title: "Simple Java Program",

      paragraphs: [
        "Let's look at a simple Java program that prints a message on the console.",

        "This example helps us understand the basic structure of a Java program."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        System.out.println("Hello, Java!");

    }
}`
      },

      output: "Hello, Java!"
    },

    {
      id: "understanding-program",

      title: "Understanding the Program",

      paragraphs: [
        "The public class Main statement defines a class named Main.",

        "The public static void main(String[] args) method is the entry point of a traditional Java application.",

        "The System.out.println() statement prints text to the console.",

        "In this example, the program prints Hello, Java!."
      ]
    },

    {
      id: "important-points",

      title: "Important Points",

      bullets: [
        "Java is a high-level programming language.",
        "Java follows object-oriented programming principles.",
        "Java programs are executed using the JVM.",
        "Java supports platform-independent execution through bytecode.",
        "Java provides a large standard library and ecosystem."
      ]
    }
  ]
};