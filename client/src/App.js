import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ClassPicker from "./Pages/ClassPicker/ClassPicker.js";
import ClassPage from "./Pages/ClassPage/AdminMode/ClassPageAdmin";
import Home from "./Pages/Home/Home";
import Library from "./Pages/Library/Library";
import Login from "./Pages/Login/Login.js";

import {
  AuthContext,
} from "./Components/GlobalStates/Authstate.js";
import { useContext } from "react";

function App() {
  const { authState } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="page-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/ClassPicker" element={<ClassPicker />} />
            {authState.username && (
              <Route path="/Class" element={<ClassPage />} />
            )}
            <Route path="/Library" element={<Library />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
