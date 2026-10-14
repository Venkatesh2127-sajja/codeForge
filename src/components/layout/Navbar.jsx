import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    {
      label: "Tutorials",
      path: "/tutorials"
    },
    {
      label: "Practice",
      path: "/practice"
    },
    {
      label: "Projects",
      path: "/projects"
    },
    {
      label: "Interview",
      path: "/interview"
    }
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Code<span>Forge</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <Link to="/search" className="navbar-search">
          🔍
          <span>Search</span>
        </Link>

      </div>
    </header>
  );
}

export default Navbar;