// src/store/AuthContext.js
import { createContext, useState, useEffect } from "react";

// Step 1️⃣ Create Context with default shape
export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
let logoutTimer;
// Step 2️⃣ Create Provider component
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Step 3️⃣ Load stored token (if any) when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpiration = localStorage.getItem("tokenExpiration");
    if (storedToken && storedExpiration) {
      const remainingTime = storedExpiration - new Date().getTime();
      if (remainingTime <= 0) {
        logoutHandler();
      } else {
        setToken(storedToken);
        autoLogout(remainingTime);
      }
    }
  }, []);

  // Step 4️⃣ Define login/logout functions
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token); // persist token
    const expirationTime = new Date().getTime() + 5 * 50 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
    autoLogout(5 * 60 * 1000);
  };
  const autoLogout = (milliseconds) => {
    logoutTimer = setTimeout(() => {
      logoutHandler();
      alert("session expired! please Login again");
    }, milliseconds);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    if (logoutTimer) clearTimeout(logoutTimer);
    alert("logout Successfully");
  };

  // Step 5️⃣ Derived state
  const userIsLoggedIn = !!token; // true if token is not null

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
