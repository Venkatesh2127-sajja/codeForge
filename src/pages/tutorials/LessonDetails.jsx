// import { Link, useParams } from "react-router-dom";

// import PageContainer from "../../components/common/PageContainer";

// import CourseSidebar from "../../components/tutorial/CourseSidebar";
// import LessonContent from "../../components/tutorial/LessonContent";
// import LessonNavigation from "../../components/tutorial/LessonNavigation";

// import { javaCourse } from "../../data/javaCourse";
// import { javaLessons } from "../../data/java";

// import "./LessonDetails.css";

// function LessonDetails() {
//   const {
//     courseSlug,
//     topicSlug,
//     lessonSlug
//   } = useParams();

//   /*
//    * V1:
//    * Static Java lesson data.
//    *
//    * Later:
//    * GET /api/v1/lessons/{lessonId}
//    */

//   // =========================================================
//   // 1. CHECK COURSE
//   // =========================================================

//   if (courseSlug !== "java") {
//     return (
//       <PageContainer>
//         <div className="lesson-not-found">
//           <h1>Course Not Found</h1>

//           <p>
//             The requested course does not exist.
//           </p>

//           <Link to="/tutorials">
//             Back to Tutorials
//           </Link>
//         </div>
//       </PageContainer>
//     );
//   }

//   // =========================================================
//   // 2. FIND LESSON BY SLUG
//   // =========================================================

//   /*
//    * javaLessons is indexed using lesson IDs.
//    *
//    * Example:
//    *
//    * javaLessons["class-and-object"]
//    *
//    * may not work if the object is actually:
//    *
//    * javaLessons["class-and-object"] -> depending on the
//    * lesson registry implementation.
//    *
//    * Searching by slug makes the URL lookup reliable.
//    */

//   const lesson = Object.values(javaLessons).find(
//     (item) => item.slug === lessonSlug
//   );

//   // =========================================================
//   // 3. LESSON NOT FOUND
//   // =========================================================

//   if (!lesson) {
//     return (
//       <PageContainer>
//         <div className="lesson-not-found">

//           <h1>Lesson Not Found</h1>

//           <p>
//             The lesson you are looking for
//             doesn't exist yet.
//           </p>

//           <Link to={`/tutorials/${courseSlug}`}>
//             Back to Java Tutorial
//           </Link>

//         </div>
//       </PageContainer>
//     );
//   }

//   // =========================================================
//   // 4. FLATTEN ALL JAVA LESSONS
//   // =========================================================

//   /*
//    * We flatten all lessons so we can determine
//    * previous and next lessons.
//    *
//    * topic.lessons ?? []
//    * prevents:
//    *
//    * Cannot read properties of undefined (reading 'map')
//    */

//   const allLessons = javaCourse.topics.flatMap(
//     (topic) => {

//       if (!topic.lessons) {
//         console.warn(
//           `No lessons found for topic: ${topic.title}`
//         );

//         return [];
//       }

//       return topic.lessons.map((item) => ({
//         ...item,

//         topicSlug: topic.slug,

//         topicTitle: topic.title
//       }));
//     }
//   );

//   // =========================================================
//   // 5. FIND CURRENT LESSON INDEX
//   // =========================================================

//   const currentIndex = allLessons.findIndex(
//     (item) => item.slug === lessonSlug
//   );

//   // =========================================================
//   // 6. PREVIOUS LESSON
//   // =========================================================

//   const previousLesson =
//     currentIndex > 0
//       ? allLessons[currentIndex - 1]
//       : null;

//   // =========================================================
//   // 7. NEXT LESSON
//   // =========================================================

//   const nextLesson =
//     currentIndex >= 0 &&
//     currentIndex < allLessons.length - 1
//       ? allLessons[currentIndex + 1]
//       : null;

//   // =========================================================
//   // 8. LESSON PAGE
//   // =========================================================

//   return (
//     <div className="lesson-page">

//       <PageContainer>

//         <div className="lesson-layout">

//           {/* =========================
//               Course Sidebar
//           ========================= */}

//           <CourseSidebar
//             course={javaCourse}
//           />

//           {/* =========================
//               Lesson Area
//           ========================= */}

//           <main className="lesson-main">

//             <LessonContent
//               lesson={{
//                 ...lesson,

//                 topicSlug:
//                   lesson.topicSlug ||
//                   topicSlug,

//                 topicTitle:
//                   lesson.topicTitle ||
//                   javaCourse.topics.find(
//                     (topic) =>
//                       topic.slug === topicSlug
//                   )?.title
//               }}
//             />

//             {/* =========================
//                 Bottom Navigation
//             ========================= */}

//             <LessonNavigation
//               previousLesson={previousLesson}
//               nextLesson={nextLesson}
//               courseSlug={courseSlug}
//             />

//           </main>

//         </div>

//       </PageContainer>

//     </div>
//   );
// }

// export default LessonDetails;

import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import CourseSidebar from "../../components/tutorial/CourseSidebar";
import LessonContent from "../../components/tutorial/LessonContent";
import LessonNavigation from "../../components/tutorial/LessonNavigation";

import { javaCourse } from "../../data/javaCourse";
import { javaLessons } from "../../data/java";

import { springBootCourse } from "../../data/springBootCourse";
import { springBootLessons } from "../../data/springboot";
import { sqlLessons } from "../../data/sql";
import { sqlCourse } from "../../data/sql/sqlCourse";
import "./LessonDetails.css";

function LessonDetails() {
  const {
    courseSlug,
    topicSlug,
    lessonSlug
  } = useParams();

  // -----------------------------------------
  // Select Course
  // -----------------------------------------

  let course = null;
  let lessons = null;

  if (courseSlug === "java") {
    course = javaCourse;
    lessons = javaLessons;
  }

  if (courseSlug === "spring-boot") {
    course = springBootCourse;
    lessons = springBootLessons;
  }

  if(courseSlug === "sql") {
    course = sqlCourse;
    lessons = sqlLessons;
  }

  // -----------------------------------------
  // Course Not Found
  // -----------------------------------------

  if (!course) {
    return (
      <PageContainer>
        <div className="lesson-not-found">

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

  // -----------------------------------------
  // Find Lesson Content
  // -----------------------------------------

  const lesson = Object.values(lessons).find(
    (item) => item.slug === lessonSlug
  );

  // -----------------------------------------
  // Lesson Not Found
  // -----------------------------------------

  if (!lesson) {
    return (
      <PageContainer>
        <div className="lesson-not-found">

          <h1>Lesson Not Found</h1>

          <p>
            The lesson you are looking for
            doesn't exist yet.
          </p>

          <Link
            to={`/tutorials/${courseSlug}`}
          >
            Back to {course.title}
          </Link>

        </div>
      </PageContainer>
    );
  }

  // -----------------------------------------
  // Build Complete Lesson List
  // -----------------------------------------

  const allLessons = course.topics.flatMap(
    (topic) => {

      if (!topic.lessons) {
        console.warn(
          `No lessons found for topic: ${topic.title}`
        );

        return [];
      }

      return topic.lessons.map(
        (item) => ({
          ...item,
          topicSlug: topic.slug,
          topicTitle: topic.title
        })
      );
    }
  );

  // -----------------------------------------
  // Find Current Lesson
  // -----------------------------------------

  const currentIndex =
    allLessons.findIndex(
      (item) =>
        item.slug === lessonSlug
    );

  // -----------------------------------------
  // Previous Lesson
  // -----------------------------------------

  const previousLesson =
    currentIndex > 0
      ? allLessons[currentIndex - 1]
      : null;

  // -----------------------------------------
  // Next Lesson
  // -----------------------------------------

  const nextLesson =
    currentIndex >= 0 &&
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  // -----------------------------------------
  // Render
  // -----------------------------------------

  return (
    <div className="lesson-page">

      <PageContainer>

        <div className="lesson-layout">

          <CourseSidebar
            course={course}
          />

          <main className="lesson-main">

            <LessonContent
              lesson={{
                ...lesson,

                topicSlug:
                  lesson.topicSlug ||
                  topicSlug,

                topicTitle:
                  lesson.topicTitle ||
                  course.topics.find(
                    (topic) =>
                      topic.slug === topicSlug
                  )?.title
              }}
            />

            <LessonNavigation
              previousLesson={
                previousLesson
              }
              nextLesson={
                nextLesson
              }
              courseSlug={
                courseSlug
              }
            />

          </main>

        </div>

      </PageContainer>

    </div>
  );
}

export default LessonDetails;