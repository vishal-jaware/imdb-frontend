import { NavLink } from "react-router-dom";

function Nav() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top shadow">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-warning fs-4 px-2" to="/">
          IMDB
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center text-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link px-3 text-light">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link px-3 text-light">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/profile" className="nav-link px-3 text-light">
                Profile
              </NavLink>
            </li>

            {!user && (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link px-3 text-light">
                  Login
                </NavLink>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link px-3 text-light">
                  Logout
                </NavLink>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link text-warning fw-bold">
                  Admin Panel
                </NavLink>
              </li>
            )}
             { !user && (
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <NavLink
                to="/register"
                className="btn btn-outline-warning fw-bold"
              >
                Register
              </NavLink>
            </li>
                  )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
