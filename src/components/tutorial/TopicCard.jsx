import { Link } from "react-router-dom";

function TopicCard({ topic, courseSlug }) {
  const firstLesson = topic.lessons[0];

  return (
    <article className="topic-card">

      <div className="topic-number">
        {String(topic.id).padStart(2, "0")}
      </div>

      <div className="topic-content">

        <h3>{topic.title}</h3>

        <p>{topic.description}</p>

        <span className="topic-lesson-count">
          {topic.lessons.length} Lessons
        </span>

        <Link
          to={`/tutorials/${courseSlug}/${topic.slug}/${firstLesson.slug}`}
          className="topic-link"
        >
          Start Topic →
        </Link>

      </div>

    </article>
  );
}

export default TopicCard;