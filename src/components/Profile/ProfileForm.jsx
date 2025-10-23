import { useContext, useState } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../Store/AuthContext";

const ProfileForm = () => {
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAUH6t36-km79JywjWzXvpPlXy-iTqbMs",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token, // current login token
            password: password, // new password user entered
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("password update failed");
      }
      alert("Password updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form className={classes.form} onSubmit={handleNewPassword}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
