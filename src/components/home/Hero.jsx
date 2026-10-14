import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-badge">
                    Learn . Practice . Build . Prepare
                </div>

                <h1>Become a better developer
                    <span>by building.</span>
                </h1>

                 <p>
          Learn programming concepts, practice coding problems,
          build real-world projects, and prepare for technical
          interviews — all in one place.
        </p>
        <div className="hero-actions">
            <Link to="/tutorials"
            className="hero-primary-button">
                Explore Tutorial
            </Link>

            <Link to="/practice"
            className="hero-secondary-button">
                Practice coding
            </Link>
        </div>
            </div>
        </section>
    );

}

export default Hero;