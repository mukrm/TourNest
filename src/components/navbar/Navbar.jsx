import "./navbar.css";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  const user = auth.currentUser;

  async function getUserData() {
    if (user) {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        const res = await getDocs(q);

        res.forEach((doc) => {
          if (doc.data().email === user.email) return setUserData(doc.data());
        });
      } catch (err) {
        console.log("Something wrong", err);
      }
    }
  }

  useEffect(() => {
    getUserData();

    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="navbar" style={{ padding: "6px 0px" }}>
      <div className="navContainer">
        <Link to="/">
          <img
            style={{ width: "auto", height: 50, objectFit: "contain" }}
            src="logo.PNG"
          />
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
          {user && <DropDown user={userData} />}
          {/* {user && (
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
          )} */}

          {/* <button className="navButton" onClick={() => navigate(-1)}>
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const DropDown = ({ user }) => {
  const [show, setShow] = useState(false);

  if (!user) return <></>;

  return (
    <>
      {show && (
        <div onClick={() => setShow(false)} className="backgroundClicker"></div>
      )}
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setShow((state) => !state)}
          style={{ display: "flex", gap: "0px 12px", cursor: "pointer" }}
        >
          <p>{user.name}</p>
          <FaUserAlt style={{ cursor: "pointer" }} size={20} />
        </div>
        <div
          className="dropDown"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: 0,
            borderRadius: "2px",
            visibility: !show && "hidden",
            padding: "4px 12px",
            background: "#0072c1",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              borderBottom: "1px solid white",
              marginBottom: "16px",
              paddingBottom: "5px",
            }}
          >
            <img alt={user.name} className="profileImage" src={user.image} />
            <p className="infoText">{user.email}</p>
            <p className="infoText">{user.phone}</p>
          </div>

          <Link style={{ all: "unset" }} to={"/history"}>
            <DropDownButton>History</DropDownButton>
          </Link>
          <Link style={{ all: "unset" }} to={"/login"}>
            <DropDownButton onClick={logout}>Logout</DropDownButton>
          </Link>
        </div>
      </div>
    </>
  );
};

const DropDownButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="dropDownButton">
      <p>{children}</p>
    </button>
  );
};
