import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <article className="project-card">

      <div className="project-card-header">

        <span className="project-difficulty">
          {project.difficulty}
        </span>

        <h3>{project.title}</h3>

      </div>

      <p>
        {project.description}
      </p>

      <div className="project-technologies">

        {project.technologies.map((technology) => (
          <span key={technology}>
            {technology}
          </span>
        ))}

      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="card-link"
      >
        View Project →
      </Link>

    </article>
  );
}

export default ProjectCard;