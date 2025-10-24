import { Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { AuthContext } from "../../Store/AuthContext";
import { useContext } from "react";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    authCtx.logout();
    navigate("/auth");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>

          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
