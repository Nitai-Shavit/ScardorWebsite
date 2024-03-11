import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const INITIAL_STATE = {
  id: "",
  username: "",
  accessToken: "",
  refreshToken: "",
  authorization: 0,
};

export const AuthProvider = ({ children }) => {
  const cookieInfo = JSON.parse(localStorage.getItem("userData"));
  const [authState, setAuthState] = useState(
    cookieInfo ? { ...cookieInfo } : INITIAL_STATE
  );

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(authState));
  }, [authState]);

  const disconnect = () => {
    setAuthState(INITIAL_STATE);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
};
