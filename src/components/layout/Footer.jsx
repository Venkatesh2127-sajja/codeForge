import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Code<span>Forge</span>
          </Link>

          <p>
            Learn. Practice. Build.
          </p>

          <p className="footer-description">
            A practical platform for learning programming,
            solving problems, building projects, and preparing
            for technical interviews.
          </p>
        </div>

        <div className="footer-section">
          <h3>Learn</h3>

          <Link to="/tutorials">Tutorials</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/interview">Interview</Link>
        </div>

        <div className="footer-section">
          <h3>Technologies</h3>

          <Link to="/tutorials/java">Java</Link>
          <Link to="/tutorials/spring-boot">Spring Boot</Link>
          <Link to="/tutorials/react">React</Link>
          <Link to="/tutorials/sql">SQL</Link>
        </div>

        <div className="footer-section">
          <h3>CodeForge</h3>

          <Link to="/">Home</Link>
          <Link to="/tutorials">Tutorials</Link>
          <Link to="/projects">Projects</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 CodeForge. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;