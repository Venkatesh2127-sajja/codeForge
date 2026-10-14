
import { Link } from "react-router-dom";
function TechnologyCard({technology}) {
    return (
        <Link 
            to={`/tutorials/${technology.slug}`}
            className = "technology-card" >
                <div className="technology-icon">
                    {technology.name.charAt(0)}
                </div>

                <div>
                    <h3>{technology.name}</h3>
                    <p>
                        {technology.description}
                    </p>
                    <span>
                        {technology.category}
                    </span>
                </div>
            </Link>

    );
}

export default TechnologyCard;