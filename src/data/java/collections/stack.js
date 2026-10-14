export const stack = {
  id: "stack",
  slug: "stack",
  title: "Stack in Java",
  topicTitle: "Collections",
  topicSlug: "collections",
  description:
    "Learn Stack in Java from LIFO fundamentals to push, pop, peek, search, internal working, performance, Vector inheritance, Stack vs ArrayDeque, common mistakes, best practices, and interview questions.",
  estimatedTime: "60 min",

  sections: [
    // =========================================================
    // 1. WHAT IS STACK?
    // =========================================================
    {
      id: "what-is-stack",
      title: "1. What is Stack?",
      paragraphs: [
        "A Stack is a data structure that follows the LIFO principle: Last In, First Out.",
        "The element added most recently is the first element removed.",
        "Java provides the legacy Stack class in java.util.Stack.",
        "Stack extends Vector, so it inherits many Vector operations in addition to its stack-specific methods."
      ],

      code: {
        language: "java",
        code: `import java.util.Stack;

public class Main {
    public static void main(String[] args) {

        Stack<String> stack = new Stack<>();

        stack.push("A");
        stack.push("B");
        stack.push("C");

        System.out.println(stack);
    }
}`
      },

      output: `[A, B, C]`,

      bullets: [
        "Stack follows LIFO.",
        "The last inserted element is removed first.",
        "Java provides java.util.Stack.",
        "Stack extends Vector.",
        "Stack provides push(), pop(), peek(), empty(), and search()."
      ]
    },

    // =========================================================
    // 2. LIFO CONCEPT
    // =========================================================
    {
      id: "stack-lifo",
      title: "2. LIFO — Last In, First Out",
      paragraphs: [
        "The most important concept behind Stack is LIFO.",
        "Think about a stack of plates. The last plate placed on top is normally the first plate removed."
      ],

      code: {
        language: "text",
        code: `push(A)
   ↓
[A]

push(B)
   ↓
[A, B]

push(C)
   ↓
[A, B, C]

pop()
   ↓
C removed

[A, B]`
      },

      bullets: [
        "push() adds an element to the top.",
        "pop() removes the top element.",
        "peek() reads the top element without removing it."
      ]
    },

    // =========================================================
    // 3. STACK HIERARCHY
    // =========================================================
    {
      id: "stack-hierarchy",
      title: "3. Stack Hierarchy",
      paragraphs: [
        "Stack is a subclass of Vector. Therefore, Stack inherits Vector's methods and synchronization characteristics."
      ],

      code: {
        language: "text",
        code: `Iterable
   |
Collection
   |
  List
   |
AbstractList
   |
 Vector
   |
 Stack`
      },

      bullets: [
        "Stack extends Vector.",
        "Stack implements List indirectly through Vector.",
        "Stack inherits many Vector operations.",
        "Stack is therefore more than a pure stack abstraction."
      ]
    },

    // =========================================================
    // 4. CREATING STACK
    // =========================================================
    {
      id: "creating-stack",
      title: "4. Creating a Stack",
      paragraphs: [
        "A Stack can be created using its no-argument constructor."
      ],

      code: {
        language: "java",
        code: `import java.util.Stack;

Stack<Integer> numbers =
        new Stack<>();

Stack<String> names =
        new Stack<>();`
      },

      bullets: [
        "Use generics to specify the element type.",
        "Avoid raw Stack types.",
        "Stack is located in java.util."
      ]
    },

    // =========================================================
    // 5. PUSH
    // =========================================================
    {
      id: "stack-push",
      title: "5. push()",
      paragraphs: [
        "The push() method adds an element to the top of the Stack."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("Java");
stack.push("Spring");
stack.push("React");

System.out.println(stack);`
      },

      output: `[Java, Spring, React]`,

      bullets: [
        "push() adds to the top.",
        "The most recently pushed element becomes the top element.",
        "push() returns the element that was pushed."
      ]
    },

    // =========================================================
    // 6. POP
    // =========================================================
    {
      id: "stack-pop",
      title: "6. pop()",
      paragraphs: [
        "The pop() method removes and returns the element at the top of the Stack.",
        "Calling pop() on an empty Stack throws EmptyStackException."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("A");
stack.push("B");
stack.push("C");

String value = stack.pop();

System.out.println("Removed: " + value);
System.out.println(stack);`
      },

      output: `Removed: C
[A, B]`
    },

    // =========================================================
    // 7. PEEK
    // =========================================================
    {
      id: "stack-peek",
      title: "7. peek()",
      paragraphs: [
        "The peek() method returns the top element without removing it.",
        "If the Stack is empty, peek() throws EmptyStackException."
      ],

      code: {
        language: "java",
        code: `Stack<Integer> numbers = new Stack<>();

numbers.push(10);
numbers.push(20);
numbers.push(30);

System.out.println(numbers.peek());
System.out.println(numbers);`
      },

      output: `30
[10, 20, 30]`,

      bullets: [
        "peek() reads the top element.",
        "peek() does not modify the Stack.",
        "pop() reads and removes the top element."
      ]
    },

    // =========================================================
    // 8. EMPTY
    // =========================================================
    {
      id: "stack-empty",
      title: "8. empty()",
      paragraphs: [
        "The empty() method checks whether the Stack contains no elements."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

System.out.println(stack.empty());

stack.push("Java");

System.out.println(stack.empty());`
      },

      output: `true
false`
    },

    // =========================================================
    // 9. SEARCH
    // =========================================================
    {
      id: "stack-search",
      title: "9. search()",
      paragraphs: [
        "The search() method searches for an element and returns its position relative to the top of the Stack.",
        "The top element has position 1.",
        "If the element is not found, search() returns -1."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("A");
stack.push("B");
stack.push("C");

System.out.println(stack.search("C"));
System.out.println(stack.search("A"));
System.out.println(stack.search("X"));`
      },

      output: `1
3
-1`
    },

    // =========================================================
    // 10. STACK TOP
    // =========================================================
    {
      id: "stack-top",
      title: "10. Understanding the Top",
      paragraphs: [
        "The top of the Stack is the position where push() inserts elements and pop() removes elements."
      ],

      code: {
        language: "text",
        code: `Stack

Bottom
  ↓
[A]
[B]
[C] ← Top

push(D)

Bottom
  ↓
[A]
[B]
[C]
[D] ← Top

pop()

D is removed`
      }
    },

    // =========================================================
    // 11. DUPLICATE ELEMENTS
    // =========================================================
    {
      id: "stack-duplicates",
      title: "11. Duplicate Elements",
      paragraphs: [
        "Because Stack extends Vector and therefore implements List, duplicate elements are allowed."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("Java");
stack.push("Spring");
stack.push("Java");

System.out.println(stack);`
      },

      output: `[Java, Spring, Java]`
    },

    // =========================================================
    // 12. NULL VALUES
    // =========================================================
    {
      id: "stack-null",
      title: "12. Null Values",
      paragraphs: [
        "Stack can store null values because it inherits the behavior of Vector."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("Java");
stack.push(null);

System.out.println(stack);`
      },

      output: `[Java, null]`,

      bullets: [
        "Null is technically allowed.",
        "Avoid null elements when they make the stack logic ambiguous."
      ]
    },

    // =========================================================
    // 13. ITERATING STACK
    // =========================================================
    {
      id: "stack-iteration",
      title: "13. Iterating a Stack",
      paragraphs: [
        "Since Stack implements List through Vector, it can be traversed using enhanced for loops, Iterator, ListIterator, and other collection mechanisms.",
        "However, iteration order is not the same thing as repeatedly popping elements."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("A");
stack.push("B");
stack.push("C");

for (String value : stack) {
    System.out.println(value);
}`
      },

      output: `A
B
C`,

      bullets: [
        "Enhanced for iteration follows the underlying List order.",
        "pop() processes elements from the top.",
        "Do not confuse List iteration order with LIFO removal order."
      ]
    },

    // =========================================================
    // 14. STACK USING LOOP
    // =========================================================
    {
      id: "stack-pop-loop",
      title: "14. Processing a Stack Using pop()",
      paragraphs: [
        "If you want to process elements according to LIFO order, repeatedly call pop() until the Stack becomes empty."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

stack.push("A");
stack.push("B");
stack.push("C");

while (!stack.empty()) {
    System.out.println(stack.pop());
}`
      },

      output: `C
B
A`
    },

    // =========================================================
    // 15. STACK OVERFLOW CONCEPT
    // =========================================================
    {
      id: "stack-overflow-concept",
      title: "15. Stack Overflow Concept",
      paragraphs: [
        "A data-structure Stack and the JVM call stack are related concepts but are not the same thing.",
        "The java.util.Stack object is a heap object used to store application data.",
        "The JVM call stack is used to manage method calls, local variables, and execution frames for threads."
      ],

      bullets: [
        "java.util.Stack is a Java collection.",
        "JVM stack stores method execution frames.",
        "StackOverflowError is generally associated with excessive call-stack usage, commonly from uncontrolled recursion.",
        "Do not confuse java.util.Stack with the JVM runtime stack."
      ],

      code: {
        language: "java",
        code: `public static void recurse() {
    recurse();
}

// Eventually:
// java.lang.StackOverflowError`
      }
    },

    // =========================================================
    // 16. INTERNAL WORKING
    // =========================================================
    {
      id: "stack-internal-working",
      title: "16. Internal Working of Stack",
      paragraphs: [
        "Java's Stack class extends Vector, so it uses Vector's dynamically growing array internally.",
        "The stack operations are implemented using Vector-style indexed operations.",
        "This is one reason Stack is considered a legacy design for stack usage."
      ],

      code: {
        language: "text",
        code: `Stack
  |
  v
Vector
  |
  v
Dynamic Array
  |
  +--- A
  +--- B
  +--- C  ← Top`
      },

      bullets: [
        "Stack inherits Vector's array-backed storage.",
        "push() adds an element.",
        "pop() removes the last element.",
        "peek() reads the last element.",
        "Vector's synchronization characteristics are inherited."
      ]
    },

    // =========================================================
    // 17. STACK SYNCHRONIZATION
    // =========================================================
    {
      id: "stack-synchronization",
      title: "17. Stack Synchronization",
      paragraphs: [
        "Because Stack extends Vector, its operations inherit Vector's synchronized behavior.",
        "However, synchronization of individual methods does not automatically make a sequence of operations atomic."
      ],

      code: {
        language: "java",
        code: `Stack<Integer> stack =
        new Stack<>();

stack.push(10);
stack.push(20);

System.out.println(stack.pop());`
      },

      bullets: [
        "Stack inherits synchronization from Vector.",
        "Synchronization can introduce locking overhead.",
        "Do not assume every multi-operation workflow is automatically atomic.",
        "Modern applications should select a collection based on actual concurrency requirements."
      ]
    },

    // =========================================================
    // 18. EMPTY STACK EXCEPTION
    // =========================================================
    {
      id: "empty-stack-exception",
      title: "18. EmptyStackException",
      paragraphs: [
        "Calling pop() or peek() on an empty Stack throws EmptyStackException.",
        "Checking empty() before these operations is a common defensive approach."
      ],

      code: {
        language: "java",
        code: `Stack<String> stack = new Stack<>();

if (!stack.empty()) {
    System.out.println(stack.peek());
} else {
    System.out.println("Stack is empty");
}`
      },

      output: `Stack is empty`
    },

    // =========================================================
    // 19. STACK VS ARRAY
    // =========================================================
    {
      id: "stack-vs-array",
      title: "19. Stack vs Array",
      paragraphs: [
        "An array is a general-purpose fixed-size data structure, while a Stack provides a specific LIFO abstraction.",
        "A Stack can grow dynamically, while a normal Java array has a fixed length."
      ],

      bullets: [
        "Array has fixed length.",
        "Stack can grow dynamically.",
        "Array allows direct access to arbitrary indexes.",
        "Stack operations are conceptually centered around the top.",
        "Stack provides push/pop/peek operations."
      ]
    },

    // =========================================================
    // 20. STACK VS ARRAYLIST
    // =========================================================
    {
      id: "stack-vs-arraylist",
      title: "20. Stack vs ArrayList",
      paragraphs: [
        "Both can store elements in an array-backed structure, but they represent different abstractions.",
        "ArrayList is a general-purpose List, while Stack represents LIFO behavior."
      ],

      bullets: [
        "ArrayList is designed as a general-purpose List.",
        "Stack provides push(), pop(), and peek().",
        "Stack extends Vector.",
        "ArrayList is normally preferred for general list operations.",
        "For modern stack usage, ArrayDeque is generally preferred over Stack."
      ]
    },

    // =========================================================
    // 21. STACK VS VECTOR
    // =========================================================
    {
      id: "stack-vs-vector",
      title: "21. Stack vs Vector",
      paragraphs: [
        "Stack extends Vector, so Stack has all the capabilities inherited from Vector plus stack-specific operations."
      ],

      code: {
        language: "text",
        code: `Vector
   |
   +-- add()
   +-- get()
   +-- remove()
   +-- set()
   |
   v
Stack
   |
   +-- push()
   +-- pop()
   +-- peek()
   +-- empty()
   +-- search()`
      },

      bullets: [
        "Vector is a List implementation.",
        "Stack is a specialized subclass of Vector.",
        "Stack adds LIFO-oriented methods.",
        "Stack still exposes inherited List operations."
      ]
    },

    // =========================================================
    // 22. STACK VS ARRAYDEQUE
    // =========================================================
    {
      id: "stack-vs-arraydeque",
      title: "22. Stack vs ArrayDeque",
      paragraphs: [
        "For new code where you need a stack, ArrayDeque is generally preferred over the legacy Stack class.",
        "ArrayDeque implements Deque and provides efficient stack operations such as push(), pop(), and peek().",
        "ArrayDeque is not synchronized and does not permit null elements."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<String> stack =
        new ArrayDeque<>();

stack.push("A");
stack.push("B");
stack.push("C");

System.out.println(stack.pop());
System.out.println(stack.peek());`
      },

      output: `C
B`,

      bullets: [
        "Stack is a legacy class.",
        "ArrayDeque is the modern stack-oriented choice for many single-threaded use cases.",
        "ArrayDeque implements Deque.",
        "ArrayDeque does not allow null elements.",
        "ArrayDeque is not synchronized by default."
      ]
    },

    // =========================================================
    // 23. STACK PERFORMANCE
    // =========================================================
    {
      id: "stack-performance",
      title: "23. Stack Performance",
      paragraphs: [
        "Because Stack is backed by Vector, its basic stack operations are generally efficient."
      ],

      code: {
        language: "text",
        code: `Operation       Average Complexity

push()          O(1) amortized

pop()           O(1)

peek()          O(1)

empty()         O(1)

search()        O(n)

get(index)      O(1)

contains()      O(n)

remove(index)   O(n)`
      },

      bullets: [
        "push() is O(1) amortized.",
        "pop() is O(1).",
        "peek() is O(1).",
        "empty() is O(1).",
        "search() is O(n).",
        "contains() is O(n).",
        "Indexed access is generally O(1).",
        "Resizing can temporarily require O(n) work."
      ]
    },

    // =========================================================
    // 24. REAL WORLD USE CASES
    // =========================================================
    {
      id: "stack-use-cases",
      title: "24. Stack Use Cases",
      paragraphs: [
        "The LIFO model appears in many algorithms and applications."
      ],

      bullets: [
        "Undo and redo operations.",
        "Browser navigation concepts.",
        "Expression evaluation.",
        "Parentheses matching.",
        "Depth-first search.",
        "Backtracking algorithms.",
        "Parsing.",
        "Function-call concepts.",
        "Temporary processing where the latest item must be handled first."
      ],

      code: {
        language: "java",
        code: `Stack<Character> stack =
        new Stack<>();

String expression = "(A+B)";

for (char ch : expression.toCharArray()) {

    if (ch == '(') {
        stack.push(ch);
    }

    if (ch == ')' && !stack.empty()) {
        stack.pop();
    }
}

System.out.println(stack.empty());`
      },

      output: `true`
    },

    // =========================================================
    // 25. PARENTHESES EXAMPLE
    // =========================================================
    {
      id: "stack-parentheses",
      title: "25. Example — Balanced Parentheses",
      paragraphs: [
        "A Stack can be used to check whether opening and closing parentheses are balanced.",
        "Whenever an opening parenthesis is found, push it. When a closing parenthesis is found, pop the corresponding opening parenthesis."
      ],

      code: {
        language: "java",
        code: `import java.util.Stack;

public class Main {

    public static boolean isBalanced(String text) {

        Stack<Character> stack =
                new Stack<>();

        for (char ch : text.toCharArray()) {

            if (ch == '(') {
                stack.push(ch);
            }

            else if (ch == ')') {

                if (stack.empty()) {
                    return false;
                }

                stack.pop();
            }
        }

        return stack.empty();
    }

    public static void main(String[] args) {

        System.out.println(
            isBalanced("(A+B)")
        );

        System.out.println(
            isBalanced("((A+B)")
        );
    }
}`
      },

      output: `true
false`
    },

    // =========================================================
    // 26. COMMON MISTAKES
    // =========================================================
    {
      id: "stack-common-mistakes",
      title: "26. Common Mistakes",
      paragraphs: [
        "Several mistakes are common when learning or using Stack."
      ],

      bullets: [
        "Confusing java.util.Stack with the JVM call stack.",
        "Calling pop() on an empty Stack.",
        "Calling peek() on an empty Stack.",
        "Using Stack when ArrayDeque would be a better modern choice.",
        "Assuming Stack is automatically the best choice for multi-threaded applications.",
        "Using inherited List methods when the intended abstraction is strictly LIFO.",
        "Confusing iteration order with pop order.",
        "Using raw Stack instead of generics.",
        "Assuming synchronized methods make multi-step operations automatically atomic."
      ]
    },

    // =========================================================
    // 27. BEST PRACTICES
    // =========================================================
    {
      id: "stack-best-practices",
      title: "27. Best Practices",
      paragraphs: [
        "For new Java applications, prefer the Deque interface with ArrayDeque when you need a stack and do not require synchronization."
      ],

      code: {
        language: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> stack =
        new ArrayDeque<>();

stack.push(10);
stack.push(20);
stack.push(30);

while (!stack.isEmpty()) {
    System.out.println(stack.pop());
}`
      },

      output: `30
20
10`,

      bullets: [
        "Prefer Deque as the abstraction for modern stack usage.",
        "Use ArrayDeque for many ordinary stack use cases.",
        "Use generics.",
        "Check isEmpty() before removing if the empty case is possible.",
        "Do not use legacy Stack simply because it is synchronized.",
        "Choose a concurrent collection when concurrency actually requires it.",
        "Keep the LIFO abstraction clear in application code."
      ]
    },

    // =========================================================
    // 28. STACK VS DEQUE METHODS
    // =========================================================
    {
      id: "stack-deque-methods",
      title: "28. Stack vs Deque Methods",
      paragraphs: [
        "A useful interview comparison is to understand how the traditional Stack methods map to Deque methods."
      ],

      code: {
        language: "text",
        code: `Stack             Deque

push(e)     →      push(e)

pop()       →      pop()

peek()      →      peek()

empty()     →      isEmpty()`
      },

      bullets: [
        "Stack uses empty().",
        "Deque uses isEmpty().",
        "Both provide push/pop/peek semantics.",
        "Deque provides additional queue and double-ended operations."
      ]
    },

    // =========================================================
    // 29. INTERVIEW KEY POINTS
    // =========================================================
    {
      id: "stack-key-points",
      title: "29. Key Points",
      paragraphs: [
        "Remember these points for interviews and practical Java development."
      ],

      bullets: [
        "Stack follows LIFO.",
        "push() adds an element.",
        "pop() removes and returns the top element.",
        "peek() returns the top element without removing it.",
        "empty() checks whether the Stack is empty.",
        "search() returns the 1-based position from the top.",
        "Stack extends Vector.",
        "Stack is backed by Vector's dynamic array.",
        "Stack inherits Vector's synchronization characteristics.",
        "pop() and peek() throw EmptyStackException when empty.",
        "Stack allows duplicate values.",
        "Stack allows null values.",
        "Stack is a legacy class.",
        "ArrayDeque is generally preferred for new stack implementations."
      ]
    },

    // =========================================================
    // 30. INTERVIEW QUESTIONS
    // =========================================================
    {
      id: "stack-interview-questions",
      title: "30. Interview Questions",
      paragraphs: [
        "These questions cover the most important Stack concepts for Java interviews."
      ],

      interviewQuestions: [
        {
          question: "What is Stack in Java?",
          answer:
            "Stack is a legacy Java collection class that follows the LIFO principle. It extends Vector and provides push(), pop(), peek(), empty(), and search() methods."
        },
        {
          question: "What does LIFO mean?",
          answer:
            "LIFO means Last In, First Out. The element inserted most recently is removed first."
        },
        {
          question: "What is the difference between push() and pop()?",
          answer:
            "push() adds an element to the top of the Stack, while pop() removes and returns the top element."
        },
        {
          question: "What is the difference between pop() and peek()?",
          answer:
            "pop() returns and removes the top element. peek() returns the top element without removing it."
        },
        {
          question: "What happens when pop() is called on an empty Stack?",
          answer:
            "It throws EmptyStackException."
        },
        {
          question: "What happens when peek() is called on an empty Stack?",
          answer:
            "It throws EmptyStackException."
        },
        {
          question: "Does Stack allow duplicate elements?",
          answer:
            "Yes. Stack extends Vector, which implements List, so duplicate elements are allowed."
        },
        {
          question: "Does Stack allow null?",
          answer:
            "Yes. Stack inherits Vector behavior and can store null values."
        },
        {
          question: "Is Stack synchronized?",
          answer:
            "Stack extends Vector, so its operations inherit Vector's synchronized behavior."
        },
        {
          question: "Is Stack thread-safe?",
          answer:
            "Individual operations are synchronized through its Vector inheritance, but this does not automatically make compound multi-operation workflows atomic."
        },
        {
          question: "What is the internal data structure of Stack?",
          answer:
            "Stack extends Vector, which uses a dynamically growing array internally."
        },
        {
          question: "What is the time complexity of push()?",
          answer:
            "push() is O(1) amortized. A resize can temporarily require O(n) work."
        },
        {
          question: "What is the time complexity of pop()?",
          answer:
            "pop() is O(1)."
        },
        {
          question: "What is the time complexity of peek()?",
          answer:
            "peek() is O(1)."
        },
        {
          question: "What is the time complexity of search()?",
          answer:
            "search() is O(n) because the stack may need to scan its elements."
        },
        {
          question: "What is the difference between Stack and Vector?",
          answer:
            "Stack extends Vector and adds LIFO-specific operations such as push(), pop(), peek(), empty(), and search(). Vector is primarily a List implementation."
        },
        {
          question: "What is the difference between Stack and ArrayList?",
          answer:
            "ArrayList is a general-purpose List, while Stack represents LIFO behavior. Stack also extends Vector and has synchronized legacy behavior."
        },
        {
          question: "Why is Stack considered a legacy class?",
          answer:
            "Stack predates the modern Collections Framework and extends the older Vector class. Modern Java commonly uses Deque implementations such as ArrayDeque for stack behavior."
        },
        {
          question: "What should be used instead of Stack in modern Java?",
          answer:
            "For many ordinary stack use cases, use the Deque interface with an ArrayDeque implementation."
        },
        {
          question: "What is the difference between Stack and ArrayDeque?",
          answer:
            "Stack is a legacy synchronized Vector subclass, while ArrayDeque implements Deque and is designed for efficient double-ended operations. ArrayDeque is generally preferred for modern stack usage."
        },
        {
          question: "Does ArrayDeque allow null?",
          answer:
            "No. ArrayDeque does not permit null elements."
        },
        {
          question: "What is search() in Stack?",
          answer:
            "search() returns the 1-based position of an element measured from the top of the Stack. It returns -1 when the element is not found."
        },
        {
          question: "What is the difference between java.util.Stack and JVM stack?",
          answer:
            "java.util.Stack is a Java collection used to store application data using LIFO behavior. The JVM stack is a runtime memory structure used for method execution frames and local variables."
        },
        {
          question: "What is StackOverflowError?",
          answer:
            "StackOverflowError is a JVM error that can occur when a thread's call stack is exhausted, commonly because of uncontrolled recursion. It is different from java.util.Stack."
        },
        {
          question: "Where is Stack used in algorithms?",
          answer:
            "Stacks are commonly used in parentheses matching, expression evaluation, depth-first search, backtracking, parsing, and undo-style operations."
        }
      ]
    }
  ]
};