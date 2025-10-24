import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./Store/AuthContext";
import { useContext, useEffect } from "react";
function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      if (!authCtx.token) return;
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCAUH6t36-km79JywjWzXvpPlXy-iTqbMs",
          {
            method: "POST",
            body: JSON.stringify({ idToken: authCtx.token }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) authCtx.logout();
      } catch (error) {
        authCtx.logout();
      }
    };
    checkToken();
  }, [authCtx]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        <Route
          path="/profile"
          element={
            authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />
          }
        />

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
