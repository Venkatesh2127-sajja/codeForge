import { Link } from "react-router-dom";

function CourseCard({ course }) {
  let startUrl = `/tutorials/${course.slug}`;

  if (course.slug === "java") {
    startUrl =
      "/tutorials/java/introduction/what-is-java";
  }

  if (course.slug === "spring-boot") {
    startUrl =
      "/tutorials/spring-boot/spring-boot-fundamentals/what-is-spring";
  }

  return (
    <article className="course-card">

      <div className="course-card-top">

        <div className="course-icon">
          {course.title.charAt(0)}
        </div>

        <span className="course-category">
          {course.category}
        </span>

      </div>

      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <div className="course-meta">

        <span>
          {course.topics} Topics
        </span>

        <span>
          {course.lessons} Lessons
        </span>

        <span>
          {course.difficulty}
        </span>

      </div>

      <Link
        to={startUrl}
        className="course-card-link"
      >
        Start Learning →
      </Link>

    </article>
  );
}

export default CourseCard;