export const jdkJreJvm = {
  id: "jdk-jre-jvm",
  slug: "jdk-jre-jvm",

  title: "JDK vs JRE vs JVM",

  topicTitle: "Introduction to Java",

  topicSlug: "introduction",

  description:
    "Understand the difference between JDK, JRE and JVM and how they work together.",

  estimatedTime: "15 min",

  sections: [
    {
      id: "introduction",

      title: "JDK, JRE and JVM",

      paragraphs: [
        "JDK, JRE and JVM are three important terms in the Java ecosystem.",

        "They have different responsibilities, but they work together to develop and run Java applications."
      ]
    },

    {
      id: "jvm",

      title: "What is JVM?",

      paragraphs: [
        "JVM stands for Java Virtual Machine.",

        "The JVM is responsible for executing Java bytecode.",

        "It provides the runtime environment required to execute Java applications."
      ]
    },

    {
      id: "jre",

      title: "What is JRE?",

      paragraphs: [
        "JRE stands for Java Runtime Environment.",

        "It provides the components required to run Java applications.",

        "Conceptually, the JRE consists of the JVM and the runtime libraries required by the application."
      ]
    },

    {
      id: "jdk",

      title: "What is JDK?",

      paragraphs: [
        "JDK stands for Java Development Kit.",

        "It provides the tools required to develop Java applications, including the Java compiler and other development tools."
      ]
    },

    {
      id: "comparison",

      title: "JDK vs JRE vs JVM",

      code: {
        language: "text",

        code: `JDK
 |
 +-- Development Tools
 |
 +-- JRE
      |
      +-- Runtime Libraries
      |
      +-- JVM
           |
           +-- Executes Bytecode`
      }
    },

    {
      id: "compilation",

      title: "How Java Code Runs",

      paragraphs: [
        "When we compile a Java program, the Java compiler converts the source code into bytecode.",

        "The JVM then loads and executes that bytecode."
      ],

      code: {
        language: "text",

        code: `Main.java
    |
    | javac
    v
Main.class
    |
    | JVM
    v
Program Execution`
      }
    },

    {
      id: "summary",

      title: "Summary",

      bullets: [
        "JDK is used for developing Java applications.",
        "JRE provides the environment required to run Java applications.",
        "JVM executes Java bytecode.",
        "The Java compiler converts source code into bytecode.",
        "The JVM provides platform-specific execution of Java bytecode."
      ]
    }
  ]
};