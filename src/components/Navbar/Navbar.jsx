import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Text } from "@chakra-ui/react";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className="header">
        <div className="logo">
        <Text fontSize='4xl' color="#5b6af0">Crazy Rent</Text>
        </div>
        <nav>
           <ul className="nav-links">
            <Link to="/" >
              <li><button className="btn1">Home</button></li>
            </Link>

      {isLoggedIn && (
        <>
        <li><button className="btn1" onClick={logOutUser}>Logout</button></li>

          <Link to="/profile">
          <li><button>Profile</button></li>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <h1>{user && user.name}</h1>
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
