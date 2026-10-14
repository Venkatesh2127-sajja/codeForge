import "./LessonContent.css";

function LessonContent({ lesson }) {
  return (
    <article className="lesson-content">

      {/* =========================
          LESSON HEADER
      ========================== */}
      <header className="lesson-header">

        <div className="lesson-breadcrumb">
          Tutorials / Java / {lesson.topicTitle}
        </div>

        <h1>{lesson.title}</h1>

        <p className="lesson-description">
          {lesson.description}
        </p>

        <div className="lesson-meta">
          <span>Java</span>
          <span>{lesson.estimatedTime}</span>
        </div>

      </header>


      {/* =========================
          LESSON BODY
      ========================== */}
      <div className="lesson-body">

        {lesson.sections?.map((section) => (

          <section
            key={section.id}
            id={section.id}
            className="lesson-section"
          >

            {/* Section Title */}
            <h2>{section.title}</h2>


            {/* =========================
                PARAGRAPHS
            ========================== */}
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}


            {/* =========================
                BULLET POINTS
            ========================== */}
            {section.bullets && section.bullets.length > 0 && (
              <ul>
                {section.bullets.map((bullet, index) => (
                  <li key={index}>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}


            {/* =========================
                CODE EXAMPLE
            ========================== */}
            {section.code && (
              <div className="lesson-code">

                <div className="code-header">
                  <span>
                    {section.code.language || "Code"}
                  </span>
                </div>

                <pre>
                  <code>
                    {section.code.code}
                  </code>
                </pre>

              </div>
            )}


            {/* =========================
                OUTPUT
            ========================== */}
            {section.output && (
              <div className="lesson-output">

                <div className="output-header">
                  Output
                </div>

                <pre>
                  {section.output}
                </pre>

              </div>
            )}


            {/* =========================
                INTERVIEW QUESTIONS
            ========================== */}
            {section.interviewQuestions &&
              section.interviewQuestions.length > 0 && (

                <div className="lesson-interview-questions">

                  <h2 className="interview-title">
                    Interview Questions
                  </h2>

                  {section.interviewQuestions.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="lesson-interview-question"
                      >

                        <h3>
                          {index + 1}. {item.question}
                        </h3>

                        <p>
                          {item.answer}
                        </p>

                      </div>

                    )
                  )}

                </div>

              )}

          </section>

        ))}

      </div>

    </article>
  );
}

export default LessonContent;