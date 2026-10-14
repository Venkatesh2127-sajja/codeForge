import { Link } from "react-router-dom";

function TutorialCard({ tutorial }) {
  return (
    <article className="content-card">

      <div className="card-top">
        <span className="technology-label">
          {tutorial.technology}
        </span>

        <span className="difficulty-badge">
          {tutorial.difficulty}
        </span>
      </div>

      <h3>{tutorial.title}</h3>

      <p>{tutorial.description}</p>

      <div className="card-meta">
        <span>
          {tutorial.lessons} Lessons
        </span>
      </div>

      <Link
        to={`/tutorials/${tutorial.slug}`}
        className="card-link"
      >
        Start Tutorial →
      </Link>

    </article>
  );
}

export default TutorialCard;