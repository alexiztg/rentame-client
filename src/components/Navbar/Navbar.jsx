import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className="header">
        <div className="logo">
        <Link to="/" >
          <img src="images/logo-color.png" alt="logo" />
        </Link>
        </div>
        <nav>
           <ul className="nav-links">
      {isLoggedIn && (
        <>
        <li><button className="btn1" onClick={logOutUser}>Logout</button></li>

          <Link to="/profile">
          <li><button className="btn1">Profile {user && user.name}</button></li>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <li><button className="btn1">Sign Up</button></li>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <li><button className="btn1">Login</button></li>{" "}
          </Link>
        </>
      )}
      <Link to="/shops" >
              <li><button className="btn1">Shops</button></li>
            </Link>
           </ul>            
        </nav>
        <Link to="/contact" ><button className="btn1">Contact</button></Link>
    </header>
  );
}

export default Navbar;
