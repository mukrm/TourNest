import "./navbar.css";
import { Link } from "react-router-dom";
import { auth, logout } from "../../firebase";
const Navbar = () => {
  const user = auth.currentUser;
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo" style={{ color: "skyblue" }}>
            Tour<span style={{ color: "white" }}>Nest</span>
          </span>
        </Link>
        <div className="navItems">
          {!user && (
            <Link to={"/register"}>
              {" "}
              <button className="navButton">Register</button>
            </Link>
          )}
          {!user && (
            <Link to={"/login"}>
              <button className="navButton">Login</button>
            </Link>
          )}
          {user && (
            <Link to={"/login"}>
              <button className="navButton" onClick={logout}>
                Logout
              </button>
            </Link>
          )}
          {!user && (
            <Link to={"/history"}>
              <button className="navButton" onClick={logout}>
                History
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
