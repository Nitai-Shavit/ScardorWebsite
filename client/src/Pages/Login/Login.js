import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/GlobalStates/Authstate";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import ApiHandler from "../../Hooks/ApiHandler";

export default function Login() {
  const navigator = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const { data, loading, error, setOp } = ApiHandler(
    `/api/auth?username=${user.username}&password=${user.password}`
  );
  const { lastPage } = useLocation().state;

  const handleClick = () => {
    setOp(`/api/auth?username=${user.username}&password=${user.password}`);
  };
  useEffect(() => {
    if (!loading)
      if (data) {
        setAuthState({
          username: user.username,
          id: data.id,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          authorization: data.authorization,
        });
        navigator(lastPage || "/");
      }
    if (error) alert(error.message);
  }, [loading]);

  return (
    <div className="login-wrapper">
      <div className="content">
        <h1>Login Page</h1>
        <input
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div className="buttons">
          <button onClick={handleClick}>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
