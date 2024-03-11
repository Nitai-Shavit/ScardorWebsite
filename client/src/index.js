import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Components/GlobalStates/Authstate";
import { DarkModeProvider } from "./Components/GlobalStates/DarkModeState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DarkModeProvider>
);

reportWebVitals();
