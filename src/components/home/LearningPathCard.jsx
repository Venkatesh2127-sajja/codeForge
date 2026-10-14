import { Link } from "react-router-dom";

function LearningPathCard({path}) {
    return(
        <article className="learning-path-card">
            <div className="learning-path-content">
                <span className="path-level">
                    {path.level}
                </span>
                <h3>{path.title}</h3>
                <p>{path.description}</p>

                <div className="path-technologies">
                    {path.technologies.map((technology) =>(
                        <span key = {technology}>
                            {technology}
                        </span>
                    ))}
                </div>

                <Link 
                to={`/tutorials/${path.slug}`}
                className="card-link" > Start Learning ..</Link>

            </div>
        </article>
    )
}

export default LearningPathCard;