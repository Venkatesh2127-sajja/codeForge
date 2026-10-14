import { Link } from "react-router-dom";

function LessonNavigation({
  previousLesson,
  nextLesson,
  courseSlug
}) {
  return (
    <nav className="lesson-navigation">

      <div className="lesson-nav-item previous">

        {previousLesson ? (
          <Link
            to={`/tutorials/${courseSlug}/${previousLesson.topicSlug}/${previousLesson.slug}`}
          >
            <span>← Previous</span>

            <strong>
              {previousLesson.title}
            </strong>
          </Link>
        ) : (
          <span className="lesson-nav-disabled">
            This is the first lesson
          </span>
        )}

      </div>


      <div className="lesson-nav-item next">

        {nextLesson ? (
          <Link
            to={`/tutorials/${courseSlug}/${nextLesson.topicSlug}/${nextLesson.slug}`}
          >
            <span>Next →</span>

            <strong>
              {nextLesson.title}
            </strong>
          </Link>
        ) : (
          <Link to={`/tutorials/${courseSlug}`}>
            <span>Course Complete</span>

            <strong>
              Back to Course
            </strong>
          </Link>
        )}

      </div>

    </nav>
  );
}

export default LessonNavigation;