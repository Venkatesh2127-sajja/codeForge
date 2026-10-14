export const interThreadCommunication = {
  id: "inter-thread-communication",

  slug: "inter-thread-communication",

  title: "Inter-Thread Communication in Java",

  topicTitle: "Multithreading",

  topicSlug: "multithreading",

  description:
    "Learn how Java threads communicate using wait(), notify(), and notifyAll(), and understand the Producer-Consumer pattern with practical and interview-focused examples.",

  estimatedTime: "45 min",

  sections: [
    {
      id: "what-is-communication",
      title: "1. What is Inter-Thread Communication?",

      paragraphs: [
        "Inter-thread communication allows threads to coordinate their work when one thread needs to wait for a condition or another thread needs to signal that a condition has changed.",
        "Java provides wait(), notify(), and notifyAll() for communication through an object's monitor."
      ],

      code: {
        language: "text",
        code: `Thread A
   |
   | wait for condition
   v
WAITING
   ^
   |
   | notification
   |
Thread B
   |
   | notify()
   v
condition changed`
      }
    },

    {
      id: "why-needed",
      title: "2. Why is Inter-Thread Communication Needed?",

      paragraphs: [
        "A thread should not continuously check whether some condition has become true.",
        "Instead, it can wait until another thread changes the relevant state and signals that it may be worth checking again."
      ],

      code: {
        language: "text",
        code: `Bad approach:

while (!dataAvailable) {
    // continuously check
}

Better approach:

while (!dataAvailable) {
    wait();
}`
      }
    },

    {
      id: "wait",
      title: "3. wait()",

      paragraphs: [
        "wait() causes the current thread to wait until it is notified, interrupted, or otherwise awakened according to the wait/monitor rules.",
        "The thread must own the object's monitor before calling wait().",
        "Most importantly, wait() releases that object's monitor while the thread waits."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    while (!condition) {
        lock.wait();
    }

    // Continue after condition is true
}`
      }
    },

    {
      id: "notify",
      title: "4. notify()",

      paragraphs: [
        "notify() wakes one thread that is waiting on the same object's monitor, if there is one.",
        "The notifying thread must own the same monitor."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    condition = true;

    lock.notify();
}`
      }
    },

    {
      id: "notify-all",
      title: "5. notifyAll()",

      paragraphs: [
        "notifyAll() wakes all threads waiting on the same object's monitor.",
        "The awakened threads must compete to reacquire the monitor before they can continue."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    condition = true;

    lock.notifyAll();
}`
      }
    },

    {
      id: "wait-lock",
      title: "6. wait() Releases the Lock",

      paragraphs: [
        "When a thread calls wait() on an object's monitor, it releases that monitor and enters a waiting state.",
        "This allows another thread to acquire the same monitor and change the shared condition."
      ],

      code: {
        language: "text",
        code: `Thread A
   |
synchronized(lock)
   |
wait()
   |
releases lock
   |
WAITING

Thread B
   |
acquires lock
   |
changes condition
   |
notify()
   |
releases lock`
      }
    },

    {
      id: "notify-lock",
      title: "7. notify() Does Not Immediately Give the Lock",

      paragraphs: [
        "Calling notify() does not immediately transfer the monitor to the awakened thread.",
        "The notifying thread continues until it exits the synchronized region or otherwise releases the monitor.",
        "The awakened thread must then reacquire the monitor before continuing."
      ]
    },

    {
      id: "why-while",
      title: "8. Why Use while Instead of if?",

      paragraphs: [
        "A waiting thread should normally check its condition inside a while loop.",
        "After waking, the thread must reacquire the lock and verify that the condition is actually satisfied."
      ],

      code: {
        language: "java",
        code: `synchronized (lock) {

    while (!dataAvailable) {
        lock.wait();
    }

    processData();
}`
      },

      paragraphs: [
        "Using while is the standard safe pattern for condition waiting."
      ]
    },

    {
      id: "illegal-monitor",
      title: "9. IllegalMonitorStateException",

      paragraphs: [
        "A thread must own an object's monitor before calling wait(), notify(), or notifyAll() on that object.",
        "Calling these methods outside the appropriate synchronized region causes IllegalMonitorStateException."
      ],

      code: {
        language: "java",
        code: `Object lock = new Object();

// Incorrect:
lock.wait();`
      },

      code: {
        language: "java",
        code: `Object lock = new Object();

synchronized (lock) {
    lock.wait();
}`
      }
    },

    {
      id: "producer-consumer",
      title: "10. Producer-Consumer Pattern",

      paragraphs: [
        "Producer-Consumer is a classic inter-thread communication pattern.",
        "A producer creates data and places it into a shared buffer.",
        "A consumer removes and processes data from the buffer."
      ],

      code: {
        language: "text",
        code: `Producer
    |
    v
+-----------+
|  Buffer   |
+-----------+
    |
    v
Consumer`
      }
    },

    {
      id: "producer-consumer-rules",
      title: "11. Producer-Consumer Rules",

      bullets: [
        "Producer waits when the buffer is full.",
        "Consumer waits when the buffer is empty.",
        "Producer notifies consumers after adding data.",
        "Consumer notifies producers after removing data.",
        "Shared buffer access must be synchronized."
      ]
    },

    {
      id: "producer-example",
      title: "12. Simple Producer Example",

      code: {
        language: "java",
        code: `class Buffer {

    private int value;
    private boolean available = false;

    public synchronized void produce(int value)
            throws InterruptedException {

        while (available) {
            wait();
        }

        this.value = value;
        available = true;

        notifyAll();
    }
}`
      }
    },

    {
      id: "consumer-example",
      title: "13. Simple Consumer Example",

      code: {
        language: "java",
        code: `class Buffer {

    private int value;
    private boolean available = false;

    public synchronized int consume()
            throws InterruptedException {

        while (!available) {
            wait();
        }

        int result = value;
        available = false;

        notifyAll();

        return result;
    }
}`
      }
    },

    {
      id: "complete-example",
      title: "14. Complete Producer-Consumer Example",

      code: {
        language: "java",
        code: `class Buffer {

    private int value;
    private boolean available = false;

    public synchronized void produce(int value)
            throws InterruptedException {

        while (available) {
            wait();
        }

        this.value = value;
        available = true;

        notifyAll();
    }

    public synchronized int consume()
            throws InterruptedException {

        while (!available) {
            wait();
        }

        int result = value;
        available = false;

        notifyAll();

        return result;
    }
}

public class Main {

    public static void main(String[] args) {

        Buffer buffer = new Buffer();

        Thread producer = new Thread(() -> {

            try {
                for (int i = 1; i <= 5; i++) {
                    buffer.produce(i);
                    System.out.println(
                        "Produced: " + i
                    );
                }

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread consumer = new Thread(() -> {

            try {
                for (int i = 1; i <= 5; i++) {

                    int value =
                        buffer.consume();

                    System.out.println(
                        "Consumed: " + value
                    );
                }

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}`
      }
    },

    {
      id: "blocking-queue",
      title: "15. Producer-Consumer with BlockingQueue",

      paragraphs: [
        "In modern Java applications, BlockingQueue is often preferred over manually implementing wait() and notify() for producer-consumer workflows.",
        "It provides thread-safe blocking operations such as put() and take()."
      ],

      code: {
        language: "java",
        code: `BlockingQueue<Integer> queue =
    new ArrayBlockingQueue<>(10);

// Producer
queue.put(100);

// Consumer
int value =
    queue.take();`
      }
    },

    {
      id: "wait-notify-vs-blocking",
      title: "16. wait/notify vs BlockingQueue",

      bullets: [
        "wait/notify → lower-level coordination mechanism",
        "BlockingQueue → higher-level producer-consumer abstraction",
        "BlockingQueue handles queue synchronization internally",
        "BlockingQueue is generally simpler and less error-prone for producer-consumer problems"
      ]
    },

    {
      id: "notify-vs-notifyall",
      title: "17. notify() vs notifyAll()",

      bullets: [
        "notify() → wakes one waiting thread",
        "notifyAll() → wakes all waiting threads",
        "Awakened threads still need to reacquire the monitor",
        "notifyAll() is often safer when multiple threads may be waiting for different conditions"
      ]
    },

    {
      id: "interrupt",
      title: "18. InterruptedException",

      paragraphs: [
        "wait() can throw InterruptedException.",
        "When catching InterruptedException, a common practice is to restore the interrupted status if the current method cannot handle the interruption itself."
      ],

      code: {
        language: "java",
        code: `try {
    lock.wait();

} catch (InterruptedException e) {

    Thread.currentThread().interrupt();
}`
      }
    },

    {
      id: "important-rules",
      title: "19. Important Rules to Remember",

      bullets: [
        "wait(), notify(), and notifyAll() belong to Object.",
        "The current thread must own the object's monitor to call them.",
        "wait() releases the object's monitor.",
        "notify() wakes one waiting thread.",
        "notifyAll() wakes all waiting threads.",
        "notify() does not immediately transfer the lock.",
        "Use while to check the waiting condition.",
        "Producer-Consumer is a classic use case.",
        "BlockingQueue is usually preferable for a practical producer-consumer implementation."
      ]
    },

    {
      id: "interview-questions",
      title: "20. Important Interview Questions",

      interviewQuestions: [
        {
          question: "What is inter-thread communication?",

          answer:
            "It is a mechanism that allows threads to coordinate their execution when one thread needs to wait for a condition and another thread changes that condition."
        },

        {
          question: "What are wait(), notify(), and notifyAll()?",

          answer:
            "They are Object methods used for thread coordination. wait() makes the current thread wait and releases the object's monitor, notify() wakes one waiting thread, and notifyAll() wakes all waiting threads."
        },

        {
          question: "Why must wait() be called inside synchronized code?",

          answer:
            "The current thread must own the object's monitor before calling wait(), notify(), or notifyAll()."
        },

        {
          question: "Does wait() release the lock?",

          answer:
            "Yes. wait() releases the object's monitor while the thread is waiting."
        },

        {
          question: "Does sleep() release the lock?",

          answer:
            "No. Thread.sleep() pauses the thread but does not release an intrinsic monitor lock it already holds."
        },

        {
          question: "Does notify() immediately release the lock?",

          answer:
            "No. notify() only signals a waiting thread. The notifying thread keeps the monitor until it leaves the synchronized region."
        },

        {
          question: "Why use while instead of if with wait()?",

          answer:
            "Because after waking, the thread should reacquire the lock and recheck the condition before proceeding."
        },

        {
          question: "What is the Producer-Consumer pattern?",

          answer:
            "A producer creates data and places it into a shared buffer, while a consumer removes and processes that data. The producer waits when the buffer is full and the consumer waits when it is empty."
        },

        {
          question: "Why is BlockingQueue preferred for Producer-Consumer?",

          answer:
            "BlockingQueue provides thread-safe blocking operations and handles much of the coordination logic, making the implementation simpler and less error-prone."
        }
      ]
    },

    {
      id: "interview-version",
      title: "21. Interview Version",

      paragraphs: [
        "Java provides wait(), notify(), and notifyAll() for inter-thread communication using an object's monitor. wait() releases the monitor and waits for a condition, notify() wakes one waiting thread, and notifyAll() wakes all waiting threads. These methods must be used while owning the object's monitor. A common use case is the Producer-Consumer pattern, although BlockingQueue is generally a simpler higher-level solution."
      ]
    },

    {
      id: "final-note",
      title: "22. Final Note",

      bullets: [
        "wait() → wait and release monitor",
        "notify() → wake one waiting thread",
        "notifyAll() → wake all waiting threads",
        "while → recheck condition after waking",
        "Producer → waits when buffer is full",
        "Consumer → waits when buffer is empty",
        "BlockingQueue → preferred practical Producer-Consumer solution"
      ]
    }
  ]
};