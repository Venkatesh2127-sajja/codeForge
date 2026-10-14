import { Link } from "react-router-dom";

function ProblemCard({ problem }) {
  return (
    <article className="problem-card">

      <div className="problem-main">

        <h3>
          <Link
            to={`/practice/${problem.slug}`}
          >
            {problem.title}
          </Link>
        </h3>

        <div className="problem-tags">

          <span
            className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>

          <span>
            {problem.topic}
          </span>

        </div>

      </div>

      <div className="problem-stats">

        <span>
          {problem.acceptance}
          <small> Acceptance</small>
        </span>

        <span>
          {problem.solved}
          <small> Solved</small>
        </span>

      </div>

    </article>
  );
}

export default ProblemCard;