import { NavLink } from "react-router-dom";

import "./CourseSidebar.css";

function CourseSidebar({ course }) {
  return (
    <aside className="course-sidebar">

      <div className="course-sidebar-header">

        <span className="sidebar-label">
          COURSE
        </span>

        <h2>
          {course.title}
        </h2>

      </div>

      <nav className="course-sidebar-nav">

        {course.topics.map((topic) => {

          const lessons = topic.lessons ?? [];

          return (
            <div
              className="sidebar-topic"
              key={topic.id}
            >

              <h3>
                {topic.title}
              </h3>

              <div className="sidebar-lessons">

                {lessons.map((lesson) => (

                  <NavLink
                    key={lesson.id}
                    to={`/tutorials/${course.slug}/${topic.slug}/${lesson.slug}`}
                    className={({ isActive }) =>
                      isActive
                        ? "sidebar-lesson active"
                        : "sidebar-lesson"
                    }
                  >
                    {lesson.title}
                  </NavLink>

                ))}

              </div>

            </div>
          );

        })}

      </nav>

    </aside>
  );
}

export default CourseSidebar;