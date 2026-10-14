export const featuresOfJava = {
  id: "features-of-java",
  slug: "features-of-java",

  title: "Features of Java",

  topicTitle: "Introduction to Java",

  topicSlug: "introduction",

  description:
    "Learn the important features of Java and understand why it is widely used for software development.",

  estimatedTime: "15 min",

  sections: [
    {
      id: "introduction",

      title: "Introduction",

      paragraphs: [
        "Java provides several features that make it a popular programming language for developing reliable, secure and maintainable applications.",

        "These features are designed to make Java easier to develop with, portable across platforms and suitable for large-scale software systems."
      ]
    },

    {
      id: "simple",

      title: "1. Simple",

      paragraphs: [
        "Java was designed to be easier to learn and use compared with many older programming languages.",

        "Java removes several complicated features such as explicit pointer arithmetic and provides automatic memory management through garbage collection."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        int number = 10;

        System.out.println(number);

    }
}`
      }
    },

    {
      id: "object-oriented",

      title: "2. Object-Oriented",

      paragraphs: [
        "Java is an object-oriented programming language. Programs can be designed using classes and objects.",

        "Java supports important object-oriented concepts such as encapsulation, inheritance, polymorphism and abstraction."
      ],

      code: {
        language: "java",

        code: `class Student {

    String name;

    void display() {
        System.out.println(name);
    }
}

public class Main {

    public static void main(String[] args) {

        Student student = new Student();

        student.name = "John";

        student.display();
    }
}`
      },

      output: "John"
    },

    {
      id: "platform-independent",

      title: "3. Platform Independent",

      paragraphs: [
        "Java source code is compiled into bytecode.",

        "The bytecode can run on different operating systems where a compatible Java Virtual Machine is available.",

        "This idea is commonly described as Write Once, Run Anywhere."
      ],

      code: {
        language: "text",

        code: `Java Source Code
       |
       v
     javac
       |
       v
 Java Bytecode
       |
       v
      JVM
       |
       +----------------+
       |                |
       v                v
    Windows          Linux
       |
       +----------------+
              |
              v
            macOS`
      }
    },

    {
      id: "secure",

      title: "4. Secure",

      paragraphs: [
        "Java provides several mechanisms that help build secure applications.",

        "Java avoids direct pointer manipulation and provides runtime checks, bytecode verification and controlled access to system resources.",

        "Security also depends on how an application is designed and configured, so the language itself does not automatically make every application secure."
      ]
    },

    {
      id: "robust",

      title: "5. Robust",

      paragraphs: [
        "Java is designed to help developers build reliable applications.",

        "Strong type checking, exception handling and automatic memory management help reduce many common programming errors."
      ],

      code: {
        language: "java",

        code: `public class Main {

    public static void main(String[] args) {

        try {

            int result = 10 / 0;

        } catch (ArithmeticException e) {

            System.out.println("Cannot divide by zero");

        }
    }
}`
      },

      output: "Cannot divide by zero"
    },

    {
      id: "portable",

      title: "6. Portable",

      paragraphs: [
        "Java bytecode can be moved between different systems where a compatible JVM is available.",

        "This makes Java applications portable across different operating systems and hardware environments."
      ]
    },

    {
      id: "multithreaded",

      title: "7. Multithreaded",

      paragraphs: [
        "Java provides built-in support for multithreading.",

        "Multithreading allows an application to perform multiple tasks concurrently."
      ],

      code: {
        language: "java",

        code: `class MyTask extends Thread {

    public void run() {

        System.out.println("Task is running");

    }
}

public class Main {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        task.start();

    }
}`
      }
    },

    {
      id: "high-performance",

      title: "8. High Performance",

      paragraphs: [
        "Java applications are executed by the JVM.",

        "Modern JVMs use Just-In-Time compilation to compile frequently executed bytecode into native machine code at runtime, which can provide strong performance for many workloads."
      ]
    },

    {
      id: "distributed",

      title: "9. Distributed",

      paragraphs: [
        "Java provides libraries and APIs that can be used to build distributed applications that communicate across networks.",

        "Java is widely used for backend and enterprise applications where different components communicate with each other."
      ]
    },

    {
      id: "dynamic",

      title: "10. Dynamic",

      paragraphs: [
        "Java supports dynamic loading of classes and provides runtime mechanisms that allow applications to work with classes and objects dynamically.",

        "Reflection is one example of a Java capability that allows applications to inspect classes and methods at runtime."
      ]
    },

    {
      id: "summary",

      title: "Java Features Summary",

      paragraphs: [
        "The major features of Java can be summarized as follows:"
      ],

      bullets: [
        "Simple",
        "Object-oriented",
        "Platform independent",
        "Secure",
        "Robust",
        "Portable",
        "Multithreaded",
        "High performance",
        "Distributed",
        "Dynamic"
      ]
    },

    {
      id: "interview-note",

      title: "Interview Note",

      paragraphs: [
        "In an interview, you can explain Java's major features by mentioning simplicity, object-oriented programming, platform independence, security, robustness, portability, multithreading and performance."
      ]
    }
  ]
};