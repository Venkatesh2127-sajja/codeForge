export const dateTimeApi = {
  id: "date-time-api",
  title: "Date and Time API",
  slug: "date-time-api",
  topicTitle: "Java 8",
  estimatedTime: "50 min",

  description:
    "Learn the Java 8 Date and Time API, including LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant, Duration, Period, formatting, parsing, time zones, and best practices.",

  sections: [
    {
      id: "why-new-date-time-api",
      title: "Why New Date-Time API?",

      paragraphs: [
        "Java 8 introduced the java.time package as a modern API for working with dates, times, date-time combinations, durations, periods, and time zones.",
        "The older java.util.Date and java.util.Calendar APIs have several design limitations. The Java 8 API provides clearer types for different date and time requirements.",
        "The new API is designed around immutable and thread-safe date-time classes."
      ],

      bullets: [
        "Clear separation between date and time concepts.",
        "Immutable date-time objects.",
        "Thread-safe API design.",
        "Better support for time zones.",
        "Better formatting and parsing.",
        "Convenient operations for periods and durations."
      ]
    },

    {
      id: "local-date",
      title: "LocalDate",

      paragraphs: [
        "LocalDate represents a date without a time and without a time zone.",
        "It is useful when only the calendar date matters, such as a birthday, joining date, or holiday."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        LocalDate date =
                LocalDate.of(2026, 9, 25);

        System.out.println(date);

        System.out.println(
                date.getYear()
        );

        System.out.println(
                date.getMonth()
        );

        System.out.println(
                date.getDayOfMonth()
        );
    }
}`
      },

      output: `2026-09-25
2026
SEPTEMBER
25`
    },

    {
      id: "local-date-current",
      title: "Getting the Current Date",

      code: {
        language: "java",
        code: `import java.time.LocalDate;

public class Main {

    public static void main(String[] args) {

        LocalDate today =
                LocalDate.now();

        System.out.println(today);
    }
}`
      },

      output: `2026-09-25`
    },

    {
      id: "local-date-operations",
      title: "LocalDate Operations",

      paragraphs: [
        "LocalDate provides methods for adding, subtracting, comparing, and inspecting dates."
      ],

      code: {
        language: "java",
        code: `LocalDate date =
        LocalDate.of(2026, 9, 25);

LocalDate nextWeek =
        date.plusWeeks(1);

LocalDate previousMonth =
        date.minusMonths(1);

System.out.println(nextWeek);
System.out.println(previousMonth);

System.out.println(
        date.isAfter(previousMonth)
);`
      },

      output: `2026-10-02
2026-08-25
true`
    },

    {
      id: "local-time",
      title: "LocalTime",

      paragraphs: [
        "LocalTime represents a time without a date and without a time zone.",
        "It is useful when only the time of day matters, such as a business opening time or a scheduled daily event."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {

        LocalTime time =
                LocalTime.of(14, 30, 15);

        System.out.println(time);

        System.out.println(
                time.getHour()
        );

        System.out.println(
                time.getMinute()
        );
    }
}`
      },

      output: `14:30:15
14
30`
    },

    {
      id: "local-time-current",
      title: "Getting the Current Time",

      code: {
        language: "java",
        code: `import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {

        LocalTime now =
                LocalTime.now();

        System.out.println(now);
    }
}`
      },

      output: `14:30:15.123456789`
    },

    {
      id: "local-date-time",
      title: "LocalDateTime",

      paragraphs: [
        "LocalDateTime combines a date and a time but does not contain time-zone information.",
        "It is useful when an application needs a local date and time but does not need to represent a specific instant across time zones."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDateTime;

public class Main {

    public static void main(String[] args) {

        LocalDateTime dateTime =
                LocalDateTime.of(
                        2026,
                        9,
                        25,
                        14,
                        30
                );

        System.out.println(dateTime);
    }
}`
      },

      output: `2026-09-25T14:30`
    },

    {
      id: "local-date-time-operations",
      title: "LocalDateTime Operations",

      code: {
        language: "java",
        code: `LocalDateTime dateTime =
        LocalDateTime.of(
                2026,
                9,
                25,
                14,
                30
        );

LocalDateTime tomorrow =
        dateTime.plusDays(1);

LocalDateTime earlier =
        dateTime.minusHours(2);

System.out.println(tomorrow);
System.out.println(earlier);`
      },

      output: `2026-09-26T14:30
2026-09-25T12:30`
    },

    {
      id: "zoned-date-time",
      title: "ZonedDateTime",

      paragraphs: [
        "ZonedDateTime represents a date and time together with a time zone.",
        "It is useful when an application needs to represent a local date-time in a specific geographical time zone."
      ],

      code: {
        language: "java",
        code: `import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {

    public static void main(String[] args) {

        ZonedDateTime dateTime =
                ZonedDateTime.of(
                        2026,
                        9,
                        25,
                        14,
                        30,
                        0,
                        0,
                        ZoneId.of("Asia/Kolkata")
                );

        System.out.println(dateTime);
    }
}`
      },

      output: `2026-09-25T14:30+05:30[Asia/Kolkata]`
    },

    {
      id: "zone-id",
      title: "Working with Time Zones",

      paragraphs: [
        "ZoneId represents a time-zone identifier such as Asia/Kolkata, America/New_York, or Europe/London.",
        "Java provides IANA time-zone identifiers through the java.time API."
      ],

      code: {
        language: "java",
        code: `import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {

    public static void main(String[] args) {

        ZonedDateTime india =
                ZonedDateTime.now(
                        ZoneId.of("Asia/Kolkata")
                );

        ZonedDateTime london =
                ZonedDateTime.now(
                        ZoneId.of("Europe/London")
                );

        System.out.println(india);
        System.out.println(london);
    }
}`
      }
    },

    {
      id: "instant",
      title: "Instant",

      paragraphs: [
        "Instant represents a point on the global timeline.",
        "It is commonly useful for timestamps, logging, event ordering, and storing an absolute moment in time.",
        "Unlike LocalDateTime, Instant represents an actual point on the timeline rather than a time without a zone."
      ],

      code: {
        language: "java",
        code: `import java.time.Instant;

public class Main {

    public static void main(String[] args) {

        Instant timestamp =
                Instant.now();

        System.out.println(timestamp);
    }
}`
      },

      output: `2026-09-25T09:00:00Z`
    },

    {
      id: "duration",
      title: "Duration",

      paragraphs: [
        "Duration represents an amount of time based primarily on seconds and nanoseconds.",
        "It is useful for measuring elapsed time between time-based values such as LocalTime, LocalDateTime, and Instant."
      ],

      code: {
        language: "java",
        code: `import java.time.Duration;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {

        LocalTime start =
                LocalTime.of(10, 0);

        LocalTime end =
                LocalTime.of(12, 30);

        Duration duration =
                Duration.between(start, end);

        System.out.println(
                duration.toHours()
        );

        System.out.println(
                duration.toMinutes()
        );
    }
}`
      },

      output: `2
150`
    },

    {
      id: "duration-with-instant",
      title: "Duration with Instant",

      code: {
        language: "java",
        code: `import java.time.Duration;
import java.time.Instant;

public class Main {

    public static void main(String[] args) {

        Instant start =
                Instant.now();

        // Some operation

        Instant end =
                start.plusSeconds(5);

        Duration duration =
                Duration.between(
                        start,
                        end
                );

        System.out.println(
                duration.getSeconds()
        );
    }
}`
      },

      output: `5`
    },

    {
      id: "period",
      title: "Period",

      paragraphs: [
        "Period represents a date-based amount of time using years, months, and days.",
        "It is useful when working with calendar dates."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDate;
import java.time.Period;

public class Main {

    public static void main(String[] args) {

        LocalDate start =
                LocalDate.of(2020, 1, 1);

        LocalDate end =
                LocalDate.of(2026, 9, 25);

        Period period =
                Period.between(start, end);

        System.out.println(
                period.getYears()
        );

        System.out.println(
                period.getMonths()
        );

        System.out.println(
                period.getDays()
        );
    }
}`
      },

      output: `6
8
24`
    },

    {
      id: "period-vs-duration",
      title: "Period vs Duration",

      code: {
        language: "text",
        code: `Period
  ↓
Date-based amount
  ↓
Years + Months + Days

Duration
  ↓
Time-based amount
  ↓
Seconds + Nanoseconds`
      },

      bullets: [
        "Period is generally used for date-based differences.",
        "Duration is generally used for time-based differences.",
        "Period.between() works with date-based temporal values.",
        "Duration.between() is commonly used with time-based temporal values."
      ]
    },

    {
      id: "date-time-formatter",
      title: "DateTimeFormatter",

      paragraphs: [
        "DateTimeFormatter is used to format date-time objects into text and parse text into date-time objects.",
        "Java provides predefined formatters as well as custom patterns."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        LocalDateTime dateTime =
                LocalDateTime.of(
                        2026,
                        9,
                        25,
                        14,
                        30
                );

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd-MM-yyyy HH:mm"
                );

        String result =
                dateTime.format(formatter);

        System.out.println(result);
    }
}`
      },

      output: `25-09-2026 14:30`
    },

    {
      id: "formatting-dates",
      title: "Formatting Dates",

      paragraphs: [
        "Formatting converts a date or time object into a String representation."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        LocalDate date =
                LocalDate.of(
                        2026,
                        9,
                        25
                );

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd/MM/yyyy"
                );

        String formatted =
                date.format(formatter);

        System.out.println(formatted);
    }
}`
      },

      output: `25/09/2026`
    },

    {
      id: "parsing-dates",
      title: "Parsing Dates",

      paragraphs: [
        "Parsing converts a String into a date-time object using a compatible DateTimeFormatter."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        String text =
                "25-09-2026";

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd-MM-yyyy"
                );

        LocalDate date =
                LocalDate.parse(
                        text,
                        formatter
                );

        System.out.println(date);
    }
}`
      },

      output: `2026-09-25`
    },

    {
      id: "predefined-formatters",
      title: "Predefined Formatters",

      paragraphs: [
        "DateTimeFormatter provides predefined formatters for common standard representations."
      ],

      code: {
        language: "java",
        code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        LocalDateTime dateTime =
                LocalDateTime.of(
                        2026,
                        9,
                        25,
                        14,
                        30
                );

        String result =
                dateTime.format(
                        DateTimeFormatter.ISO_LOCAL_DATE_TIME
                );

        System.out.println(result);
    }
}`
      },

      output: `2026-09-25T14:30`
    },

    {
      id: "common-format-patterns",
      title: "Common Date-Time Patterns",

      code: {
        language: "text",
        code: `dd   → day of month
MM   → month
yyyy → year
HH   → hour in 24-hour format
mm   → minute
ss   → second

Example:

"dd-MM-yyyy HH:mm:ss"

25-09-2026 14:30:45`
      },

      bullets: [
        "Use MM for month.",
        "Use mm for minute.",
        "Use HH for a 24-hour clock.",
        "Use ss for seconds.",
        "Choose a formatter that matches the input or output format."
      ]
    },

    {
      id: "time-zone-conversion",
      title: "Converting Between Time Zones",

      paragraphs: [
        "ZonedDateTime can be converted to another time zone while representing the same instant."
      ],

      code: {
        language: "java",
        code: `import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {

    public static void main(String[] args) {

        ZonedDateTime india =
                ZonedDateTime.of(
                        2026,
                        9,
                        25,
                        14,
                        30,
                        0,
                        0,
                        ZoneId.of("Asia/Kolkata")
                );

        ZonedDateTime london =
                india.withZoneSameInstant(
                        ZoneId.of("Europe/London")
                );

        System.out.println(india);
        System.out.println(london);
    }
}`
      },

      output: `2026-09-25T14:30+05:30[Asia/Kolkata]
2026-09-25T10:00+01:00[Europe/London]`
    },

    {
      id: "local-vs-zoned",
      title: "LocalDateTime vs ZonedDateTime",

      bullets: [
        "LocalDateTime contains date and time but no time-zone information.",
        "ZonedDateTime contains date, time, and a time zone.",
        "Use LocalDateTime when a time zone is not part of the business meaning.",
        "Use ZonedDateTime when the time zone matters.",
        "Use Instant when representing an absolute point on the timeline."
      ],

      code: {
        language: "text",
        code: `LocalDate
    → Date only

LocalTime
    → Time only

LocalDateTime
    → Date + Time

ZonedDateTime
    → Date + Time + Zone

Instant
    → Point on timeline

Period
    → Date-based amount

Duration
    → Time-based amount`
      }
    },

    {
      id: "java-8-date-time-best-practices",
      title: "Date-Time API Best Practices",

      bullets: [
        "Prefer java.time classes for new Java applications.",
        "Use LocalDate when only a calendar date is required.",
        "Use LocalTime when only a time of day is required.",
        "Use LocalDateTime when date and time are needed without a time zone.",
        "Use ZonedDateTime when the time zone is part of the requirement.",
        "Use Instant for timestamps and absolute points on the timeline.",
        "Use Period for date-based amounts such as years, months, and days.",
        "Use Duration for time-based amounts such as hours, minutes, seconds, and nanoseconds.",
        "Use DateTimeFormatter for consistent formatting and parsing.",
        "Prefer immutable date-time objects.",
        "Use explicit ZoneId values instead of relying on an implicit system time zone when the business requirement depends on a particular zone.",
        "Store and exchange timestamps consistently when building distributed applications.",
        "Avoid mixing old Date/Calendar APIs with java.time unnecessarily."
      ]
    },

    {
      id: "real-world-backend-example",
      title: "Real-World Backend Example",

      paragraphs: [
        "In a backend application, different date-time classes can represent different business requirements.",
        "For example, a user's date of birth can be represented by LocalDate, a store's opening time can use LocalTime, an appointment in a known zone can use ZonedDateTime, and an event creation timestamp can use Instant."
      ],

      code: {
        language: "java",
        code: `import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;

public class UserProfile {

    private LocalDate dateOfBirth;

    private LocalTime preferredTime;

    private ZonedDateTime appointmentTime;

    private Instant createdAt;
}`
      },

      bullets: [
        "Date of birth → LocalDate.",
        "Time of day → LocalTime.",
        "Appointment with a zone → ZonedDateTime.",
        "Created-at timestamp → Instant."
      ]
    },

    {
      id: "important-points",
      title: "Important Points",

      bullets: [
        "Java 8 introduced the java.time API.",
        "LocalDate represents a date without time or zone.",
        "LocalTime represents a time without date or zone.",
        "LocalDateTime represents date and time without a zone.",
        "ZonedDateTime represents date, time, and time zone.",
        "Instant represents a point on the global timeline.",
        "Period represents date-based amounts.",
        "Duration represents time-based amounts.",
        "DateTimeFormatter is used for formatting and parsing.",
        "Formatting converts a date-time object into text.",
        "Parsing converts text into a date-time object.",
        "ZoneId represents a time-zone identifier.",
        "Java time classes are designed to be immutable and thread-safe.",
        "Choose the date-time type according to the actual business meaning."
      ]
    },

    {
      id: "interview-questions",
      title: "Interview Questions",

      interviewQuestions: [
        {
          question: "Why was the Java 8 Date and Time API introduced?",
          answer:
            "Java 8 introduced the java.time API to provide a clearer, more robust, immutable, and thread-safe model for working with dates, times, durations, periods, and time zones."
        },
        {
          question: "What is LocalDate?",
          answer:
            "LocalDate represents a date without a time and without a time zone."
        },
        {
          question: "What is LocalTime?",
          answer:
            "LocalTime represents a time of day without a date and without a time zone."
        },
        {
          question: "What is LocalDateTime?",
          answer:
            "LocalDateTime represents a date and time without time-zone information."
        },
        {
          question: "What is ZonedDateTime?",
          answer:
            "ZonedDateTime represents a date and time together with a specific time zone."
        },
        {
          question: "What is Instant?",
          answer:
            "Instant represents a specific point on the global timeline and is commonly useful for timestamps."
        },
        {
          question: "What is the difference between LocalDateTime and ZonedDateTime?",
          answer:
            "LocalDateTime contains date and time but no time-zone information. ZonedDateTime contains date, time, and a ZoneId."
        },
        {
          question: "What is Period?",
          answer:
            "Period represents a date-based amount using years, months, and days."
        },
        {
          question: "What is Duration?",
          answer:
            "Duration represents a time-based amount and is commonly expressed in seconds and nanoseconds."
        },
        {
          question: "What is the difference between Period and Duration?",
          answer:
            "Period is primarily date-based and represents years, months, and days, while Duration is time-based and represents elapsed time."
        },
        {
          question: "What is DateTimeFormatter?",
          answer:
            "DateTimeFormatter is used to format date-time objects into strings and parse strings into date-time objects."
        },
        {
          question: "What is the difference between formatting and parsing?",
          answer:
            "Formatting converts a date-time object into text. Parsing converts text into a date-time object."
        },
        {
          question: "Are Java 8 date-time classes thread-safe?",
          answer:
            "The main java.time date-time classes are immutable and thread-safe."
        },
        {
          question: "Which class should be used for a database timestamp?",
          answer:
            "The appropriate type depends on the application's data model and whether the timestamp represents an absolute point on the timeline. Instant is commonly appropriate for absolute timestamps."
        },
        {
          question: "Which class should be used for a date of birth?",
          answer:
            "LocalDate is generally appropriate because a date of birth is a calendar date without a time of day or time zone."
        },
        {
          question: "Which class should be used when time zone information is important?",
          answer:
            "ZonedDateTime can be used when the date, time, and time zone are all part of the requirement."
        }
      ]
    }
  ]
};