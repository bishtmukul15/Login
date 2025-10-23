// src/store/AuthContext.js
import { createContext, useState, useEffect } from "react";

// Step 1️⃣ Create Context with default shape
export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Step 2️⃣ Create Provider component
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Step 3️⃣ Load stored token (if any) when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Step 4️⃣ Define login/logout functions
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token); // persist token
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
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
