import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import TopicCard from "../../components/tutorial/TopicCard";

import { courses } from "../../data/courses";
import { javaCourse } from "../../data/javaCourse";
import { springBootCourse } from "../../data/springBootCourse";
import { sqlCourse } from "../../data/sql/sqlCourse";
import "./CourseDetails.css";

function CourseDetails() {
  const { courseSlug } = useParams();

  // -----------------------------------------
  // Find Course
  // -----------------------------------------

  let course = null;

  if (courseSlug === "java") {
    course = javaCourse;
  }

  if (courseSlug === "spring-boot") {
    course = springBootCourse;
  }

  if (courseSlug === "sql") {
    course = sqlCourse;
  }

  // -----------------------------------------
  // Course Not Found
  // -----------------------------------------

  if (!course) {
    const courseFromCatalog = courses.find(
      (item) => item.slug === courseSlug
    );

    if (!courseFromCatalog) {
      return (
        <PageContainer>
          <div className="course-not-found">
            <h1>Course Not Found</h1>

            <p>
              The requested course does not exist.
            </p>

            <Link to="/tutorials">
              Back to Tutorials
            </Link>
          </div>
        </PageContainer>
      );
    }

    course = courseFromCatalog;
  }

  // -----------------------------------------
  // First Topic
  // -----------------------------------------

  const firstTopic = course?.topics?.[0];

  // -----------------------------------------
  // First Lesson
  // -----------------------------------------

  const firstLesson =
    firstTopic?.lessons?.[0];

  // -----------------------------------------
  // Start URL
  // -----------------------------------------

  const startUrl = firstLesson
    ? `/tutorials/${course.slug}/${firstTopic.slug}/${firstLesson.slug}`
    : "#";

  // -----------------------------------------
  // Render
  // -----------------------------------------

  return (
    <PageContainer>

      <main className="course-main">

        {/* ---------------------------------- */}
        {/* Course Hero */}
        {/* ---------------------------------- */}

        <section className="course-hero">

          <span className="page-eyebrow">
            COURSE
          </span>

          <h1>
            {course.title}
          </h1>

          <p>
            {course.description}
          </p>

        </section>

        {/* ---------------------------------- */}
        {/* Start Learning */}
        {/* ---------------------------------- */}

        {firstLesson && (
          <section className="course-start-section">

            <div className="course-start-card">

              <div>

                <h2>
                  Start Learning{" "}
                  {course.title.replace(
                    " Tutorial",
                    ""
                  )}
                </h2>

                <p>
                  Begin with the fundamentals
                  and gradually move toward
                  advanced concepts.
                </p>

              </div>

              <Link
                to={startUrl}
                className="primary-button"
              >
                Start Learning
              </Link>

            </div>

          </section>
        )}

        {/* ---------------------------------- */}
        {/* Course Topics */}
        {/* ---------------------------------- */}

        <section className="course-topics-section">

          <div className="course-section-heading">

            <h2>
              {course.title} Course Content
            </h2>

            <p>
              Learn{" "}
              {course.title.replace(
                " Tutorial",
                ""
              )}{" "}
              step by step.
            </p>

          </div>

          {course.topics &&
          course.topics.length > 0 ? (
            <div className="topic-card-grid">

              {course.topics.map(
                (topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    courseSlug={
                      course.slug
                    }
                  />
                )
              )}

            </div>
          ) : (
            <div className="course-empty-state">

              <h3>
                Course Content Coming Soon
              </h3>

              <p>
                Lessons for this course
                are being prepared.
              </p>

            </div>
          )}

        </section>

      </main>

    </PageContainer>
  );
}

export default CourseDetails;