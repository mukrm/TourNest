import "./navbar.css";
import { Link } from "react-router-dom";
import { auth, logout } from "../../firebase";

import {Routes, Route, useNavigate} from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();


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
          <button>Logged in as {user.email}</button>
          {user && (
            <Link to={"/login"}>
              <button className="navButton" onClick={logout}>
                Logout
              </button>
            </Link>
          )}
          {user && window.location.pathname !== "/history" && (
            <Link to={"/history"}>
              <button className="navButton">History</button>
            </Link>
          )}
          
              <button className="navButton" onClick={() => navigate(-1)}>Go Back</button>
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
